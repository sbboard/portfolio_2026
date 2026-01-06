<script lang="ts" setup>
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
    direction: 'left' | 'right';
    isVisible: boolean;
}>();
</script>

<template>
    <div class="arrowParent" :class="[props.direction, { show: props.isVisible }]">
        <FontAwesomeIcon :icon="props.direction === 'left' ? faCaretLeft : faCaretRight" />
    </div>
</template>

<style lang="scss" scoped>
.arrowParent {
    --offset: -18px;
    font-size: 21px;
    position: absolute;
    top: 0;
    bottom: var(--scrollbarHeight);
    z-index: 10;
    color: var(--textColor);
    pointer-events: none;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.1s;
    &.show {
        opacity: 1;
    }
    svg {
        padding-bottom: 10px;
    }
    &.left {
        --dir: right;
        left: var(--offset);
    }
    &.right {
        --dir: left;
        right: var(--offset);
    }
}
</style>
