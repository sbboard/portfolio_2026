import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * A Pinia store to manage the current project date.
 */
export const useProjectStore = defineStore('project', () => {
    const currentProjectDate = ref('');

    /**
     * Sets the current project date.
     * @param date - The date string of the project to set as current. If undefined, clears the current project date.
     */
    function setCurrentProjectDate(date?: string) {
        currentProjectDate.value = date || '';
    }

    return { currentProjectDate, setCurrentProjectDate };
});
