<script lang="ts" setup>
import { useMobile } from '@/composables/useMobile';
import { useProjects } from '@/composables/useProjects';
import { useProjectStore } from '@/stores/project';
import { CHROMA_COLOR, getRawHexColor, TEXT_COLOR } from '@/utils/styleConfig';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const projectStore = useProjectStore();
const { findProjectByDate } = useProjects();
const container = ref<HTMLElement | null>(null);
const scene = new THREE.Scene();
const mobile = useMobile();

// Video element and controls
const videoElement = ref<HTMLVideoElement | null>(null);
const videoScale = ref(0.2); // Scale: 0.1 to 5.0 (smaller = zoomed out, larger = zoomed in)
const videoScaleX = ref(1.4); // X-axis scale: 0.1 to 5.0 (for aspect ratio adjustment)
const videoScaleY = ref(1.0); // Y-axis scale: 0.1 to 5.0 (for aspect ratio adjustment)
const videoOffsetX = ref(1.3); // Horizontal offset: -1.0 to 1.0 (negative = left, positive = right)
const videoOffsetY = ref(1.9); // Vertical offset: -1.0 to 1.0 (negative = down, positive = up)

watch(
    () => projectStore.currentProjectDate,
    newProject => {
        const project = findProjectByDate(newProject);
        if (project) {
            if (!videoElement.value) {
                videoElement.value = document.createElement('video');
                videoElement.value.loop = true;
                videoElement.value.muted = true;
            }
            setTextureMat(project.video || 'static_raw.mp4');
            requestAnimationFrame(setRendererSize);
        } else {
            undoTextureMat();
        }
    }
);

const camera = new THREE.PerspectiveCamera(30, 0, 0.2, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.toneMapping = THREE.NoToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const baseColor = new THREE.TextureLoader().load('/models/textures/DefaultMaterial_Base_color.jpg');
baseColor.colorSpace = THREE.SRGBColorSpace;

function setTextureMat(src: string) {
    if (!model || !videoElement.value) return;

    videoElement.value.src = `/models/textures/${src}`;
    videoElement.value.addEventListener(
        'canplay',
        () => {
            videoElement.value!.play();
        },
        { once: true }
    );

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(`/models/textures/greenscreen.jpg`, texture => {
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create video texture
        const videoTexture = new THREE.VideoTexture(videoElement.value!);
        videoTexture.colorSpace = THREE.SRGBColorSpace;

        // Create custom shader material for chroma keying with video
        const chromaKeyMaterial = new THREE.ShaderMaterial({
            uniforms: {
                map: { value: texture },
                videoMap: { value: videoTexture },
                keyColor: { value: new THREE.Color(getRawHexColor(CHROMA_COLOR, true)) }, // #1eff00
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

                    // 90-degree clockwise rotation: (x,y) -> (1-y, x)
                    vec2 rotatedUV = vec2(vUv.y, 1.0 - vUv.x);

                    // Scale and position video with separate X/Y scaling for aspect ratio control
                    vec2 videoUV = (rotatedUV - 0.5) / vec2(videoScaleX, videoScaleY) / videoScale + 0.5 + vec2(videoOffsetX, videoOffsetY);

                    vec4 videoColor = texture2D(videoMap, videoUV);

                    float chromaDist = distance(texColor.rgb, keyColor);
                    float alpha = smoothstep(threshold, threshold + smoothing, chromaDist);

                    // Mix video in keyed areas, original texture elsewhere
                    vec3 finalColor = mix(videoColor.rgb, texColor.rgb, alpha);

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
            transparent: false,
        });

        model.traverse(child => {
            const mesh = child as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.material = chromaKeyMaterial;
        });
    });
}

function undoTextureMat() {
    if (!model) return;

    // Stop any playing video
    if (videoElement.value) {
        videoElement.value.pause();
        videoElement.value.src = '';
    }

    // Restore original materials and visibility for solid and wireframe meshes
    originalMeshes.forEach(({ solid, wireframe }) => {
        // Restore solid mesh
        solid.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.75,
            transparent: true,
        });
        solid.visible = true;

        // Restore wireframe mesh
        wireframe.material = new THREE.MeshBasicMaterial({
            color: getRawHexColor(TEXT_COLOR, true),
            wireframe: true,
        });
        wireframe.visible = true;
    });

    // Hide any other meshes that might have the chroma key material applied
    model.traverse(child => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;

        // If this mesh is not one of our stored original meshes, hide it
        const isOriginalMesh = originalMeshes.some(
            ({ solid, wireframe }) => mesh === solid || mesh === wireframe
        );

        if (!isOriginalMesh) {
            mesh.visible = false;
        }
    });
}

// Model & pivot
let model: THREE.Group;
const originalMeshes: { solid: THREE.Mesh; wireframe: THREE.Mesh }[] = [];
const baseRotation = new THREE.Euler();

// Mobile touch interaction
let isDragging = false;
let lastTouchX = 0;
let lastTouchY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
let animationId: number | null = null;

new FBXLoader().load('/models/tv.fbx', fbx => {
    const pivot = new THREE.Group();
    scene.add(pivot);

    fbx.traverse(c => {
        if (!(c instanceof THREE.Mesh)) return;

        const original = c;

        const solidMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.75,
            transparent: true,
        });

        const wireMat = new THREE.MeshBasicMaterial({
            color: getRawHexColor(TEXT_COLOR, true),
            wireframe: true,
        });

        // Clone the full mesh so we preserve transforms
        const solidMesh = original.clone();
        const wireMesh = original.clone();

        solidMesh.material = solidMat;
        wireMesh.material = wireMat;

        original.parent!.add(solidMesh);
        original.parent!.add(wireMesh);

        // Store references to the original solid and wireframe meshes
        originalMeshes.push({ solid: solidMesh, wireframe: wireMesh });

        original.visible = false;
    });

    const SCALE = 0.02;
    fbx.scale.set(SCALE, SCALE, SCALE);

    // Correct facing
    fbx.rotation.y = -Math.PI / 2.5; // Adjust until front faces +Z

    // Store base rotation
    baseRotation.copy(fbx.rotation);

    const box = new THREE.Box3().setFromObject(fbx);
    const size = box.getSize(new THREE.Vector3());

    camera.position.set(0.0125, size.y * 0.47, 5);

    pivot.add(fbx);
    model = pivot;
});

// Mouse tracking
const mouse = new THREE.Vector2();

// Desktop mouse tracking
function handleMouseMove(e: MouseEvent) {
    if (mobile.isMobileDevice.value) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

// Mobile touch handlers
function handleTouchStart(e: TouchEvent) {
    if (!mobile.isMobileDevice.value) return;
    e.preventDefault();
    isDragging = true;
    const touch = e.touches[0];
    if (!touch) return;
    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;

    if (!animationId) return;
    cancelAnimationFrame(animationId);
    animationId = null;
}

function handleTouchMove(e: TouchEvent) {
    if (!mobile.isMobileDevice.value || !isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - lastTouchX;
    const deltaY = touch.clientY - lastTouchY;

    // Convert touch movement to rotation
    currentRotationY += deltaX * 0.005;
    currentRotationX += deltaY * 0.005;

    currentRotationX = Math.max(-0.5, Math.min(0.5, currentRotationX));

    lastTouchX = touch.clientX;
    lastTouchY = touch.clientY;
}

function handleTouchEnd(e: TouchEvent) {
    if (!mobile.isMobileDevice.value) return;
    e.preventDefault();
    isDragging = false;

    const animate = () => {
        const lerpFactor = 0.05; // Smooth return animation

        currentRotationX = THREE.MathUtils.lerp(currentRotationX, 0, lerpFactor);
        currentRotationY = THREE.MathUtils.lerp(currentRotationY, 0, lerpFactor);

        // Continue animation if not close enough to base
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

function animate() {
    requestAnimationFrame(animate);
    if (!model) return;
    const fbx = model.children[0];
    if (!fbx) return;

    if (mobile.isMobileDevice.value) {
        // Use touch-based rotation on mobile
        fbx.rotation.y = baseRotation.y + currentRotationY;
        fbx.rotation.x = baseRotation.x + currentRotationX;
    } else {
        // Use mouse-based rotation on desktop
        fbx.rotation.y = baseRotation.y + mouse.x * 0.5;
        fbx.rotation.x = baseRotation.x + mouse.y * -0.3;
    }

    renderer.render(scene, camera);
}

let lastWidth = 0;
let lastHeight = 0;
function setRendererSize() {
    if (!container.value) return;
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    if (width === lastWidth && height === lastHeight) return;
    lastWidth = width;
    lastHeight = height;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.fov = mobile.isMobile.value ? 40 : 30;
    camera.updateProjectionMatrix();
    setTimeout(() => {
        setRendererSize();
    }, 250);
}

onMounted(() => {
    if (!container.value) return;
    container.value.appendChild(renderer.domElement);
    setRendererSize();
    window.addEventListener('resize', setRendererSize);
    window.addEventListener('mousemove', handleMouseMove);
    container.value.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.value.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.value.addEventListener('touchend', handleTouchEnd, { passive: false });
    animate();
});

onUnmounted(() => {
    window.removeEventListener('resize', setRendererSize);
    window.removeEventListener('mousemove', handleMouseMove);
    container.value?.removeEventListener('touchstart', handleTouchStart);
    container.value?.removeEventListener('touchmove', handleTouchMove);
    container.value?.removeEventListener('touchend', handleTouchEnd);

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
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
