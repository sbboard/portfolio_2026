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
    background-color: white;
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

    @media (max-width: 800px) {
        margin-left: var(--padding);
        margin-bottom: var(--padding);
    }

    @media (max-width: 500px) {
        font-size: 1em;
        .headerInfo {
            font-size: 1.5rem;
        }
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
}
</style>
