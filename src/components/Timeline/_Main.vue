<script lang="ts" setup>
import { useProjects } from '@/composables/useProjects';
import ProjectMarker from './ProjectMarker.vue';
import { onMounted, ref } from 'vue';
import TimeLineArrow from './TimelineArrow.vue';

const { getDateRange, findProjectByDate } = useProjects();
const scrollable = ref<HTMLElement | null>(null);
const leftOverflow = ref(false);
const rightOverflow = ref(false);
const lightsOn = ref(false);

const checkOverflow = () => {
    if (!scrollable.value) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollable.value;
    leftOverflow.value = scrollLeft > 0;
    rightOverflow.value = scrollWidth > clientWidth + scrollLeft;
};

function toggleLights(on: boolean) {
    lightsOn.value = on;
    const nextTimeout = on ? 500 : 500;
    setTimeout(() => toggleLights(!on), nextTimeout);
}

onMounted(() => {
    checkOverflow();
    toggleLights(true);
});
</script>

<template>
    <div class="timeLineWrapWrap">
        <TimeLineArrow direction="left" :isVisible="leftOverflow && lightsOn" />
        <TimeLineArrow direction="right" :isVisible="rightOverflow && lightsOn" />
        <div
            class="timelineWrap"
            ref="scrollable"
            @scroll="checkOverflow"
            :class="{ leftOverflow, rightOverflow }"
        >
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
    </div>
</template>

<style lang="scss" scoped>
.timeLineWrapWrap {
    position: relative;
    --scrollbarHeight: 8px;
    .timelineWrap {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: var(--padding);
        &::-webkit-scrollbar {
            height: 8px;
            background-color: var(--textColorOpaque);
            border-radius: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--textColor);
            border-radius: 8px;
            background-clip: padding-box;
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

    @media (max-width: 500px) {
        .timeline .entryWrap {
            min-width: 10px;
        }
    }
}
</style>
