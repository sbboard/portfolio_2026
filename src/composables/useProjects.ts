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
        tech: ['Javascript', 'CSS3', 'HTML5'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
        link: 'https://gang-fight.com/projects/salvaged_parts/',
        repo: 'https://gang-fight.com/projects/salvaged_parts/',
    },
    {
        name: 'Portfolio',
        date: '01/26',
        description: 'Portfolio website for an advertising creative.',
        tech: ['HTML5', 'CSS3', 'Javascript', 'PHP', 'JQuery'],
        image: 'https://colinbuffum.com/img/parker.jpg', //thumbnail should read "you are here V" like an airport map
        video: 'salvage.mp4',
        link: 'https://gang-fight.com/projects/salvaged_parts/',
        repo: 'https://gang-fight.com/projects/salvaged_parts/',
    },
    {
        name: 'PC-98 Emulation For Beginners',
        date: '07/21',
        description: 'Tutorial website for getting started with PC-98 emulation.',
        tech: ['HTML5', 'CSS3'],
        image: 'https://gang-fight.com/assets/contentImages/pc982024.png',
        video: 'salvage.mp4',
        link: 'https://gang-fight.com/projects/98faq/',
    },
    ////
    {
        name: 'Big Bean Bettors',
        date: '02/25',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Direqt Search',
        date: '03/25',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Direqt Ad Portal',
        date: '11/25',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Direqt Webchat',
        date: '06/24',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Splash Screen',
        date: '01/23',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Soda Enjoyer',
        date: '06/23',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Burger Genius',
        date: '04/22',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'CEE',
        date: '01/22',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Wellness Quiz',
        date: '06/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Bubble Menu',
        date: '05/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'StrikeOut Card Creator Demo',
        date: '04/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Drawing Warm-Up Tool',
        date: '02/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'The Invisible Sundial Website',
        date: '01/21',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: '1000 Tapes of Fate',
        date: '10/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Curiosity Museum Exhibit Prototype',
        date: '05/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Gang Picross',
        date: '02/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Bonsai Bot',
        date: '01/20',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Soviet Futbol',
        date: '11/19',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Gang Fight V2',
        date: '09/24',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'Gang Fight',
        date: '07/19',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'PC-98 Bot (Twitter)',
        date: '08/19',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
    },
    {
        name: 'PC-98 Bot (Bsky)',
        date: '10/23',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
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
