export interface Project {
    name: string;
    date: string;
    description: string;
    tech: string[];
    image: string;
    video: string;
    link?: string;
    repo?: string;
}

const projects: Project[] = [
    {
        name: 'Salvaged Parts',
        date: '05/22',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
        link: 'https://gang-fight.com/projects/salvaged_parts/',
    },
    {
        name: 'Parker Kelly Website',
        date: '02/18',
        description: 'Portfolio website for an advertising creative.',
        tech: ['HTML5', 'CSS3', 'Javascript', 'PHP', 'JQuery'],
        image: 'https://colinbuffum.com/img/parker.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'PC-98 Emulation For Beginners',
        date: '04/21',
        description: 'Tutorial website for getting started with PC-98 emulation.',
        tech: ['HTML5', 'CSS3'],
        image: 'https://gang-fight.com/assets/contentImages/pc982024.png',
        video: 'salvage.mp4',
        link: 'https://gang-fight.com/projects/98faq/',
    },
].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});

/**
 * Composable to manage projects.
 * @returns An object containing the list of projects and utility functions.
 */
export function useProjects() {
    /**
     * Get the earliest or latest project date.
     * @param type 'first' for earliest date, 'last' for latest date
     * @returns Date object representing the extreme date
     */
    const getExtremeDate = (type: 'first' | 'last'): Date => {
        return projects.reduce((extreme, { date }) => {
            const d = parseProjectDate(date);
            return type === 'first' ? (d < extreme ? d : extreme) : d > extreme ? d : extreme;
        }, parseProjectDate(projects[0]!.date));
    };

    const parseProjectDate = (value: string): Date => {
        const [month, year] = value.split('/').map(Number);
        return new Date(2000 + (year || 0), (month || 0) - 1, 1);
    };

    /**
     * Get an array of dates ranging from the earliest to the latest project date.
     * @returns Array of all months between the earliest and latest project dates.
     */
    const getDateRange = (): string[] => {
        const newest = getExtremeDate('last');
        const oldest = getExtremeDate('first');
        const result: string[] = [];

        const current = new Date(newest);

        while (current >= oldest) {
            const month = String(current.getMonth() + 1).padStart(2, '0');
            const year = String(current.getFullYear()).slice(-2);

            result.push(`${month}/${year}`);
            current.setMonth(current.getMonth() - 1);
        }

        return result;
    };

    const findProjectByDate = (date: string): Project | undefined => {
        return projects.find(project => project.date === date);
    };

    return {
        projects,
        getDateRange,
        findProjectByDate,
    };
}
