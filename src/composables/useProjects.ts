export interface Project {
    name: string;
    date: string;
    description: string;
    tech: string[];
    image?: string;
    video?: string;
    link?: string;
    repo?: string;
}

const projects: Project[] = [
    {
        name: 'Salvaged Parts',
        date: '05/22',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript', 'CSS3', 'HTML5'],
        link: 'https://gang-fight.com/projects/salvaged_parts/',
    },
    {
        name: 'Portfolio',
        date: '01/26',
        description: "My portfolio. You're here right now.",
        tech: ['Vue 3', 'Typescript', 'SCSS'],
        video: 'salvage.mp4',
    },
    {
        name: 'PC-98 Emulation For Beginners',
        date: '07/21',
        description: 'Tutorial website for getting started with PC-98 emulation.',
        tech: ['HTML5', 'CSS3'],
        link: 'https://gang-fight.com/projects/98faq/',
    },
    {
        name: 'Big Bean Bettors',
        date: '02/25',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Vue 3', 'Typescript', 'SCSS'],
        image: '/projectThumbs/bean.jpg',
    },
    {
        name: 'Direqt Search',
        date: '03/25',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Vue 3', 'Typescript', 'SCSS'],
    },
    {
        name: 'Direqt AI Portal',
        date: '11/25',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Vue 3', 'Typescript', 'SCSS'],
    },
    {
        name: 'Direqt Webchat',
        date: '06/24',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Vue 3', 'Typescript', 'SCSS'],
        image: '/projectThumbs/chat.jpg',
    },
    {
        name: 'Splash Screen',
        date: '01/23',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        link: 'https://gang-fight.com/projects/halfMoon/',
    },
    {
        name: 'Soda Enjoyer',
        date: '06/23',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['HTML5', 'CSS3'],
        link: 'https://sodaenjoyer.com/',
    },
    {
        name: 'Burger Genius',
        date: '04/22',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript', 'Node', 'Puppeteer'],
    },
    {
        name: 'CEE',
        date: '01/22',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'Wellness Quiz',
        date: '06/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'Bubble Menu',
        date: '05/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'StrikeOut Card Creator Demo',
        date: '04/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'Drawing Warm-Up Tool',
        date: '02/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'The Invisible Sundial Website',
        date: '01/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: '1000 Tapes of Fate',
        date: '10/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'Curiosity Museum Exhibit Prototype',
        date: '05/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'Gang Picross',
        date: '02/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'Bonsai Bot',
        date: '01/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: '/projectThumbs/bonsai.jpg',
    },
    {
        name: 'Soviet Futbol',
        date: '11/19',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: '/projectThumbs/soviet.jpg',
    },
    {
        name: 'Gang Fight V2',
        date: '09/24',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: '/projectThumbs/gf2.jpg',
    },
    {
        name: 'Gang Fight',
        date: '07/19',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: '/projectThumbs/gf1.jpg',
    },
    {
        name: 'PC-98 Bot (Twitter)',
        date: '08/19',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
    },
    {
        name: 'PC-98 Bot (Bsky)',
        date: '10/23',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: '/projectThumbs/bsky.jpg',
        link: 'https://bsky.app/profile/pc98bot.gang-fight.com',
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
