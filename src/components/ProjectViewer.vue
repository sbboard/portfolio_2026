<script lang="ts" setup>
import { useProjects } from '@/composables/useProjects';
import { useProjectStore } from '@/stores/project';
import { computed } from 'vue';
import ProjectLinks from './ProjectViewer/ProjectLinks.vue';

const projectStore = useProjectStore();
const { findProjectByDate } = useProjects();

const currentProject = computed(() => {
    return findProjectByDate(projectStore.currentProjectDate);
});
</script>

<template>
    <div v-if="currentProject">
        <div class="project">
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
    </div>
</template>

<style lang="scss" scoped>
.project {
    background-color: white;
    margin: 0 auto;
    margin-right: var(--padding);
    display: flex;
    flex-direction: column;
    gap: var(--padding);
    font-size: 1.125em;
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
}
</style>
