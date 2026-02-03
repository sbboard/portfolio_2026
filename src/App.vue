<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import FilterSvg from './components/FilterSvg.vue';
import ProjectViewer from './components/ProjectViewer.vue';
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';
import ThreeDeeTeeVee from './components/ThreeDeeTeeVee.vue';
import TimeLine from './components/Timeline/_Main.vue';
import {
    BACKGROUND_COLOR,
    getRawHexColor,
    TEXT_COLOR,
    TEXT_COLOR_OPAQUE,
} from './utils/styleConfig';
import { useProjectStore } from './stores/project';
import { useProjects } from './composables/useProjects';
import { useMobile } from '@/composables/useMobile';
import { resume } from './components/const/const';
import LoadingSpinner from './components/LoadingSpinner.vue';
import NoWork from './components/const/NoWork.vue';

const grid = computed(
    () =>
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 25 25'%3E%3Cpath d='M25 0H0V25' fill='none' stroke='%23${getRawHexColor(
            TEXT_COLOR_OPAQUE.value
        )}' stroke-width='1'/%3E%3C/svg%3E")`
);

const projectStore = useProjectStore();
const { findProjectByDate } = useProjects();
const mobile = useMobile();
const isMobile = computed(() => mobile.isMobile.value);
const resumeExists = ref(false);
const resumeLoading = ref(true);

const currentProject = computed(() => {
    return findProjectByDate(projectStore.currentProjectDate);
});

onMounted(async () => {
    try {
        const response = await fetch(resume);
        if (!response.ok) throw new Error('Resume not found');
        resumeExists.value = true;
    } catch (error) {
        console.error('Error fetching resume:', error);
        resumeExists.value = false;
    }
    resumeLoading.value = false;
});
</script>

<template>
    <div id="container">
        <main :class="{ isMobile }">
            <template v-if="resumeExists">
                <SiteHeader />
                <div class="content">
                    <ThreeDeeTeeVee
                        v-if="!isMobile || (isMobile && !currentProject)"
                        :class="{ hasProject: !!currentProject }"
                    />
                    <ProjectViewer :currentProject="currentProject" />
                </div>
                <TimeLine />
                <SiteFooter />
                <FilterSvg />
            </template>
            <NoWork v-else-if="!resumeLoading" />
            <LoadingSpinner v-else />
        </main>
    </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap');

#container {
    --padding: 12px;
    --textColor: v-bind(TEXT_COLOR);
    --textColorOpaque: v-bind(TEXT_COLOR_OPAQUE);
    --backgroundColor: v-bind(BACKGROUND_COLOR);
    background-color: var(--backgroundColor);
}
main {
    max-height: 100dvh;
    min-height: 100dvh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-width: 1080px;
    margin: 0 auto;
    padding: var(--padding);
    box-sizing: border-box;
    color: var(--textColor);
    font-family: 'Funnel Sans', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    gap: var(--padding);
    letter-spacing: 1px;
    &.isMobile {
        gap: calc(var(--padding) / 2);
    }
    a {
        color: var(--textColor);
        &:visited {
            color: var(--textColor);
        }
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-position: center;
        background-image: v-bind(grid);
        overflow: hidden;
        position: relative;
        & > div {
            width: 50%;
            max-width: 50%;
            min-width: 50%;
            flex: 1;
            transition: margin-right 0.5s ease;
            &.hasProject {
                margin-right: 50%;
            }
        }
    }

    @media (max-width: 800px) {
        .content {
            flex-direction: column;
            > div {
                width: 100%;
                max-width: 100%;
                min-width: 100%;
            }
        }
    }
}
</style>
