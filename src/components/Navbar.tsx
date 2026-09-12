import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ComponentType,
    type ReactNode,
} from 'react';
import {
    Code2,
    FileText,
    FolderGit2,
    Home,
    Mail,
    Menu,
    User,
    X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { useScrollSpy } from '../hooks/useScrollSpy';
import { personal, socials } from '../data/portfolio';
import { useTheme } from '@/contexts/ThemeToggle';
import { useToast } from '@/contexts/ToastContext';

import Logo from './Logo';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import ThemeToggle from './ThemeToggle';

/* -------------------------------------------------------------------------- */
/*  Classic Light Palette — Timeless Professional                             */
/*  Light:  bg #FFFFFF / #FFFCF8 warm white  | border #E7E5E4 stone-200       */
/*         text #1C1917 stone-900 | muted #57534E stone-600 / #78716C         */
/*         hover #F5F5F4 stone-100 | active #1C1917 stone-900 pill            */
/*  Accent: #0F172A slate-900 (classic ink) + #4338CA indigo-700 for dot/logo */
/*  Dark:   unchanged — slate-950 + indigo-400/500                            */
/* -------------------------------------------------------------------------- */

interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home', icon: Home },
    { id: 'about', label: 'About', href: '#about', icon: User },
    { id: 'skills', label: 'Skills', href: '#skills', icon: Code2 },
    { id: 'projects', label: 'Projects', href: '#projects', icon: FolderGit2 },
    { id: 'resume', label: 'Resume', href: '#resume', icon: FileText },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
];

const NAV_IDS = NAV_ITEMS.map((i) => i.id);

/* -------------------------------------------------------------------------- */
/*                          Brand icon color lookup                           */
/* -------------------------------------------------------------------------- */

/**
 * Returns Tailwind classes that color an icon in its brand color.
 * Used in the header socials + mobile menu social buttons.
 */
function brandIconClass(label: string): string {
    const l = label.toLowerCase();
    if (l.includes('github')) return 'text-stone-900 dark:text-white';
    if (l.includes('linkedin')) return 'text-[#0A66C2] dark:text-[#4A9FE8]';
    if (l.includes('leetcode')) return 'text-[#FFA116] dark:text-[#FFB84D]';
    if (l.includes('geeksforgeeks') || l.includes('gfg'))
        return 'text-[#2F8D46] dark:text-[#4CAF50]';
    if (l.includes('twitter') || l.includes('x'))
        return 'text-stone-900 dark:text-white';
    return 'text-stone-500 dark:text-slate-400';
}

/* -------------------------------------------------------------------------- */
/*  Tooltip — used ONLY where a label is not already visible                  */
/*  (i.e. the social icons in the header — kept classic ink)                  */
/* -------------------------------------------------------------------------- */

function Tooltip({ label, children }: { label: string; children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    return (
        <span
            className="relative inline-flex"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            {children}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-full z-50 mt-2.5 -translate-x-1/2"
            >
                <AnimatePresence>
                    {open && (
                        <motion.span
                            role="tooltip"
                            initial={
                                shouldReduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: 6, scale: 0.96, filter: 'blur(4px)' }
                            }
                            animate={
                                shouldReduceMotion
                                    ? { opacity: 1 }
                                    : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                            }
                            exit={
                                shouldReduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: 4, scale: 0.96, filter: 'blur(4px)' }
                            }
                            transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.6 }}
                            className="relative block whitespace-nowrap rounded-full border border-stone-800 bg-[#1C1917] px-3 py-1 text-[11px] font-semibold tracking-wide text-stone-50 shadow-[0_8px_24px_rgba(28,25,23,0.22),0_2px_8px_rgba(28,25,23,0.14)] dark:border-white/10 dark:bg-slate-900 dark:text-white"
                        >
                            <span className="relative z-10 flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full bg-white/90" />
                                {label}
                            </span>
                            <span
                                aria-hidden="true"
                                className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-stone-800 bg-[#1C1917] dark:border-white/10 dark:bg-slate-900"
                            />
                            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.07] to-transparent" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
        </span>
    );
}

/* -------------------------------------------------------------------------- */
/*  Nav Pill — Classic Light, Pro Motion                                      */
/*  Label expands inline on hover/active — NO tooltip (avoids duplicate text) */
/* -------------------------------------------------------------------------- */

interface NavButtonProps {
    item: NavItem;
    isActive: boolean;
    onSelect: (id: string) => void;
    index: number;
}

function NavButton({ item, isActive, onSelect, index }: NavButtonProps) {
    const { id, label, href, icon: Icon } = item;
    const shouldReduceMotion = useReducedMotion();
    const [isHovered, setIsHovered] = useState(false);
    const isExpanded = isHovered || isActive;

    return (
        <motion.li
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.045, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <a
                href={href}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                    e.preventDefault();
                    onSelect(id);
                }}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                className={[
                    'group relative flex h-[36px] items-center justify-center rounded-full border',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2',
                    'focus-visible:ring-offset-white dark:focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-950',
                    isActive
                        ? // CLASSIC ACTIVE — ink pill in light, indigo soft in dark
                        'border-[#1C1917] bg-[#1C1917] text-white shadow-[0_4px_12px_rgba(28,25,23,0.18),0_1px_3px_rgba(28,25,23,0.12)] dark:border-indigo-500/20 dark:bg-indigo-500/15 dark:text-indigo-300 dark:shadow-indigo-500/10'
                        : // CLASSIC INACTIVE — stone neutrals, paper hover
                        'border-transparent bg-transparent text-stone-600 hover:border-stone-200 hover:bg-[#F5F5F4] hover:text-stone-900 hover:shadow-sm hover:shadow-stone-900/[0.04] dark:text-slate-400 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-white dark:hover:shadow-black/20',
                    'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] active:translate-y-0',
                ].join(' ')}
                style={{
                    paddingLeft: '11px',
                    paddingRight: isExpanded ? '15px' : '11px',
                    gap: isExpanded ? '8px' : '0px',
                    transition:
                        'gap 0.42s cubic-bezier(0.16,1,0.3,1), padding 0.42s cubic-bezier(0.16,1,0.3,1), transform 0.3s ease',
                }}
            >
                {/* Active ink wash — layout morph */}
                {isActive && (
                    <motion.span
                        layoutId="nav-active-pill-classic"
                        className="absolute inset-0 -z-0 rounded-full bg-[#1C1917] dark:bg-indigo-500/15"
                        transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    />
                )}

                {/* Hover paper wash (light only) */}
                {!isActive && (
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#F5F5F4] dark:bg-slate-800/60" />
                )}

                {/* Icon */}
                <span className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                    <motion.span
                        animate={
                            shouldReduceMotion
                                ? {}
                                : isHovered
                                    ? { scale: 1.1, rotate: isActive ? 0 : -6 }
                                    : { scale: 1, rotate: 0 }
                        }
                        transition={{ type: 'spring', stiffness: 520, damping: 20 }}
                        className="flex"
                    >
                        <Icon className="h-[18px] w-[18px]" />
                    </motion.span>
                </span>

                {/* Label slide — this IS the only label the pill ever shows */}
                <span
                    className={[
                        'relative z-10 overflow-hidden whitespace-nowrap text-[13px] font-[550] tracking-[-0.015em]',
                        'transition-[max-width,opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isExpanded
                            ? 'max-w-[120px] opacity-100 translate-x-0'
                            : 'max-w-0 opacity-0 -translate-x-1',
                    ].join(' ')}
                    aria-hidden={isExpanded ? undefined : true}
                >
                    <span className="block pr-0.5">{label}</span>
                </span>

                {/* Classic active dot — warm stone/indigo */}
                {isActive && (
                    <motion.span
                        layoutId="nav-active-dot-classic"
                        className="pointer-events-none absolute -bottom-[4px] left-1/2 z-10 flex -translate-x-1/2 items-center justify-center"
                        transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                    >
                        <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-stone-400 opacity-30 dark:bg-indigo-400" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1C1917] dark:bg-indigo-400" />
                        </span>
                    </motion.span>
                )}
            </a>
        </motion.li>
    );
}

/* -------------------------------------------------------------------------- */
/*  Social — Classic stone hover, brand-colored icon glyph                    */
/* -------------------------------------------------------------------------- */

function SocialIconLink({
    label,
    href,
    icon: Icon,
}: {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
}) {
    return (
        <li className="flex items-center">
            <Tooltip label={label}>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:border-stone-200 hover:bg-white hover:shadow-sm hover:shadow-stone-900/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-0 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:shadow-black/20 dark:focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-950"
                >
                    <Icon
                        className={[
                            'h-[16px] w-[16px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]',
                            brandIconClass(label),
                        ].join(' ')}
                    />
                </a>
            </Tooltip>
        </li>
    );
}

/* -------------------------------------------------------------------------- */
/*  Navbar — Classic Light, Editorial Professional                            */
/*  Drop is owned by ThemeToggle.tsx (View Transition + overlay fallback)     */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
    const { theme } = useTheme();
    const toast = useToast();
    const activeId = useScrollSpy(NAV_IDS);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const original = document.body.style.overflow;
        if (mobileOpen) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [mobileOpen]);

    const handleNavClick = useCallback((id: string) => {
        // Restore body scroll (mobile menu sets overflow: hidden)
        document.body.style.overflow = '';

        const performScroll = () => {
            const el = document.getElementById(id);
            if (!el) return;
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        if (mobileOpen) {
            // Menu is open → close it, then wait for the 400ms collapse
            // animation to finish before measuring the target's position.
            // Measuring earlier lands us ~275px too low because the menu
            // is still pushing every section downward.
            setMobileOpen(false);
            window.setTimeout(performScroll, 420);
        } else {
            // Desktop, or mobile with the menu already closed → scroll now.
            performScroll();
        }

        if ('vibrate' in navigator) {
            try { navigator.vibrate(10); } catch { /* noop */ }
        }
    }, [mobileOpen]);

    const handleThemeToggle = useCallback(
        (next: 'light' | 'dark') => {
            toast.info(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled', {
                description: 'Your preference has been saved.',
                duration: 2200,
            });
        },
        [toast],
    );

    const headerSocials = [
        {
            label: 'GitHub',
            href: socials.find((s) => s.label.toLowerCase().includes('git'))?.href ?? '#',
            icon: GithubIcon,
        },
        {
            label: 'LinkedIn',
            href: socials.find((s) => s.label.toLowerCase().includes('linked'))?.href ?? '#',
            icon: LinkedinIcon,
        },
    ];

    return (
        <header
            ref={headerRef}
            className={[
                'sticky top-0 z-50 w-full border-b transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
                scrolled
                    ? 'border-stone-200 bg-white/95 shadow-[0_1px_2px_rgba(28,25,23,0.06),0_4px_16px_rgba(28,25,23,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/85 dark:border-slate-800/80 dark:bg-slate-950/80 dark:shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.4)] dark:backdrop-blur-2xl'
                    : 'border-transparent bg-[#FFFCF8]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#FFFCF8]/60 dark:bg-slate-950/40',
            ].join(' ')}
        >
            {/* Top hairline — classic editorial 1px */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-200/60 to-transparent dark:via-white/[0.06]" />

            <nav
                aria-label="Primary"
                className="mx-auto flex h-[64px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
            >
                {/* Logo — classic ink + stone subtitle */}
                <a
                    href="#home"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('home');
                    }}
                    aria-label={`${personal.name} — home`}
                    className="group flex shrink-0 items-center gap-3"
                >
                    <motion.span
                        whileHover={shouldReduceMotion ? {} : { scale: 1.04, rotate: 1 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                        className="relative block"
                    >
                        <Logo size={36} className="drop-shadow-[0_1px_4px_rgba(28,25,23,0.08)]" />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:opacity-100" />
                        </span>
                        <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-stone-900/10 transition-opacity duration-300 group-hover:opacity-100 dark:ring-white/10" />
                    </motion.span>

                    <span className="hidden flex-col leading-tight sm:flex">
                        <span className="flex items-center gap-2 text-[14px] font-[650] tracking-[-0.02em] text-stone-900 dark:text-white">
                            {personal.name}
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 18 }}
                                className="hidden items-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-stone-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/80 lg:inline-flex"
                            >
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600 dark:bg-emerald-400" />
                                AVAILABLE
                            </motion.span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-500 dark:text-slate-400">
                            Full Stack Java Dev
                            <span className="hidden h-px w-6 bg-stone-200 dark:bg-slate-700 sm:inline-block" />
                            <span className="hidden font-semibold tracking-[0.12em] text-stone-700 dark:text-slate-300 sm:inline">
                                Portfolio
                            </span>
                        </span>
                    </span>
                </a>

                {/* Desktop nav — classic stone pills, no tooltip */}
                <ul className="hidden items-center gap-1.5 lg:flex" role="list">
                    {NAV_ITEMS.map((item, idx) => (
                        <NavButton
                            key={item.id}
                            item={item}
                            isActive={activeId === item.id}
                            onSelect={handleNavClick}
                            index={idx}
                        />
                    ))}
                </ul>

                {/* Right controls — classic divider stone-200 */}
                <div className="flex items-center gap-2">
                    <ul className="mr-1 hidden items-center gap-1 border-r border-stone-200 pr-3 dark:border-slate-800 md:flex">
                        {headerSocials.map((s) => (
                            <SocialIconLink key={s.label} {...s} />
                        ))}
                    </ul>

                    {/* Single icon ThemeToggle — owns drop animation */}
                    <ThemeToggle />

                    {/* Mobile trigger — classic stone */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-transparent bg-transparent text-stone-600 transition-all duration-300 hover:border-stone-200 hover:bg-white hover:text-stone-900 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:text-slate-300 dark:hover:border-slate-800 dark:hover:bg-slate-900 dark:hover:text-white dark:focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-slate-950 lg:hidden"
                    >
                        <span className="relative block h-[18px] w-[18px]">
                            <AnimatePresence mode="wait" initial={false}>
                                {mobileOpen ? (
                                    <motion.span
                                        key="close"
                                        initial={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { rotate: -90, opacity: 0, scale: 0.8 }
                                        }
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { rotate: 90, opacity: 0, scale: 0.8 }
                                        }
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <X className="h-[18px] w-[18px]" />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="open"
                                        initial={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { rotate: 90, opacity: 0, scale: 0.8 }
                                        }
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={
                                            shouldReduceMotion
                                                ? { opacity: 0 }
                                                : { rotate: -90, opacity: 0, scale: 0.8 }
                                        }
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <Menu className="h-[18px] w-[18px]" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                    </button>
                </div>
            </nav>

            {/* Mobile — classic warm paper, stone cards */}
            <div
                id="mobile-menu"
                className={[
                    'grid overflow-hidden border-t transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
                    mobileOpen
                        ? 'grid-rows-[1fr] border-stone-200 bg-white opacity-100 dark:border-slate-800 dark:bg-slate-950'
                        : 'grid-rows-[0fr] border-transparent opacity-0',
                ].join(' ')}
            >
                <div className="min-h-0 overflow-hidden bg-white dark:bg-slate-950">
                    <motion.ul
                        initial={false}
                        animate={mobileOpen ? 'open' : 'closed'}
                        variants={{
                            open: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
                            closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                        }}
                        className="space-y-1 px-4 py-4"
                    >
                        {NAV_ITEMS.map(({ id, label, href, icon: Icon }) => {
                            const isActive = activeId === id;
                            return (
                                <motion.li
                                    key={id}
                                    variants={{
                                        open: { opacity: 1, x: 0, filter: 'blur(0px)' },
                                        closed: { opacity: 0, x: -12, filter: 'blur(4px)' },
                                    }}
                                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <a
                                        href={href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(id);
                                        }}
                                        className={[
                                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300',
                                            isActive
                                                ? 'bg-[#1C1917] text-white shadow-sm dark:bg-white dark:text-slate-900'
                                                : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 active:bg-stone-100 dark:bg-transparent dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white',
                                        ].join(' ')}
                                    >
                                        <span
                                            className={[
                                                'flex h-8 w-8 items-center justify-center rounded-lg border transition-colors',
                                                isActive
                                                    ? 'border-white/15 bg-white/10 text-white dark:border-slate-200 dark:bg-white dark:text-slate-900'
                                                    : 'border-stone-200 bg-stone-50 text-stone-600 group-hover:border-stone-300 group-hover:bg-white group-hover:text-stone-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:border-slate-700 dark:group-hover:text-white',
                                            ].join(' ')}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <span className="flex-1 tracking-[-0.01em]">{label}</span>
                                        {isActive ? (
                                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white dark:bg-slate-900" />
                                        ) : (
                                            <span className="text-xs opacity-0 transition-all group-hover:opacity-30">
                                                ↗
                                            </span>
                                        )}
                                    </a>
                                </motion.li>
                            );
                        })}

                        <motion.li
                            variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 8 } }}
                            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                            className="!mt-3 border-t border-stone-200 pt-3 dark:border-slate-800"
                        >
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-slate-400">
                                    Connect
                                </span>
                                <span className="text-[11px] text-stone-400 dark:text-slate-500">
                                    Stay in touch
                                </span>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                {headerSocials.map(({ label, href, icon: Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900 hover:shadow active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >
                                        <Icon
                                            className={[
                                                'h-4 w-4',
                                                brandIconClass(label),
                                            ].join(' ')}
                                        />
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </motion.li>
                    </motion.ul>
                </div>
            </div>

            {/* Keep theme for debugging */}
            <span className="hidden" aria-hidden="true">
                {theme}
            </span>
        </header>
    );
}