import { ref, onMounted, onUnmounted } from 'vue';

const BREAKPOINT = 800;

/**
 * Composable for detecting mobile devices and screen width
 * @returns Object containing isMobile reactive reference
 */
export function useMobile() {
    const isMobile = ref(false);
    const isMobileDevice = ref(false);

    const isMobileWidth = () => window.innerWidth <= BREAKPOINT;

    function checkDevice() {
        try {
            isMobileDevice.value =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                );
        } catch {
            isMobileDevice.value = false;
        }
    }

    const checkMobile = () => (isMobile.value = isMobileWidth() || isMobileDevice.value);

    onMounted(() => {
        checkDevice();
        checkMobile();
        window.addEventListener('resize', checkMobile);
    });

    onUnmounted(() => window.removeEventListener('resize', checkMobile));

    return { isMobile, isMobileDevice };
}
