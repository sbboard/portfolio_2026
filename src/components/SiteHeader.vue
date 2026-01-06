<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { copyToClipboard } from '@/utils/utils';
import me from '@/assets/me.jpg';
import { ref } from 'vue';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import ThemePicker from '@/components/ThemePicker/_Main.vue';

const copyFailed = ref(false);
const copied = ref(false);

async function copyWrapper(email: string) {
    if (copyFailed.value) return;
    const success = await copyToClipboard(email);
    if (success) {
        copied.value = false;
        requestAnimationFrame(() => (copied.value = true));
    } else copyFailed.value = true;
}
</script>

<template>
    <header>
        <div class="videoContainer">
            <img :src="me" alt="Colin Buffum" />
        </div>
        <div class="infoContainer">
            <div class="bio">
                <h1>Colin Buffum</h1>
                <p>
                    Front-end engineer with experience building and maintaining production web
                    applications and interactive UI systems.<br />
                    Seeking to contribute to unique web experiences.
                </p>
            </div>
            <div class="contact">
                <ThemePicker />
                <div
                    class="email"
                    :class="{ copyFailed, copied }"
                    @click="copyWrapper('colin.buffum@gmail.com')"
                >
                    <span ref="emailEl">colin.buffum@gmail.com</span>
                    <FontAwesomeIcon :icon="copied ? faClipboardCheck : faClipboard" />
                </div>
                <h2><a href="https://colinbuffum.com/resume.pdf" target="_blank">Resume</a></h2>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    flex-direction: row;
    gap: var(--padding);
    font-size: 0.9rem;
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
            width: 125px;
            height: 125px;
            overflow: hidden;
            justify-content: center;
            flex-direction: row;
            img {
                filter: url(#dither);
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
            justify-content: end;
            text-align: right;
            gap: 5px;
        }
        .email {
            cursor: pointer;
            user-select: none;
            border-radius: 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0;
            span {
                padding: 5px;
                display: block;
            }
            &.copyFailed {
                cursor: text;
                user-select: text;
            }
            &.copied {
                animation: copy 1s ease-in-out forwards;
            }
        }
    }
    .infoContainer {
        display: flex;
        flex-direction: row;
        flex: 1;
    }
    @media (max-width: 800px) {
        div.videoContainer {
            display: none;
        }
        div .email {
            border: 1px solid var(--textColorOpaque);
            border-radius: 10px;
        }
        .infoContainer {
            flex-direction: column;
            .bio {
                h1 {
                    font-size: 1.5rem;
                }
            }
            .contact {
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
            }
        }
    }
}

@keyframes copy {
    0% {
        background-color: var(--textColorOpaque);
    }
    100% {
        background-color: var(--backgroundColor);
    }
}
</style>
