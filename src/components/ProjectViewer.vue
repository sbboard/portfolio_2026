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
    <div>
        <div v-if="currentProject" class="project">
            <div class="headerInfo">
                <h2>{{ currentProject?.name }}</h2>
                <h3>{{ currentProject?.date }}</h3>
            </div>
            <p>{{ currentProject?.description }}</p>
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
    width: 400px;
    margin: 0 auto;
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
}
</style>
