<script lang="ts" setup>
import FilterSvg from '../FilterSvg.vue';
import ThemePicker from '../ThemePicker.vue';

const vids = ['gHsUaS9r5R8', 'knU9gRUWCno', 'rZHPCcFmEjc', 'n1jqDi2nmF4'];
const vid = vids[Math.floor(Math.random() * vids.length)];
</script>

<template>
    <div class="noWork">
        <FilterSvg />
        <ThemePicker />
        <iframe :src="`https://www.youtube.com/embed/${vid}?si=lKtCKHjfXaaav6_I`"></iframe>
        <p>not currently looking for work</p>
    </div>
</template>

<style lang="scss">
.noWork {
    --gap: 10px;
    width: 400px;
    max-width: 100%;
    text-align: center;
    margin: auto;
    iframe {
        margin-top: 10px;
        aspect-ratio: 1/0.75;
        filter: url(#dither);
    }
    .themePicker {
        margin-left: auto;
        width: fit-content;
    }
    p {
        margin-top: 10px;
    }
}
</style>
