export const TEXT_COLOR = '#84929e';
export const TEXT_COLOR_OPAQUE = `${TEXT_COLOR}45`;
export const CHROMA_COLOR = '#1eff00';

export function getRawHexColor(color: string, num?: boolean): string | number {
    const hex = color.slice(1);
    if (num) return parseInt(hex, 16);
    return hex;
}
