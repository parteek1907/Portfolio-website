/**
 * Premium smooth scroll with custom easing.
 * Cancels immediately if the user scrolls manually.
 */
export function smoothScrollTo(targetY: number, duration: number = 1200) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 1) return;
    
    let startTime: number | null = null;
    let animationId: number | null = null;
    let cancelled = false;

    // Ease-out quint: fast start, very soft landing
    function easeOutQuint(t: number): number {
        return 1 - Math.pow(1 - t, 5);
    }

    // Cancel on any user-initiated scroll
    function onUserScroll() {
        cancelled = true;
        cleanup();
    }

    function cleanup() {
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener("wheel", onUserScroll);
        window.removeEventListener("touchmove", onUserScroll);
        window.removeEventListener("keydown", onKeyScroll);
    }

    function onKeyScroll(e: KeyboardEvent) {
        // Only cancel on scroll-related keys
        if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
            onUserScroll();
        }
    }

    function step(timestamp: number) {
        if (cancelled) return;
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuint(progress);

        window.scrollTo(0, startY + diff * easedProgress);

        if (progress < 1) {
            animationId = requestAnimationFrame(step);
        } else {
            cleanup();
        }
    }

    // Listen for user interrupts
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });
    window.addEventListener("keydown", onKeyScroll, { passive: true });

    animationId = requestAnimationFrame(step);
}

/**
 * Scroll to an element by ID with premium easing.
 * Accounts for a fixed navbar offset.
 */
export function smoothScrollToElement(elementId: string, offset: number = 80) {
    const elem = document.getElementById(elementId);
    if (!elem) return;

    const targetY = elem.getBoundingClientRect().top + window.scrollY - offset;
    const distance = Math.abs(targetY - window.scrollY);
    
    // Scale duration based on distance — longer distances get more time
    const duration = Math.min(Math.max(distance * 0.8, 600), 1800);
    
    smoothScrollTo(targetY, duration);
}
