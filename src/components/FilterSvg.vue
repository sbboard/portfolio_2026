<script lang="ts" setup>
import { computed } from 'vue';
import { TEXT_COLOR, BACKGROUND_COLOR } from '@/utils/styleConfig';

// Convert hex colors to RGB values (0-1 range for color matrix)
const bgColorRgb = computed(() => ({
    r: parseInt(TEXT_COLOR.slice(1, 3), 16) / 255,
    g: parseInt(TEXT_COLOR.slice(3, 5), 16) / 255,
    b: parseInt(TEXT_COLOR.slice(5, 7), 16) / 255,
}));

const textColorRgb = computed(() => ({
    r: parseInt(BACKGROUND_COLOR.slice(1, 3), 16) / 255,
    g: parseInt(BACKGROUND_COLOR.slice(3, 5), 16) / 255,
    b: parseInt(BACKGROUND_COLOR.slice(5, 7), 16) / 255,
}));

const colorMatrix = computed(() => {
    const text = textColorRgb.value;
    const bg = bgColorRgb.value;

    const rScale = text.r - bg.r;
    const gScale = text.g - bg.g;
    const bScale = text.b - bg.b;

    return `${rScale} 0 0 0 ${bg.r} 0 ${gScale} 0 0 ${bg.g} 0 0 ${bScale} 0 ${bg.b} 0 0 0 1 0`;
});
</script>

<template>
    <svg style="display: none">
        <defs>
            <filter
                id="dither"
                color-interpolation-filters="sRGB"
                x="0"
                y="0"
                width="100%"
                height="100%"
            >
                <feImage
                    width="4"
                    height="4"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAASElEQVR42gXBgQAAIAxFwW8QwhBCCCGEIYQQQgghhBBCCEMYwutOkphzYmbsvdG9l9YaEYG7o1or5xxKKay1UGYyxuC9R++dD7yGJkTj6F0HAAAAAElFTkSuQmCC"
                ></feImage>
                <feTile></feTile>
                <feComposite
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="-0.5"
                    in="SourceGraphic"
                ></feComposite>
                <feColorMatrix type="saturate" values="0"></feColorMatrix>
                <feComponentTransfer>
                    <feFuncR type="discrete" tableValues="0 1"></feFuncR>
                    <feFuncG type="discrete" tableValues="0 1"></feFuncG>
                    <feFuncB type="discrete" tableValues="0 1"></feFuncB>
                </feComponentTransfer>
                <feColorMatrix type="matrix" :values="colorMatrix"></feColorMatrix>
            </filter>
        </defs>
    </svg>
</template>
