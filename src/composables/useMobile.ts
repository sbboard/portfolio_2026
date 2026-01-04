import { ref, onMounted, onUnmounted } from 'vue';

const BREAKPOINT = 550;

/**
 * Composable for detecting mobile devices and screen width
 * @returns Object containing isMobile reactive reference
 */
export function useMobile() {
    const isMobile = ref(false);
    const isMobileWidth = () => window.innerWidth <= BREAKPOINT;

    const checkMobile = () => {
        try {
            const isMobileUserAgent =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                );
            isMobile.value = isMobileWidth() || isMobileUserAgent;
        } catch {
            isMobile.value = isMobileWidth();
        }
    };

    onMounted(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
    });

    onUnmounted(() => window.removeEventListener('resize', checkMobile));

    return { isMobile };
}
