<script lang="ts" setup>
import { ref } from 'vue';
import { CURRENT_THEME_INDEX, themes } from '@/utils/styleConfig';

const isOpen = ref(false);
const clickListener = (e: MouseEvent) => {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown || dropdown.contains(e.target as Node)) return;
    isOpen.value = false;
    document.removeEventListener('click', clickListener);
};

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) document.addEventListener('click', clickListener);
    else document.removeEventListener('click', clickListener);
};

const selectTheme = (index: number) => {
    CURRENT_THEME_INDEX.value = index;
    isOpen.value = false;
};
</script>

<template>
    <div class="themePicker">
        <div>Current Theme:</div>
        <div class="dropdown" :class="{ open: isOpen }">
            <div class="selected" @click="toggleDropdown">
                <div class="theme-preview">
                    {{ themes[CURRENT_THEME_INDEX]?.name }}
                    <div
                        class="color-circle"
                        :style="{
                            backgroundColor: themes[CURRENT_THEME_INDEX]?.background,
                            border: `2px solid ${themes[CURRENT_THEME_INDEX]?.text}`,
                        }"
                    ></div>
                </div>
            </div>
            <div class="options" v-if="isOpen">
                <div
                    v-for="(theme, index) in themes"
                    :key="theme.name"
                    class="option"
                    :class="{ selected: index === CURRENT_THEME_INDEX }"
                    @click="selectTheme(index)"
                >
                    <div class="theme-preview">
                        {{ theme.name }}
                        <div
                            class="color-circle"
                            :style="{
                                backgroundColor: theme.background,
                                border: `2px solid ${theme.text}`,
                            }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.themePicker {
    display: flex;
    flex-direction: row;
    font-size: 0.6rem;
    margin-bottom: auto;
    gap: 8px;
    align-items: center;
    margin-top: 5px;
    .dropdown {
        position: relative;
        min-width: 120px;
        .selected {
            cursor: pointer;
            padding: 4px 8px;
            border: 1px solid var(--textColor);
            background: var(--backgroundColor);
            &:hover {
                opacity: 0.8;
            }
        }
        .options {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--backgroundColor);
            border: 1px solid var(--textColor);
            border-radius: 4px;
            border-top: none;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            max-height: 200px;
            overflow-y: auto;
            z-index: 100;
            .option {
                padding: 4px 8px;
                cursor: pointer;
                &:first-of-type {
                    border-top: none;
                }
                &:last-of-type {
                    border-bottom: none;
                }
                &:hover {
                    background: var(--textColor);
                    color: var(--backgroundColor);
                }
                &.selected {
                    font-weight: bold;
                    border-left: 0;
                    border-right: 0;
                }
            }
        }
    }
}

.theme-preview {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: space-between;
    .color-circle {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }
    }
}
</style>
