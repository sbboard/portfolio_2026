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
