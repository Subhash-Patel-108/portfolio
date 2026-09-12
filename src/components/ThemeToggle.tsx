import { useCallback, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeToggle';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

interface ViewTransitionHandle {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition: () => void;
}

interface DocumentWithViewTransition {
    startViewTransition?: (
        callback: () => void | Promise<void>,
    ) => ViewTransitionHandle;
}

interface ThemeToggleProps {
    onToggle?: (next: 'light' | 'dark') => void;
    className?: string;
}

/* -------------------------------------------------------------------------- */
/*                      Fallback: DOM overlay water-drop                      */
/* -------------------------------------------------------------------------- */

function runOverlayDrop(nextTheme: 'light' | 'dark', commit: () => void) {
    const bgColor = nextTheme === 'dark' ? '#020617' : '#ffffff';
    const radius = Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
    const DROP = 26;

    const droplet = document.createElement('div');
    droplet.setAttribute('aria-hidden', 'true');
    Object.assign(droplet.style, {
        position: 'fixed',
        left: '50%',
        top: '0px',
        width: '0px',
        height: '0px',
        borderRadius: '50%',
        background: bgColor,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: '9999',
        willChange: 'top, width, height, border-radius, opacity',
        opacity: '0.98',
        boxShadow: `0 0 40px 8px ${
            nextTheme === 'dark'
                ? 'rgba(30,41,59,0.55)'
                : 'rgba(255,255,255,0.65)'
        }`,
    });
    document.body.appendChild(droplet);

    // Phase 1 — condense (0 → 140ms)
    requestAnimationFrame(() => {
        droplet.style.transition =
            'width 140ms cubic-bezier(0.22, 1, 0.36, 1), height 140ms cubic-bezier(0.22, 1, 0.36, 1)';
        droplet.style.width = `${DROP}px`;
        droplet.style.height = `${DROP}px`;
    });

    // Phase 2 — first fall (150 → 430ms)
    window.setTimeout(() => {
        droplet.style.transition = 'top 280ms cubic-bezier(0.45, 0, 0.9, 0.55)';
        droplet.style.top = '50%';
    }, 150);

    // Phase 3 — squash (430 → 480ms)
    window.setTimeout(() => {
        droplet.style.transition =
            'width 50ms cubic-bezier(0.22, 1, 0.36, 1), height 50ms cubic-bezier(0.22, 1, 0.36, 1)';
        droplet.style.width = `${DROP * 1.5}px`;
        droplet.style.height = `${DROP * 0.6}px`;
    }, 430);

    // Phase 4 — first bounce up (480 → 660ms)
    window.setTimeout(() => {
        droplet.style.transition =
            'top 180ms cubic-bezier(0.2, 0.6, 0.6, 1), width 100ms ease-out, height 100ms ease-out';
        droplet.style.top = '28%';
        droplet.style.width = `${DROP}px`;
        droplet.style.height = `${DROP}px`;
    }, 480);

    // Phase 5 — second fall (660 → 800ms)
    window.setTimeout(() => {
        droplet.style.transition = 'top 140ms cubic-bezier(0.55, 0, 0.9, 0.5)';
        droplet.style.top = '50%';
    }, 660);

    // Phase 6 — second squash (800 → 840ms)
    window.setTimeout(() => {
        droplet.style.transition =
            'width 40ms cubic-bezier(0.22, 1, 0.36, 1), height 40ms cubic-bezier(0.22, 1, 0.36, 1)';
        droplet.style.width = `${DROP * 1.35}px`;
        droplet.style.height = `${DROP * 0.7}px`;
    }, 800);

    // Phase 7 — tiny second bounce (840 → 940ms)
    window.setTimeout(() => {
        droplet.style.transition =
            'top 100ms cubic-bezier(0.2, 0.6, 0.6, 1), width 70ms ease-out, height 70ms ease-out';
        droplet.style.top = '42%';
        droplet.style.width = `${DROP * 0.95}px`;
        droplet.style.height = `${DROP * 0.95}px`;
    }, 840);

    // Phase 8 — settle (940 → 1020ms)
    window.setTimeout(() => {
        droplet.style.transition = 'top 80ms cubic-bezier(0.55, 0, 0.85, 0.55)';
        droplet.style.top = '50%';
    }, 940);

    // Phase 9 — splash outward (1020 → 1600ms)
    window.setTimeout(() => {
        droplet.style.transition =
            'width 580ms cubic-bezier(0.16, 1, 0.3, 1), height 580ms cubic-bezier(0.16, 1, 0.3, 1), border-radius 580ms cubic-bezier(0.16, 1, 0.3, 1), opacity 580ms ease-out';
        droplet.style.width = `${radius * 2}px`;
        droplet.style.height = `${radius * 2}px`;
        droplet.style.borderRadius = '0';
        droplet.style.opacity = '0';
        droplet.style.boxShadow = 'none';
    }, 1020);

    // Commit theme mid-splash — invisible to the eye
    window.setTimeout(() => commit(), 1100);

    window.setTimeout(() => droplet.remove(), 1620);
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export function ThemeToggle({ onToggle, className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const handleClick = useCallback(
        (_event: MouseEvent<HTMLButtonElement>) => {
            const next: 'light' | 'dark' = isDark ? 'light' : 'dark';
            const doc = document as DocumentWithViewTransition;

            const commit = () => {
                flushSync(() => {
                    toggleTheme();
                });
            };

            const prefersReduced = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;
            if (prefersReduced) {
                commit();
                onToggle?.(next);
                return;
            }

            /* -------------------- Primary: View Transitions API ------------------- */
            if (typeof doc.startViewTransition === 'function') {
                try {
                    const radius = Math.hypot(
                        window.innerWidth / 2,
                        window.innerHeight / 2,
                    );

                    const transition = doc.startViewTransition(() => {
                        commit();
                    });

                    transition.ready
                        .then(() => {
                            // Same 16-keyframe bounce, compressed to ~1600ms.
                            document.documentElement.animate(
                                [
                                    {
                                        clipPath: 'circle(0px at 50% -2%)',
                                        offset: 0,
                                        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                    },
                                    // 1 · condense
                                    {
                                        clipPath: 'circle(14px at 50% -2%)',
                                        offset: 0.06,
                                        easing: 'cubic-bezier(0.45, 0, 0.9, 0.55)',
                                    },
                                    // 2 · first fall
                                    {
                                        clipPath: 'circle(15px at 50% 22%)',
                                        offset: 0.16,
                                        easing: 'cubic-bezier(0.5, 0, 0.8, 0.55)',
                                    },
                                    {
                                        clipPath: 'circle(16px at 50% 46%)',
                                        offset: 0.24,
                                        easing: 'cubic-bezier(0.34, 1, 0.68, 1)',
                                    },
                                    // 3 · squash at first impact
                                    {
                                        clipPath: 'circle(20px at 50% 50%)',
                                        offset: 0.27,
                                        easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
                                    },
                                    {
                                        clipPath: 'circle(18px at 50% 50%)',
                                        offset: 0.29,
                                        easing: 'cubic-bezier(0.2, 0.6, 0.6, 1)',
                                    },
                                    // 4 · bounce up
                                    {
                                        clipPath: 'circle(15px at 50% 34%)',
                                        offset: 0.39,
                                        easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
                                    },
                                    {
                                        clipPath: 'circle(14px at 50% 28%)',
                                        offset: 0.44,
                                        easing: 'cubic-bezier(0.55, 0, 0.9, 0.5)',
                                    },
                                    // 5 · second fall
                                    {
                                        clipPath: 'circle(15px at 50% 46%)',
                                        offset: 0.51,
                                        easing: 'cubic-bezier(0.34, 1, 0.68, 1)',
                                    },
                                    // 6 · second squash
                                    {
                                        clipPath: 'circle(19px at 50% 50%)',
                                        offset: 0.54,
                                        easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
                                    },
                                    {
                                        clipPath: 'circle(17px at 50% 50%)',
                                        offset: 0.56,
                                        easing: 'cubic-bezier(0.2, 0.6, 0.6, 1)',
                                    },
                                    // 7 · tiny second bounce
                                    {
                                        clipPath: 'circle(14px at 50% 42%)',
                                        offset: 0.62,
                                        easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
                                    },
                                    {
                                        clipPath: 'circle(13px at 50% 40%)',
                                        offset: 0.65,
                                        easing: 'cubic-bezier(0.55, 0, 0.85, 0.55)',
                                    },
                                    // 8 · settle to middle
                                    {
                                        clipPath: 'circle(15px at 50% 50%)',
                                        offset: 0.70,
                                        easing: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
                                    },
                                    // 9 · splash outward
                                    {
                                        clipPath: 'circle(28px at 50% 50%)',
                                        offset: 0.75,
                                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                    },
                                    {
                                        clipPath: `circle(${radius * 0.5}px at 50% 50%)`,
                                        offset: 0.87,
                                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                    },
                                    {
                                        clipPath: `circle(${radius * 1.1}px at 50% 50%)`,
                                        offset: 1,
                                    },
                                ],
                                {
                                    duration: 1600,
                                    fill: 'forwards',
                                    pseudoElement: '::view-transition-new(root)',
                                },
                            );
                        })
                        .catch(() => {
                            /* skipped if user clicks again mid-animation */
                        });
                } catch {
                    runOverlayDrop(next, commit);
                }
            } else {
                runOverlayDrop(next, commit);
            }

            onToggle?.(next);
        },
        [isDark, toggleTheme, onToggle],
    );

    return (
        <motion.button
            type="button"
            onClick={handleClick}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-pressed={isDark}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className={[
                'group relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-xl',
                'border border-slate-200 bg-white/70 backdrop-blur-sm',
                'shadow-sm shadow-slate-900/5',
                'transition-colors duration-300',
                'hover:border-amber-300 hover:bg-amber-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
                'focus-visible:ring-offset-white',
                'dark:border-slate-700 dark:bg-slate-900/70',
                'dark:shadow-black/30',
                'dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/10',
                'dark:focus-visible:ring-offset-slate-950',
                className ?? '',
            ].join(' ')}
        >
            <span
                aria-hidden="true"
                className={[
                    'pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500',
                    'group-hover:opacity-100',
                    isDark
                        ? 'bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.35),transparent_70%)]'
                        : 'bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.35),transparent_70%)]',
                ].join(' ')}
            />

            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.span
                        key="moon"
                        initial={{ rotate: -140, scale: 0.4, opacity: 0, filter: 'blur(6px)' }}
                        animate={{ rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ rotate: 140, scale: 0.4, opacity: 0, filter: 'blur(6px)' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.6 }}
                        className="relative z-10 flex items-center justify-center"
                    >
                        <Moon
                            className="h-[18px] w-[18px] fill-indigo-400/30 text-indigo-400 transition-colors duration-300 group-hover:text-indigo-300 dark:fill-indigo-300/30 dark:text-indigo-300 dark:group-hover:text-indigo-200"
                            strokeWidth={2.2}
                        />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        initial={{ rotate: 140, scale: 0.4, opacity: 0, filter: 'blur(6px)' }}
                        animate={{ rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ rotate: -140, scale: 0.4, opacity: 0, filter: 'blur(6px)' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.6 }}
                        className="relative z-10 flex items-center justify-center"
                    >
                        <Sun
                            className="h-[18px] w-[18px] fill-amber-400/40 text-amber-600 transition-colors duration-300 group-hover:text-amber-500 dark:fill-amber-400/20 dark:text-amber-300"
                            strokeWidth={2.2}
                        />
                    </motion.span>
                )}
            </AnimatePresence>

            <motion.span
                key={theme}
                aria-hidden="true"
                initial={{ scale: 0.6, opacity: 0.55 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={[
                    'pointer-events-none absolute inset-0 rounded-xl border',
                    isDark ? 'border-indigo-400/60' : 'border-amber-400/60',
                ].join(' ')}
            />
        </motion.button>
    );
}

export default ThemeToggle;