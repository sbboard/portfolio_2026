/**
 * Copies the provided text to the clipboard.
 * @param text The text to copy.
 * @returns A promise that resolves to true if the text was copied successfully, false otherwise.
 */
export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

/**
 * Formats date to MM/YY
 * @param dateString The date string to format.
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
}
