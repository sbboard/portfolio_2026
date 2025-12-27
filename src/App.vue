<script lang="ts" setup>
import FilterSvg from './components/FilterSvg.vue';
import ProjectViewer from './components/ProjectViewer.vue';
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';
import ThreeDeeTeeVee from './components/ThreeDeeTeeVee.vue';
import TimeLine from './components/Timeline/_Main.vue';
</script>

<template>
    <main>
        <SiteHeader />
        <div class="content">
            <ThreeDeeTeeVee />
            <ProjectViewer></ProjectViewer>
        </div>
        <TimeLine />
        <SiteFooter />
        <FilterSvg />
    </main>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap');

main {
    --padding: 12px;
    --textColor: #878787;
    --textColorOpaque: #87878780;
    max-height: 100vh;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-width: 1080px;
    margin: 0 auto;
    padding: var(--padding);
    box-sizing: border-box;
    color: #878787;
    font-family: 'Funnel Sans', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    gap: var(--padding);
    letter-spacing: 1px;
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
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 25 25'%3E%3Cpath d='M25 0H0V25' fill='none' stroke='%23c7c7c7' stroke-width='1'/%3E%3C/svg%3E");
        & > div {
            width: 50%;
            max-width: 50%;
            min-width: 50%;
            flex: 1;
        }
    }
}
</style>
