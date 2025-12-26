<script lang="ts" setup>
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { onMounted, ref } from 'vue';

const container = ref<HTMLElement | null>(null);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.05;

// Textures
const loader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();
const baseColor = textureLoader.load('/models/textures/DefaultMaterial_Base_color.jpg');
baseColor.colorSpace = THREE.SRGBColorSpace; // Color texture
const normalMap = textureLoader.load('/models/textures/DefaultMaterial_Normal_OpenGL.jpg');
const roughnessMap = textureLoader.load('/models/textures/DefaultMaterial_Roughness.jpg');
const metalnessMap = textureLoader.load('/models/textures/DefaultMaterial_Metallic.jpg');
const aoMap = textureLoader.load('/models/textures/DefaultMaterial_Mixed_AO.jpg');
const heightMap = textureLoader.load('/models/textures/DefaultMaterial_Height.jpg');

// Model & pivot
let model: THREE.Group;
const baseRotation = new THREE.Euler();

loader.load('/models/tv.fbx', fbx => {
    const pivot = new THREE.Group();
    scene.add(pivot);

    fbx.traverse(child => {
        if (child.isMesh) {
            const mat = new THREE.MeshStandardMaterial({
                map: baseColor,
                normalMap,
                roughnessMap,
                metalnessMap,
                aoMap,
                displacementMap: heightMap,
                displacementScale: 0.02,
                metalness: 0.2, // slightly metallic
                roughness: 0.2, // less reflective
            });

            child.material = mat;

            // UV2 for AO map
            if (!child.geometry.attributes.uv2) {
                child.geometry.setAttribute(
                    'uv2',
                    new THREE.BufferAttribute(child.geometry.attributes.uv.array, 2)
                );
            }
        }
    });

    fbx.scale.set(0.01, 0.01, 0.01);

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

onMounted(() => {
    if (!container.value) return;
    container.value.appendChild(renderer.domElement);
});
</script>

<template>
    <div ref="container" class="viewer"></div>
    <svg width="0" height="0">
        <defs>
            <filter
                id="dither"
                color-interpolation-filters="sRGB"
                x="0"
                y="0"
                width="100%"
                height="100%"
            >
                <feImage
                    width="4"
                    height="4"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAASElEQVR42gXBgQAAIAxFwW8QwhBCCCGEIYQQQgghhBBCCEMYwutOkphzYmbsvdG9l9YaEYG7o1or5xxKKay1UGYyxuC9R++dD7yGJkTj6F0HAAAAAElFTkSuQmCC"
                ></feImage>
                <feTile></feTile>
                <feComposite
                    operator="arithmetic"
                    k1="4"
                    k2="2.5"
                    k3=".5"
                    k4="-1.5"
                    in="SourceGraphic"
                ></feComposite>
                <feComponentTransfer>
                    <feFuncR type="discrete" tableValues="0 1"></feFuncR>
                    <feFuncG type="discrete" tableValues="0 1"></feFuncG>
                    <feFuncB type="discrete" tableValues="0 1"></feFuncB>
                </feComponentTransfer>
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
.viewer {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    filter: url(#dither);
}
</style>
