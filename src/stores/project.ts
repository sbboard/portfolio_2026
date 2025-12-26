import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * A Pinia store to manage the current project date.
 */
export const useProjectStore = defineStore('project', () => {
    const currentProjectDate = ref('');

    function setCurrentProjectDate(date: string) {
        currentProjectDate.value = date;
    }

    return { currentProjectDate, setCurrentProjectDate };
});
