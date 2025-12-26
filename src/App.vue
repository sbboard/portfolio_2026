<script lang="ts" setup>
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';
import ThreeDeeTeeVee from './components/ThreeDeeTeeVee.vue';
import TimeLine from './components/TimeLine.vue';
</script>

<template>
    <div id="app">
        <SiteHeader />
        <ThreeDeeTeeVee />
        <TimeLine />
        <SiteFooter />
    </div>
</template>

<style lang="scss" scoped>
#app {
    max-height: 100vh;
    overflow: hidden;
}
</style>
