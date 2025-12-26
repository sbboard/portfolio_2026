<script lang="ts" setup>
import { type Project } from '@/composables/useProjects';
import { useProjectStore } from '@/stores/project';

const { project } = defineProps<{ project: Project }>();
const projectStore = useProjectStore();
</script>

<template>
    <div class="project" @click="projectStore.setCurrentProjectDate(project.date)">
        <p>{{ project.date }}</p>
        <div class="bullet">&#8226;</div>
        <div class="dash"></div>
        <div class="imgWrap">
            <img :src="project.image" :alt="`${project.name} Thumbnail`" />
        </div>
        <h3>{{ project.name }}</h3>
    </div>
</template>

<style lang="scss" scoped>
.project {
    text-align: center;
    position: relative;
    width: 100px;
    white-space: initial;
    cursor: pointer;
    user-select: none;
    .bullet {
        font-size: 1.5em;
        line-height: 0;
        position: relative;
        top: calc(var(--dashHeight) / 2);
    }
    .dash {
        border-right: 1px solid var(--textColor);
        height: var(--dashHeight);
        width: 0;
        margin: 0 auto;
    }
    .imgWrap {
        width: var(--imgSize);
        height: var(--imgSize);
        overflow: hidden;
        border-radius: 100%;
        border: 1px solid var(--textColor);
        margin: 0 auto;
        img {
            min-width: 100%;
            min-height: 100%;
            object-fit: cover;
            width: inherit;
        }
    }
    h3 {
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines */
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.25;
        max-height: calc(1.25em * 2);
    }
}
</style>
