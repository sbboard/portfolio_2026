import { computed, ref } from 'vue';

export const themes = [
    { name: 'coolmint', text: '#7795af', background: '#f2f5f8' },
    { name: 'neon', text: '#ff1188', background: '#0a070a' },
    { name: 'pika pika', text: '#141414', background: '#ffdc3f' },
    { name: 'l33t', text: '#00ff00', background: '#000000' },
    { name: '.txt', text: '#474747', background: '#ffffff' },
];

export const CURRENT_THEME_INDEX = ref(0);
export const TEXT_COLOR = computed(() => themes[CURRENT_THEME_INDEX.value]!.text);
export const BACKGROUND_COLOR = computed(() => themes[CURRENT_THEME_INDEX.value]!.background);
export const TEXT_COLOR_OPAQUE = computed(() => `${TEXT_COLOR.value}45`);
export const CHROMA_COLOR = '#1eff00';

export function getRawHexColor(color: string, num?: boolean): string | number {
    const hex = color.slice(1);
    if (num) return parseInt(hex, 16);
    return hex;
}
