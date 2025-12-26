<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { copyToClipboard } from '@/utils/utils';
import video from '@/assets/me.mp4';
</script>

<template>
    <header>
        <div class="videoContainer">
            <video autoplay muted loop playsinline>
                <source :src="video" type="video/mp4" />
            </video>
        </div>
        <div>
            <h1>Colin Buffum</h1>
            <h2>
                Front-end engineer specializing in Vue and Nuxt, with experience building and
                maintaining production web applications and interactive UI systems. Proven ability
                to deliver scalable solutions for major brands and creative side projects. Seeking a
                challenging role to contribute to creative web projects.
            </h2>
        </div>
        <div>
            <a>Resume</a>
            Work With Me
            <span @click="copyToClipboard('colin.buffum@gmail.com')"
                >colin.buffum@gmail.com <FontAwesomeIcon :icon="faClipboard"
            /></span>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    flex-direction: row;
    .videoContainer {
        width: 150px;
        height: 150px;
        overflow: hidden;
        video {
            filter: url(#dither);
            height: 100%;
        }
    }
}
</style>
