<script lang="ts" setup>
import { projects } from '@/assets/composables/useProjects';
import ProjectMarker from './ProjectMarker.vue';
</script>

<template>
    <div class="timeline">
        <div class="line"></div>
        <ProjectMarker v-for="project in projects" :key="project.name" :project />
    </div>
</template>

<style lang="scss" scoped>
.timeline {
    --imgSize: 75px;
    --dashHeight: 25px;
    display: flex;
    flex-direction: row;
    position: relative;
    .line {
        width: 100%;
        position: absolute;
        border-bottom: 1px solid var(--textColor);
        width: 100%;
        position: absolute;
        top: calc(1em + calc(var(--dashHeight) / 2));
        left: calc(var(--imgSize) / 2);
    }
}
</style>
