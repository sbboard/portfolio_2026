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
        <div class="bio">
            <h1>Colin Buffum</h1>
            <p>
                Front-end engineer specializing in Vue and Nuxt, with experience building and
                maintaining production web applications and interactive UI systems.<br />
                Seeking a challenging role to contribute to creative web projects.
            </p>
        </div>
        <div class="contact">
            <h2>Work With Me</h2>
            <span @click="copyToClipboard('colin.buffum@gmail.com')"
                >colin.buffum@gmail.com <FontAwesomeIcon :icon="faClipboard"
            /></span>
            <h2><a href="https://colinbuffum.com/resume.pdf" target="_blank">Resume</a></h2>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    flex-direction: row;
    gap: var(--padding);
    div {
        display: flex;
        flex-direction: column;
        gap: var(--padding);
        justify-content: space-between;
        h1,
        h2 {
            margin: 0;
            font-weight: 800;
        }
        h1 {
            font-size: 2.5rem;
        }
        h2 {
            font-size: 1.25rem;
        }
        &.videoContainer {
            border-radius: 8px;
            width: 125px;
            height: 125px;
            min-width: 150px;
            overflow: hidden;
            justify-content: center;
            flex-direction: row;
            video {
                filter: url(#dither) contrast(1) grayscale(1);
                height: 100%;
            }
        }
        &.bio {
            flex: 1;
            p {
                max-width: 650px;
            }
        }
        &.contact {
            justify-content: start;
            text-align: right;
        }
        span {
            cursor: pointer;
            user-select: none;
        }
    }
}
</style>
