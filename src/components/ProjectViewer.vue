<script lang="ts" setup>
import { useProjects } from '@/composables/useProjects';
import { useProjectStore } from '@/stores/project';
import { computed } from 'vue';

const projectStore = useProjectStore();
const { findProjectByDate } = useProjects();

const currentProject = computed(() => {
    return findProjectByDate(projectStore.currentProjectDate);
});
</script>

<template>
    <div v-if="currentProject">
        <h2>{{ currentProject?.name }}</h2>
        <p>{{ currentProject?.description }}</p>
        <a v-if="currentProject?.link" :href="currentProject?.link" target="_blank">View Project</a>
    </div>
</template>

<style lang="scss" scoped></style>
