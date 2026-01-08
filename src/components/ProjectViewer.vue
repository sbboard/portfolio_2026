<script lang="ts" setup>
import { type Project } from '@/composables/useProjects';
import ProjectLinks from './ProjectViewer/ProjectLinks.vue';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useProjectStore } from '@/stores/project';

const props = defineProps<{ currentProject?: Project }>();

const projectStore = useProjectStore();
</script>

<template>
    <Transition>
        <div v-if="props.currentProject" class="project">
            <FontAwesomeIcon
                class="close"
                :icon="faCircleXmark"
                @click="projectStore.setCurrentProjectDate()"
            />
            <video
                v-if="currentProject?.video"
                :src="`/models/textures/${currentProject?.video}`"
                autoplay
                muted
                loop
                playsinline
            ></video>
            <div class="headerInfo">
                <div class="left">
                    <h2>{{ currentProject?.name }}</h2>
                    <ProjectLinks
                        v-if="currentProject?.repo || currentProject?.link"
                        :repo="currentProject?.repo"
                        :link="currentProject?.link"
                    />
                </div>
                <h3>{{ currentProject?.date }}</h3>
            </div>
            <ul>
                <li v-for="(line, index) in currentProject?.description" :key="index">
                    {{ line }}
                </li>
            </ul>
            <div class="tech">
                <strong>Technologies Used:</strong>
                {{ currentProject?.tech.join(', ') }}
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.project {
    background-color: var(--backgroundColor);
    margin: 0 auto;
    right: var(--padding);
    display: flex;
    flex-direction: column;
    gap: var(--padding);
    font-size: 1.125em;
    position: absolute;
    .close {
        cursor: pointer;
        margin-left: auto;
    }
    video {
        max-height: 200px;
        margin: 0 auto;
        display: block;
        max-width: 100%;
    }
    .headerInfo {
        font-size: 1.75rem;
        display: flex;
        justify-content: space-between;
        h2 {
            font-weight: bold;
        }
        .left {
            display: flex;
            gap: 5px;
        }
    }
    .tech {
        padding-bottom: 2px;
        strong {
            font-weight: bold;
        }
    }

    ul {
        padding-left: 1.2em;
        list-style-type: disc;
    }

    &.v-enter-active,
    &.v-leave-active {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    &.v-enter-from,
    &.v-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
    &.v-enter-to,
    &.v-leave-from {
        opacity: 1;
        transform: translateX(0);
    }

    @media (max-width: 800px) {
        max-width: unset;
        min-width: unset;
        width: calc(100% - var(--padding) * 2);
        video {
            max-height: 100px;
        }
        &.v-enter-active,
        &.v-leave-active {
            transition: none;
        }
    }

    @media (max-width: 500px) {
        font-size: 12px;
        .headerInfo {
            font-size: 1.5rem;
        }
    }
}
</style>
