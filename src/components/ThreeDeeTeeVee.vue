<script lang="ts" setup>
import { useMobile } from '@/composables/useMobile';
import { useProjects } from '@/composables/useProjects';
import { useProjectStore } from '@/stores/project';
import {
    BACKGROUND_COLOR,
    CHROMA_COLOR,
    CURRENT_THEME_INDEX,
    getRawHexColor,
    TEXT_COLOR,
} from '@/utils/styleConfig';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';

// Constants
const MODEL_SCALE = 0.02;
const MODEL_ROTATION_Y = -Math.PI / 2.5;
const CAMERA_FOV_DESKTOP = 30;
const CAMERA_FOV_MOBILE = 40;
const SOLID_MATERIAL_OPACITY = 0.75;
const TOUCH_SENSITIVITY = 0.005;
const ANIMATION_LERP_FACTOR = 0.05;
const VIDEO_CONFIG = {
    scale: 0.2,
    scaleX: 1.4,
    scaleY: 1.0,
    offsetX: 1.3,
    offsetY: 1.9,
} as const;

// Composables and stores
const projectStore = useProjectStore();
const { findProjectByDate } = useProjects();
const mobile = useMobile();

// Template refs
const container = ref<HTMLElement | null>(null);

// Three.js core objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(CAMERA_FOV_DESKTOP, 0, 0.2, 10);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Video configuration refs
const videoElement = ref<HTMLVideoElement | null>(null);
const videoScale = ref(VIDEO_CONFIG.scale);
const videoScaleX = ref(VIDEO_CONFIG.scaleX);
const videoScaleY = ref(VIDEO_CONFIG.scaleY);
const videoOffsetX = ref(VIDEO_CONFIG.offsetX);
const videoOffsetY = ref(VIDEO_CONFIG.offsetY);

// Model state
let model: THREE.Group;
const originalMeshes: { solid: THREE.Mesh; wireframe: THREE.Mesh }[] = [];
const baseRotation = new THREE.Euler();

// Interaction state
const mouse = new THREE.Vector2();
let isDragging = false;
let lastTouchX = 0;
let lastTouchY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
let animationId: number | null = null;

// Renderer sizing state
let lastWidth = 0;
let lastHeight = 0;

// Initialize renderer
function initializeRenderer() {
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
}

// Video and texture management
function createVideoElement(): HTMLVideoElement {
    const video = document.createElement('video');
    video.loop = true;
    video.muted = true;
    return video;
}

function setTextureMat(src: string) {
    if (!model || !videoElement.value) return;

    videoElement.value.src = `/models/textures/${src}`;
    videoElement.value.addEventListener('canplay', () => videoElement.value!.play(), {
        once: true,
    });

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/models/textures/greenscreen.jpg', texture => {
        texture.colorSpace = THREE.SRGBColorSpace;

        const videoTexture = new THREE.VideoTexture(videoElement.value!);
        videoTexture.colorSpace = THREE.SRGBColorSpace;

        const chromaKeyMaterial = createChromaKeyMaterial(texture, videoTexture);

        model.traverse(child => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
                mesh.material = chromaKeyMaterial;
            }
        });
    });
}

function createChromaKeyMaterial(texture: THREE.Texture, videoTexture: THREE.VideoTexture) {
    return new THREE.ShaderMaterial({
        uniforms: {
            map: { value: texture },
            videoMap: { value: videoTexture },
            keyColor: { value: new THREE.Color(getRawHexColor(CHROMA_COLOR, true)) },
            threshold: { value: 0.4 },
            smoothing: { value: 0 },
            videoScale: { value: videoScale.value },
            videoScaleX: { value: videoScaleX.value },
            videoScaleY: { value: videoScaleY.value },
            videoOffsetX: { value: videoOffsetX.value },
            videoOffsetY: { value: videoOffsetY.value },
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D map;
            uniform sampler2D videoMap;
            uniform vec3 keyColor;
            uniform float threshold;
            uniform float smoothing;
            uniform float videoScale;
            uniform float videoScaleX;
            uniform float videoScaleY;
            uniform float videoOffsetX;
            uniform float videoOffsetY;
            varying vec2 vUv;

            void main() {
                vec4 texColor = texture2D(map, vUv);
                vec2 rotatedUV = vec2(vUv.y, 1.0 - vUv.x);
                vec2 videoUV = (rotatedUV - 0.5) / vec2(videoScaleX, videoScaleY) / videoScale + 0.5 + vec2(videoOffsetX, videoOffsetY);
                vec4 videoColor = texture2D(videoMap, videoUV);
                float chromaDist = distance(texColor.rgb, keyColor);
                float alpha = smoothstep(threshold, threshold + smoothing, chromaDist);
                vec3 finalColor = mix(videoColor.rgb, texColor.rgb, alpha);
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `,
        transparent: false,
    });
}

function undoTextureMat() {
    if (!model) return;

    stopVideo();
    restoreOriginalMaterials();
}

function stopVideo() {
    if (!videoElement.value) return;
    videoElement.value.pause();
    videoElement.value.src = '';
}

function restoreOriginalMaterials() {
    originalMeshes.forEach(({ solid, wireframe }) => {
        solid.material = createSolidMaterial();
        solid.visible = true;

        wireframe.material = createWireframeMaterial();
        wireframe.visible = true;
    });

    hideNonOriginalMeshes();
}

function createSolidMaterial() {
    return new THREE.MeshBasicMaterial({
        color: getRawHexColor(BACKGROUND_COLOR.value, true),
        opacity: SOLID_MATERIAL_OPACITY,
        transparent: true,
    });
}

function createWireframeMaterial() {
    return new THREE.MeshBasicMaterial({
        color: getRawHexColor(TEXT_COLOR.value, true),
        wireframe: true,
    });
}

function hideNonOriginalMeshes() {
    model.traverse(child => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;

        const isOriginalMesh = originalMeshes.some(
            ({ solid, wireframe }) => mesh === solid || mesh === wireframe
        );

        if (isOriginalMesh) return;
        mesh.visible = false;
    });
}

// Model loading and setup
function loadModel() {
    new FBXLoader().load('/models/tv.fbx', fbx => {
        const pivot = new THREE.Group();
        scene.add(pivot);

        setupMeshes(fbx);
        configureModel(fbx);
        setupCamera(fbx);

        pivot.add(fbx);
        model = pivot;
    });
}

function setupMeshes(fbx: THREE.Group) {
    fbx.traverse(c => {
        if (!(c instanceof THREE.Mesh)) return;

        const original = c;
        const solidMesh = original.clone();
        const wireMesh = original.clone();

        solidMesh.material = createSolidMaterial();
        wireMesh.material = createWireframeMaterial();

        original.parent!.add(solidMesh);
        original.parent!.add(wireMesh);

        originalMeshes.push({ solid: solidMesh, wireframe: wireMesh });
        original.visible = false;
    });
}

function configureModel(fbx: THREE.Group) {
    fbx.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
    fbx.rotation.y = MODEL_ROTATION_Y;
    baseRotation.copy(fbx.rotation);
}

function setupCamera(fbx: THREE.Group) {
    const box = new THREE.Box3().setFromObject(fbx);
    const size = box.getSize(new THREE.Vector3());
    camera.position.set(0.0125, size.y * 0.47, 5);
}

// Event handlers
function handleMouseMove(e: MouseEvent) {
    if (mobile.isMobileDevice.value) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

function handleTouchStart(e: TouchEvent) {
    if (!mobile.isMobileDevice.value) return;
    e.preventDefault();

    isDragging = true;
    const touch = e.touches[0];
    if (!touch) return;

    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;

    cancelTouchAnimation();
}

function handleTouchMove(e: TouchEvent) {
    if (!mobile.isMobileDevice.value || !isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    if (!touch) return;

    const deltaX = touch.clientX - lastTouchX;
    const deltaY = touch.clientY - lastTouchY;

    currentRotationY += deltaX * TOUCH_SENSITIVITY;
    currentRotationX += deltaY * TOUCH_SENSITIVITY;
    currentRotationX = Math.max(-0.5, Math.min(0.5, currentRotationX));

    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
}

function handleTouchEnd(e: TouchEvent) {
    if (!mobile.isMobileDevice.value) return;
    e.preventDefault();

    isDragging = false;
    startReturnAnimation();
}

function cancelTouchAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function startReturnAnimation() {
    const animate = () => {
        currentRotationX = THREE.MathUtils.lerp(currentRotationX, 0, ANIMATION_LERP_FACTOR);
        currentRotationY = THREE.MathUtils.lerp(currentRotationY, 0, ANIMATION_LERP_FACTOR);

        if (Math.abs(currentRotationX) > 0.001 || Math.abs(currentRotationY) > 0.001) {
            animationId = requestAnimationFrame(animate);
        } else {
            currentRotationX = 0;
            currentRotationY = 0;
            animationId = null;
        }
    };

    animationId = requestAnimationFrame(animate);
}

// Animation and rendering
function animate() {
    requestAnimationFrame(animate);

    if (!model) return;

    updateModelRotation();
    renderer.render(scene, camera);
}

function updateModelRotation() {
    const fbx = model.children[0];
    if (!fbx) return;

    if (mobile.isMobileDevice.value) {
        fbx.rotation.y = baseRotation.y + currentRotationY;
        fbx.rotation.x = baseRotation.x + currentRotationX;
    } else {
        fbx.rotation.y = baseRotation.y + mouse.x * 0.5;
        fbx.rotation.x = baseRotation.x + mouse.y * -0.3;
    }
}

// Renderer sizing
function setRendererSize() {
    if (!container.value) return;

    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    if (width === lastWidth && height === lastHeight) return;

    lastWidth = width;
    lastHeight = height;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.fov = mobile.isMobile.value ? CAMERA_FOV_MOBILE : CAMERA_FOV_DESKTOP;
    camera.updateProjectionMatrix();

    setTimeout(setRendererSize, 250);
}

// Event listeners management
function addEventListeners() {
    if (!container.value) return;

    window.addEventListener('resize', setRendererSize);
    window.addEventListener('mousemove', handleMouseMove);
    container.value.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.value.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.value.addEventListener('touchend', handleTouchEnd, { passive: false });
}

function removeEventListeners() {
    window.removeEventListener('resize', setRendererSize);
    window.removeEventListener('mousemove', handleMouseMove);
    container.value?.removeEventListener('touchstart', handleTouchStart);
    container.value?.removeEventListener('touchmove', handleTouchMove);
    container.value?.removeEventListener('touchend', handleTouchEnd);
}

// Watchers
watch(
    () => projectStore.currentProjectDate,
    newProject => {
        const project = findProjectByDate(newProject);
        if (project) {
            if (!videoElement.value) {
                videoElement.value = createVideoElement();
            }
            setTextureMat(project.video || 'static_raw.mp4');
            requestAnimationFrame(setRendererSize);
        } else {
            undoTextureMat();
        }
    }
);

watch(
    () => CURRENT_THEME_INDEX.value,
    () => {
        if (projectStore.currentProjectDate) return;
        restoreOriginalMaterials();
    }
);

// Lifecycle hooks
onMounted(() => {
    if (!container.value) return;

    initializeRenderer();
    container.value.appendChild(renderer.domElement);
    setRendererSize();
    addEventListeners();
    loadModel();
    animate();
});

onUnmounted(() => {
    removeEventListeners();
    cancelTouchAnimation();
});
</script>

<template>
    <div ref="container" class="viewer"></div>
</template>

<style scoped>
.viewer {
    overflow: hidden;
    min-height: 100%;
    height: -webkit-fill-available;
}
</style>
