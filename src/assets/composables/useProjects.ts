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

export const projects: Project[] = [
    {
        name: 'Salvaged Parts',
        date: '5/01/2022',
        description: 'Artsy web toy about an astronaut making music.',
        tech: ['Javascript'],
        image: 'https://gang-fight.com/assets/contentImages/salvage.jpg',
        video: 'salvage.mp4',
        link: 'https://gang-fight.com/projects/salvaged_parts/',
    },
    {
        name: 'PC-98 Emulation For Beginners',
        date: '4/01/2020',
        description: 'Tutorial website for getting started with PC-98 emulation.',
        tech: ['HTML5', 'CSS3'],
        image: 'https://gang-fight.com/assets/contentImages/pc982024.png',
        video: 'salvage.mp4',
        link: 'https://gang-fight.com/projects/98faq/',
    },
    {
        name: 'Parker Kelly Website',
        date: '2/01/2018',
        description: 'Portfolio website for an advertising creative.',
        tech: ['HTML5', 'CSS3', 'Javascript', 'PHP', 'JQuery'],
        image: 'https://colinbuffum.com/img/parker.jpg',
        video: 'salvage.mp4',
    },
].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
});
