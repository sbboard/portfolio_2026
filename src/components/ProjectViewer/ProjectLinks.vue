<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const { link, repo } = defineProps<{ link?: string; repo?: string }>();
</script>

<template>
    <div class="links">
        <a v-if="link" :href="link" target="_blank"><FontAwesomeIcon :icon="faEarthAmericas" /></a>
        <a v-if="repo" :href="repo" target="_blank"><FontAwesomeIcon :icon="faGithub" /></a>
    </div>
</template>

<style lang="scss" scoped>
.links {
    text-align: right;
    a {
        font-size: 1.5rem;
    }
}
</style>
