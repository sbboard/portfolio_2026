<script lang="ts" setup>
import { TEXT_COLOR } from '@/utils/styleConfig';
</script>

<template>
    <div class="spinParent">
        <span class="loader"></span>
    </div>
</template>

<style lang="scss" scoped>
.spinParent {
    --size: 125px;
    width: 100%;
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    .loader {
        width: var(--size);
        height: var(--size);
        display: inline-block;
        position: relative;
    }
    .loader::after,
    .loader::before {
        content: '';
        box-sizing: border-box;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        border: calc(var(--size) / 20) solid v-bind(TEXT_COLOR);
        position: absolute;
        left: 0;
        top: 0;
        animation: animloader 2s linear infinite;
    }
    .loader::after {
        opacity: 0;
        animation-delay: 1s;
    }

    @keyframes animloader {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
}
</style>
