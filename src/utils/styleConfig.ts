import { computed, ref, watch } from 'vue';

export const themes = [
    { name: 'arctic', text: '#7795af', background: '#f2f5f8' },
    { name: 'city', text: '#ff119c', background: '#0a070a' },
    { name: 'pika', text: '#141414', background: '#ffdc3f' },
    { name: 'l33t', text: '#00ff00', background: '#000000' },
    { name: 'paper', text: '#474747', background: '#ffffff' },
];

// Load saved theme from localStorage or default to 0
const getSavedThemeIndex = (): number => {
    const DEFAULT = 0;
    try {
        const saved = localStorage.getItem('portfolio-theme-index');
        if (!saved) return DEFAULT;
        const index = parseInt(saved, 10);
        if (index && index < themes.length) return index;
    } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
    }
    return DEFAULT;
};

export const CURRENT_THEME_INDEX = ref(getSavedThemeIndex());

// Watch for changes and save to localStorage
watch(CURRENT_THEME_INDEX, newIndex => {
    try {
        localStorage.setItem('portfolio-theme-index', newIndex.toString());
    } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
    }
});
export const TEXT_COLOR = computed(() => themes[CURRENT_THEME_INDEX.value]!.text);
export const BACKGROUND_COLOR = computed(() => themes[CURRENT_THEME_INDEX.value]!.background);
export const TEXT_COLOR_OPAQUE = computed(() => `${TEXT_COLOR.value}45`);
export const CHROMA_COLOR = '#1eff00';

export function getRawHexColor(color: string, num?: boolean): string | number {
    const hex = color.slice(1);
    if (num) return parseInt(hex, 16);
    return hex;
}
