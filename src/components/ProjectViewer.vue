<script lang="ts" setup>
import { useProjects } from '@/composables/useProjects';
import { useProjectStore } from '@/stores/project';
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
                <h2>{{ currentProject?.name }}</h2>
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
            <div class="links" v-if="currentProject?.link || currentProject?.repo">
                <a v-if="currentProject?.link" :href="currentProject?.link" target="_blank"
                    ><FontAwesomeIcon :icon="faEarthAmericas"
                /></a>
                <a v-if="currentProject?.repo" :href="currentProject?.repo" target="_blank"
                    ><FontAwesomeIcon :icon="faGithub"
                /></a>
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
    }
    .tech {
        padding-bottom: 2px;
        strong {
            font-weight: bold;
        }
    }
    .links {
        text-align: right;
        a {
            font-size: 1.5rem;
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
