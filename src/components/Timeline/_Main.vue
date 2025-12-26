<script lang="ts" setup>
import { useProjects } from '@/assets/composables/useProjects';
import ProjectMarker from './ProjectMarker.vue';

const { getDateRange, findProjectByDate } = useProjects();
</script>

<template>
    <div class="timelineWrap">
        <div class="timeline">
            <div class="line"></div>
            <div class="entryWrap" v-for="date in getDateRange()" :key="date">
                <ProjectMarker
                    v-if="!!findProjectByDate(date)"
                    :project="findProjectByDate(date)!"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.timelineWrap {
    width: 100%;
    overflow: auto hidden;
    scrollbar-width: none;
    position: relative;
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
    }
    .timeline {
        --imgSize: 75px;
        --dashHeight: 25px;
        white-space: pre;
        width: fit-content;
        position: relative;
        .line {
            --margin: calc(var(--imgSize) / 2 + 10px);
            border-bottom: 1px solid var(--textColor);
            width: calc(100% - var(--margin) * 2);
            position: absolute;
            top: calc(1em + calc(var(--dashHeight) / 2));
            left: var(--margin);
        }
        .entryWrap {
            display: inline-flex;
            min-width: 25px;
        }
    }
}
</style>
