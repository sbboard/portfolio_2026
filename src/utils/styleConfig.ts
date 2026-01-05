export const themes = [
    { name: 'ice', text: '#7795af', background: '#f2f5f8' },
    { name: 'neon', text: '#ff008c', background: '#141414' },
    { name: 'sunset', text: '#ffd000', background: '#f153c2' },
    { name: 'banana', text: '#079e64', background: '#ffdc3f' },
    { name: '.txt', text: '#272727', background: '#ececec' },
    { name: 'eddie', text: '#ffffff', background: '#000000' },
    { name: 'hacker', text: '#00ff00', background: '#000000' },
    { name: 'unit-01', text: '#8edf5e', background: '#995cd1' },
    { name: 'pikachu', text: '#141414', background: '#ffdc3f' },
    { name: 'DMG', text: '#214231', background: '#8cad28' },
];

export const TEXT_COLOR = themes[0]!.text;
export const BACKGROUND_COLOR = themes[0]!.background;
export const TEXT_COLOR_OPAQUE = `${TEXT_COLOR}45`;
export const CHROMA_COLOR = '#1eff00';

export function getRawHexColor(color: string, num?: boolean): string | number {
    const hex = color.slice(1);
    if (num) return parseInt(hex, 16);
    return hex;
}
