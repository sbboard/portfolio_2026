<script lang="ts" setup>
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { onMounted, onUnmounted, ref } from 'vue';

const container = ref<HTMLElement | null>(null);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.05;

// Textures
const loader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();
const baseColor = textureLoader.load('/models/textures/DefaultMaterial_Base_color.jpg');
baseColor.colorSpace = THREE.SRGBColorSpace; // Color texture

const video = document.createElement('video');
video.src = '/projectPreviews/salvage.mp4';
video.loop = true;
video.muted = true;
video.play();

const videoTexture = new THREE.VideoTexture(video);
videoTexture.colorSpace = THREE.SRGBColorSpace;
const videoMat = new THREE.MeshStandardMaterial({ map: videoTexture });

// Model & pivot
let model: THREE.Group;
const baseRotation = new THREE.Euler();

loader.load('/models/tv.fbx', fbx => {
    const pivot = new THREE.Group();
    scene.add(pivot);

    fbx.traverse(c => {
        const child = c as THREE.Mesh;
        if (!child.isMesh) return;
        const mat = new THREE.MeshStandardMaterial({ map: baseColor });

        child.material = mat;

        if (child.geometry.attributes.uv2 || !child.geometry.attributes.uv) return;
        child.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(child.geometry.attributes.uv.array, 2)
        );
    });

    const SCALE = 0.02;
    fbx.scale.set(SCALE, SCALE, SCALE);

    // Correct facing
    fbx.rotation.y = -Math.PI / 2; // Adjust until front faces +Z
    fbx.rotation.x = 0;

    // Store base rotation
    baseRotation.copy(fbx.rotation);

    const box = new THREE.Box3().setFromObject(fbx);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Move model so center X/Z is at 0
    fbx.position.x -= center.x;
    fbx.position.z -= center.z;

    // Move model so bottom sits at Y = 0
    fbx.position.y -= box.min.y;

    camera.position.set(0, size.y * 0.6, 5); // height proportional to model

    pivot.add(fbx);
    model = pivot;
});

// Mouse tracking
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animate
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        const fbx = model.children[0];
        if (!fbx) return;
        fbx.rotation.y = baseRotation.y + mouse.x * 0.5;
        fbx.rotation.x = baseRotation.x + mouse.y * -0.3;
    }

    renderer.render(scene, camera);
}

animate();

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
