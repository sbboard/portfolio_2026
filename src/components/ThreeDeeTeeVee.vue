<script lang="ts" setup>
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
        if (!newProject || !project) return;

        // Create video element if it doesn't exist
        if (!videoElement.value) {
            videoElement.value = document.createElement('video');
            videoElement.value.loop = true;
            videoElement.value.muted = true;
        }
        setTextureMat(project.video || 'static_raw.mp4');
        requestAnimationFrame(setRendererSize);
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

// Model & pivot
let model: THREE.Group;
const baseRotation = new THREE.Euler();

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

    camera.position.set(0, size.y * 0.47, 5); // height proportional to model

    pivot.add(fbx);
    model = pivot;
});

// Mouse tracking
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    if (!model) return;
    const fbx = model.children[0];
    if (!fbx) return;
    fbx.rotation.y = baseRotation.y + mouse.x * 0.5;
    fbx.rotation.x = baseRotation.x + mouse.y * -0.3;
    renderer.render(scene, camera);
}

function setRendererSize() {
    if (!container.value) return;
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

onMounted(() => {
    if (!container.value) return;
    container.value.appendChild(renderer.domElement);
    setRendererSize();
    window.addEventListener('resize', setRendererSize);
    animate();
});

onUnmounted(() => {
    window.removeEventListener('resize', setRendererSize);
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
