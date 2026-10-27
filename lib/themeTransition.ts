import { flushSync } from "react-dom";

let isTransitioning = false;

export interface ThemeTransitionParams {
  event?: React.MouseEvent<HTMLElement> | MouseEvent | null;
  nextTheme: string;
  setTheme: (theme: string) => void;
  duration?: number;
}

/**
 * Executes a butter-smooth circular clip-path theme transition.
 * A curve/circle expands outward from the clicked button, revealing
 * the incoming theme without fading everything at once.
 */
export async function executeThemeTransition({
  event,
  nextTheme,
  setTheme,
  duration = 1250,
}: ThemeTransitionParams): Promise<void> {
  // Prevent overlapping concurrent transitions
  if (isTransitioning) return;

  const doc = typeof document !== "undefined" ? document : null;
  const win = typeof window !== "undefined" ? window : null;

  if (!doc || !win) {
    setTheme(nextTheme);
    return;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = win.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Check for View Transitions API support
  const docWithVT = doc as Document & {
    startViewTransition?: (callback: () => void | Promise<void>) => {
      ready: Promise<void>;
      finished: Promise<void>;
    };
  };

  const supportsViewTransition =
    typeof docWithVT.startViewTransition === "function" && !prefersReducedMotion;

  if (!supportsViewTransition) {
    // Graceful fallback for browsers without View Transitions API
    setTheme(nextTheme);
    doc.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    const meta = doc.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute("content", nextTheme);
    return;
  }

  isTransitioning = true;

  // 1. Calculate origin coordinates from the click event or button center
  let x = win.innerWidth / 2;
  let y = win.innerHeight / 2;

  if (event) {
    if (typeof event.clientX === "number" && typeof event.clientY === "number" && (event.clientX !== 0 || event.clientY !== 0)) {
      x = event.clientX;
      y = event.clientY;
    } else if ("currentTarget" in event && event.currentTarget) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
  }

  // 2. Calculate the distance to the farthest corner so the circle sweeps the entire viewport
  const endRadius = Math.ceil(
    Math.hypot(
      Math.max(x, win.innerWidth - x),
      Math.max(y, win.innerHeight - y)
    )
  ) + 24;

  // 3. Mark document as transitioning to prevent conflicting transitions
  doc.documentElement.classList.add("theme-transitioning");

  try {
    const transition = docWithVT.startViewTransition!(() => {
      // Force synchronous DOM update so the incoming snapshot is 100% complete
      flushSync(() => {
        setTheme(nextTheme);
      });
      doc.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      const meta = doc.querySelector('meta[name="color-scheme"]');
      if (meta) meta.setAttribute("content", nextTheme);
    });

    await transition.ready;

    // 4. Animate the circular clip-path on the new incoming view
    // Easing cubic-bezier(0.4, 0, 0.2, 1) starts softly, glides calmly, and cushions to rest
    const animation = doc.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    await animation.finished;
    await transition.finished;
  } catch (error) {
    // If anything fails during transition, ensure theme is still set
    console.warn("Theme transition error, falling back:", error);
    setTheme(nextTheme);
    doc.documentElement.setAttribute("data-theme", nextTheme);
  } finally {
    doc.documentElement.classList.remove("theme-transitioning");
    isTransitioning = false;
  }
}
