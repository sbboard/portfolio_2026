<script lang="ts" setup>
import FilterSvg from './components/FilterSvg.vue';
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';
import ThreeDeeTeeVee from './components/ThreeDeeTeeVee.vue';
import TimeLine from './components/Timeline/_Main.vue';
</script>

<template>
    <main>
        <SiteHeader />
        <ThreeDeeTeeVee />
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
    a {
        color: var(--textColor);
        &:visited {
            color: var(--textColor);
        }
    }
}
</style>
