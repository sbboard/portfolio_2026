import { computed, ref, watch } from 'vue';

export const themes = [
    { name: 'arctic', text: '#7ba6cc', background: '#f2f5f8' },
    { name: 'pika', text: '#141414', background: '#ffdc3f' },
    { name: 'cola', text: '#111111', background: '#ff1f3d' },
    { name: 'moon', text: '#ffd94f', background: '#171720' },
    { name: 'city', text: '#ff119c', background: '#0a070a' },
    { name: 'l33t', text: '#00ff00', background: '#000000' },
];

// Load saved theme from localStorage or default to 0
const getSavedThemeIndex = (): number => {
    const DEFAULT = 0;
    try {
        const saved = localStorage.getItem('portfolio-theme-name');
        if (!saved) return DEFAULT;
        const themeIndex = themes.findIndex(theme => theme.name === saved);
        if (themeIndex >= 0) return themeIndex;
    } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
    }
    return DEFAULT;
};

export const CURRENT_THEME_INDEX = ref(getSavedThemeIndex());

// Watch for changes and save to localStorage
watch(CURRENT_THEME_INDEX, newIndex => {
    try {
        const themeName = themes[newIndex]?.name;
        if (!themeName) throw new Error('Invalid theme index');
        localStorage.setItem('portfolio-theme-name', themeName);
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
