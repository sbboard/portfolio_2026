<script lang="ts" setup>
import { useProjects } from '@/composables/useProjects';
import { useProjectStore } from '@/stores/project';
import { getRawHexColor, TEXT_COLOR } from '@/utils/styleConfig';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const projectStore = useProjectStore();
const { findProjectByDate } = useProjects();
const container = ref<HTMLElement | null>(null);
const scene = new THREE.Scene();

watch(
    () => projectStore.currentProjectDate,
    newProject => {
        const project = findProjectByDate(newProject);
        if (!newProject || !project) return;
        setVideoMat(project.video || '');
        requestAnimationFrame(setRendererSize);
    }
);

const camera = new THREE.PerspectiveCamera(30, 0, 0.2, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.toneMapping = THREE.NoToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const baseColor = new THREE.TextureLoader().load('/models/textures/DefaultMaterial_Base_color.jpg');
baseColor.colorSpace = THREE.SRGBColorSpace;

function setVideoMat(src: string) {
    if (!model) return;

    const video = document.createElement('video');
    video.src = `/models/textures/${src}`;
    video.loop = true;
    video.muted = true;

    // Wait for video to load before applying material
    video.addEventListener('canplay', () => {
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.05;
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.colorSpace = THREE.SRGBColorSpace;
        const videoMat = new THREE.MeshStandardMaterial({ map: videoTexture });

        model.traverse(child => {
            const mesh = child as THREE.Mesh;
            if (!mesh.isMesh) return;
            mesh.material = videoMat;
        });
    });

    video.play();
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
