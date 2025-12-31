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
        tech: ['Javascript'],
        link: 'https://gang-fight.com/projects/salvaged_parts/',
    },
    {
        name: 'Portfolio',
        date: '01/26',
        description: "My portfolio. You're here right now.",
        tech: ['Vue 3', 'Typescript', 'SCSS', 'Three.js'],
        repo: 'https://github.com/sbboard/portfolio_2026',
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
        description:
            'Parody betting website where a small community placed mundane bets on things like current movies using fake digital currency.',
        tech: ['Vue 3', 'Typescript', 'SCSS', 'Node.js', 'Express', 'MongoDB'],
        image: '/projectThumbs/bean.jpg',
        repo: 'https://github.com/sbboard/beanBetters',
    },
    {
        name: 'Direqt Search Dashboard',
        date: '03/25',
        description: 'Dashboard for managing Direqt Search settings and analytics.',
        tech: ['Vue 3', 'Typescript', 'SCSS'],
        image: '/projectThumbs/dash.jpg',
    },
    {
        name: 'Direqt Search',
        date: '11/24',
        description:
            'AI-powered, embeddable search frontend that lets site owners index their own content and seamlessly integrate intelligent search into their websites. Built for easy customization and drop-in deployment across different site architectures.',
        tech: ['Vue 3', 'Typescript', 'SCSS'],
        image: '/projectThumbs/search.jpg',
    },
    {
        name: 'Direqt AI Portal',
        date: '11/25',
        description:
            'AI powered ad widget that focused on engaging users with interactive content, such as chat and polls.',
        tech: ['Vue 3', 'Typescript', 'SCSS'],
        image: '/projectThumbs/ad.jpg',
        video: 'direqt_ad.mp4',
    },
    {
        name: 'Direqt Webchat',
        date: '06/24',
        description:
            'AI-powered web chat widget designed for seamless integration and user engagement.',
        tech: ['Vue 3', 'Nuxt', 'Typescript'],
        image: '/projectThumbs/chat.jpg',
    },
    {
        name: 'Splash Screen',
        date: '01/23',
        description: 'A very hypnotic splash screen.',
        tech: ['Javascript'],
        link: 'https://gang-fight.com/projects/halfMoon/',
        image: '/projectThumbs/skull.jpg',
    },
    {
        name: 'Soda Enjoyer',
        date: '06/23',
        description: 'Goofy retro styled website built to showcase soda rankings.',
        tech: ['HTML5', 'CSS3'],
        link: 'https://sodaenjoyer.com/',
    },
    {
        name: 'Burger Genius',
        date: '04/22',
        description:
            'Humorous webscraper that dynamically collects information from Wikipedia to create really bad burger ideas.',
        tech: ['Javascript', 'Node', 'Puppeteer'],
        repo: 'https://github.com/sbboard/wikiburger',
    },
    {
        name: 'CEE',
        date: '01/22',
        description: 'Educational tool adapted from an old flash site.',
        tech: ['Javascript'],
        repo: 'https://github.com/sbboard/cee',
        link: 'https://cee.rcreative.marketing/',
    },
    {
        name: 'Wellness Quiz',
        date: '06/21',
        description: 'Interactive assessment quiz to help assign customers to specific programs.',
        tech: ['Javascript'],
        repo: 'https://github.com/sbboard/quizEngine',
        link: 'https://sbboard.github.io/quizEngine/',
    },
    {
        name: 'Bubble Menu',
        date: '05/21',
        description: 'Demo for an animated bubble menu.',
        tech: ['Javascript'],
        link: 'https://sbboard.github.io/bubbleEngine/',
        repo: 'https://github.com/sbboard/bubbleEngine',
    },
    {
        name: 'StrikeOut Card Creator Demo',
        date: '04/21',
        description: 'Rough demo for a baseball card creation tool.',
        tech: ['React.js'],
        link: 'https://gang-fight.com/projects/cardCreator/',
    },
    {
        name: 'Drawing Warm-Up Tool',
        date: '02/21',
        description:
            'Simple drawing practice tool. Displays local images for a set number of minutes.',
        tech: ['Typescript'],
        link: 'https://gang-fight.com/projects/warmup/',
        repo: 'https://github.com/sbboard/warmup',
    },
    {
        name: 'The Invisible Sundial Website',
        date: '01/21',
        description: "Homepage for the band 'The Invisible Sundial'.",
        tech: ['Wordpress', 'PHP'],
        link: 'https://theinvisiblesundial.com/',
        repo: 'https://github.com/sbboard/invisibleSundial',
    },
    {
        name: '1000 Tapes of Fate',
        date: '10/20',
        description:
            '‘Choose Your Own Adventure’ style project where the user is led through an experience exclusively through audio. Intended to be played with eyes closed.',
        tech: ['Vue 2'],
        link: 'https://1000tapes.com/',
        repo: 'https://github.com/sbboard/audioAdventure',
    },
    {
        name: 'Curiosity Museum Exhibit Prototype',
        date: '05/20',
        description:
            "Physical interactive exhibit prototype built in collaboration with Utah's Museum of Natural Curiosity. Aimed to teach museum patrons about sorting trash using technology.",
        tech: ['Python'],
        repo: 'https://github.com/echohatch1/NFC-Video-Launcher',
        image: '/projectThumbs/curio.jpg',
    },
    {
        name: 'Gang Picross',
        date: '02/20',
        description: 'Simple nonogram game engine.',
        tech: ['Vue 2'],
    },
    {
        name: 'Bonsai Bot',
        date: '01/20',
        description:
            "Discord bot created for entertainment purposes. Had the personality of a rude monkey who loved when chat participants typed the word 'bonsai'.",
        tech: ['Node.js'],
        image: '/projectThumbs/bonsai.jpg',
        repo: 'https://github.com/sbboard/BonsaiBot',
    },
    {
        name: 'Soviet Futbol',
        date: '11/19',
        description: 'Online sticker shop.',
        tech: ['Wordpress', 'PHP', 'WooCommerce'],
        image: '/projectThumbs/soviet.jpg',
    },
    {
        name: 'Gang Fight V2',
        date: '09/24',
        description:
            'Updated version of V1 Gang Fight but with different locations. Mainly an excuse to modernize the codebase.',
        tech: ['Vue 3'],
        image: '/projectThumbs/gf2.jpg',
        link: 'https://gang-fight.com/',
        repo: 'https://github.com/sbboard/gang-fight-v2',
    },
    {
        name: 'Gang Fight',
        date: '07/19',
        description: 'Creative brand website created with emphasis on atmosphere and personality.',
        tech: ['Vue 2'],
        image: '/projectThumbs/gf1.jpg',
    },
    {
        name: 'PC-98 Bot (Twitter)',
        date: '08/19',
        description:
            'Twitter bot that posts images from retro Japanese computer games every 4 hours. Generated a follower count of over 25,000 followers.',
        tech: ['Node.js'],
        link: 'https://x.com/PC98_bot',
        repo: 'https://github.com/sbboard/pc98bot',
    },
    {
        name: 'PC-98 Bot (Bsky)',
        date: '10/23',
        description: 'Port of the PC-98 Twitter bot to Bluesky.',
        tech: ['Node.js'],
        image: '/projectThumbs/bsky.jpg',
        link: 'https://bsky.app/profile/pc98bot.gang-fight.com',
        repo: 'https://github.com/sbboard/pc98bot',
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
