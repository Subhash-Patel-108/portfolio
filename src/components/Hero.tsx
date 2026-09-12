import { useCallback, type ComponentType } from 'react';
import {
    ArrowDown,
    ArrowRight,
    Copy,
    Download,
    MapPin,
    Trophy,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { useTypewriter } from '../hooks/useTypewriter';
import { personal, socials, stats, codingProfiles } from '../data/portfolio';
import { useToast } from '@/contexts/ToastContext';

/* -------------------------------------------------------------------------- */
/*  Tokens                                                                    */
/* -------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const ROLES = [
    'shipping backends in Java 21 + Spring Boot',
    'streaming click events through Kafka at scale',
    'caching hot redirects in Redis',
    'deploying to AWS with CI/CD on Linux',
];

/* -------------------------------------------------------------------------- */
/*                          Brand icon color lookup                           */
/* -------------------------------------------------------------------------- */

function brandIconClass(label: string): string {
    const l = label.toLowerCase();
    if (l.includes('github')) return 'text-stone-900 dark:text-white';
    if (l.includes('linkedin')) return 'text-[#0A66C2] dark:text-[#4A9FE8]';
    if (l.includes('leetcode')) return 'text-[#FFA116] dark:text-[#FFB84D]';
    if (l.includes('geeksforgeeks') || l.includes('gfg'))
        return 'text-[#2F8D46] dark:text-[#4CAF50]';
    return 'text-stone-500 dark:text-slate-400';
}

/* -------------------------------------------------------------------------- */
/*                    Hero-local icon overrides (socials only)                */
/* -------------------------------------------------------------------------- */

/**
 * Hero-only visual override. GFG renders as a Trophy in the Hero's
 * socials row; every other place in the app keeps the brand mark
 * stored in `portfolio.ts`.
 */
function heroSocialIcon(
    label: string,
    fallback: ComponentType<{ className?: string }>,
): ComponentType<{ className?: string }> {
    const l = label.toLowerCase();
    if (l.includes('geeksforgeeks') || l.includes('gfg')) return Trophy;
    return fallback;
}

/* -------------------------------------------------------------------------- */
/*                                Caret                                       */
/* -------------------------------------------------------------------------- */

function Caret({ visible }: { visible: boolean }) {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion) return null;
    return (
        <motion.span
            aria-hidden="true"
            animate={{ opacity: visible ? [1, 1, 0, 0] : [0, 0, 1, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="ml-[2px] inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-amber-600 align-middle dark:bg-amber-400"
        />
    );
}

/* -------------------------------------------------------------------------- */
/*                            Terminal writing line                           */
/* -------------------------------------------------------------------------- */

function TerminalLine({
    text,
    isHolding,
    ariaLabel,
}: {
    text: string;
    isHolding: boolean;
    ariaLabel: string;
}) {
    return (
        <div className="inline-flex min-h-[34px] max-w-full items-center rounded-full border border-amber-200/80 bg-amber-50/70 px-3 py-1.5 shadow-[0_1px_2px_rgba(180,83,9,0.04)] sm:min-h-[38px] sm:px-4 sm:py-2 dark:border-amber-500/25 dark:bg-amber-500/[0.06]">
            <span className="mr-2 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 sm:inline-block" />

            <p
                aria-live="polite"
                aria-label={ariaLabel}
                className="min-w-0 truncate font-mono text-[12px] font-medium tracking-[-0.01em] text-amber-700 sm:text-[13px] dark:text-amber-300"
            >
                <span className="mr-1 select-none text-amber-500/90 dark:text-amber-400/80">
                    $
                </span>
                <span>{text}</span>
                <Caret visible={isHolding || text.length > 0} />
            </p>

            <span className="ml-3 hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700/50 sm:inline-flex dark:text-amber-300/50">
                writing
            </span>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                               Code line                                    */
/* -------------------------------------------------------------------------- */

function CodeLine({
    n,
    children,
    delay = 0,
}: {
    n: number;
    children: React.ReactNode;
    delay?: number;
}) {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay, ease: EASE_OUT }}
            className="group flex items-start"
        >
            <span className="w-6 shrink-0 select-none text-right text-[10.5px] text-slate-300 transition-colors group-hover:text-amber-500 dark:text-slate-600 dark:group-hover:text-amber-400">
                {n}
            </span>
            <span className="flex-1 pl-4 whitespace-pre">{children}</span>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Hero                                     */
/* -------------------------------------------------------------------------- */

export default function Hero() {
    const toast = useToast();
    const shouldReduceMotion = useReducedMotion();

    const { text: typedRole, isHolding } = useTypewriter(ROLES, {
        typeSpeed: 58,
        deleteSpeed: 28,
        holdDuration: 1900,
        startDelay: 500,
    });

    const scrollTo = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const copyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(personal.email);
            toast.success('Email copied to clipboard', {
                description: personal.email,
                duration: 2600,
            });
        } catch {
            toast.error('Could not copy email', {
                description: 'Please copy manually: ' + personal.email,
            });
        }
    }, [toast]);

    return (
        <section
            id="home"
            className="relative isolate md:mt-0 -mt-7 flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-[#FFFCF8] pt-10 pb-12 sm:pt-14 sm:pb-16 dark:bg-slate-950"
        >
            {/* ==================== Background ==================== */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)] dark:bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)]" />

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, 90, -40, 0],
                                y: [0, -50, 40, 0],
                                scale: [1, 1.15, 0.92, 1],
                            }
                    }
                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[2%] top-[8%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),rgba(99,102,241,0.05),transparent)] blur-[70px] sm:h-[420px] sm:w-[420px] sm:blur-[80px] lg:h-[520px] lg:w-[520px] dark:bg-[radial-gradient(closest-side,rgba(99,102,241,0.45),rgba(99,102,241,0.08),transparent)]"
                />

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, -80, 50, 0],
                                y: [0, 50, -30, 0],
                                scale: [1, 0.94, 1.12, 1],
                            }
                    }
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute bottom-[5%] right-[2%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.30),rgba(245,158,11,0.05),transparent)] blur-[70px] sm:h-[400px] sm:w-[400px] sm:blur-[80px] lg:h-[480px] lg:w-[480px] dark:bg-[radial-gradient(closest-side,rgba(245,158,11,0.28),rgba(245,158,11,0.06),transparent)]"
                />

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, 60, -30, 0],
                                y: [0, -30, 30, 0],
                                scale: [1, 1.1, 0.95, 1],
                            }
                    }
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                    }}
                    className="absolute left-[45%] top-[55%] hidden h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)] blur-[70px] sm:block dark:bg-[radial-gradient(closest-side,rgba(20,184,166,0.20),transparent)]"
                />

                <div
                    className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #1C1917 1px, transparent 1px), linear-gradient(to bottom, #1C1917 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        maskImage:
                            'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                        WebkitMaskImage:
                            'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                    }}
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#FFFCF8] dark:to-slate-950" />
                <div className="absolute inset-x-0 top-0 h-px bg-stone-200 dark:bg-white/10" />
            </div>

            {/* ==================== Content ==================== */}
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
                    {/* ================= LEFT ================= */}
                    <div className="min-w-0">
                        {/* Availability capsule */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-[11.5px] font-medium tracking-wide text-stone-700 backdrop-blur-sm sm:text-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Open to SDE / Backend / Full Stack
                        </div>

                        {/* Eyebrow */}
                        <p className="mt-5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-stone-500 sm:mt-6 sm:text-[11px] sm:tracking-[0.2em] dark:text-slate-500">
                            B.Tech CSE · Amity University · 2026
                        </p>

                        {/* Headline */}
                        <h1 className="mt-2.5 text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:mt-3 sm:text-5xl lg:text-[3.9rem]">
                            <span className="block">
                                <span className="inline-block rounded-[10px] bg-stone-900 px-2.5 py-1 text-white shadow-[0_8px_24px_-8px_rgba(28,25,23,0.4)] sm:px-3 dark:bg-white dark:text-stone-900 dark:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.15)]">
                                    {personal.name}
                                </span>
                            </span>

                            <span className="mt-1 block font-serif text-[1.5rem] font-normal italic tracking-[-0.02em] text-stone-700 sm:text-[2.35rem] lg:text-[2.85rem] dark:text-slate-300">
                                Full Stack Java Developer
                            </span>

                            <span className="block text-stone-900 dark:text-white">
                                building production systems.
                            </span>
                        </h1>

                        {/* Terminal */}
                        <div className="mt-5 sm:mt-6">
                            <TerminalLine
                                text={typedRole}
                                isHolding={isHolding}
                                ariaLabel={`Currently ${ROLES.join(', ')}`}
                            />
                            <p className="sr-only">{personal.role}</p>
                        </div>

                        {/* Description */}
                        <p className="mt-4 max-w-[58ch] text-[14px] leading-[1.7] text-stone-600 sm:mt-5 sm:text-[15px] sm:leading-relaxed dark:text-slate-400">
                            I build production-grade backend systems with{' '}
                            <span className="font-medium text-stone-900 dark:text-white">
                                Java, Spring Boot, Kafka, and Redis
                            </span>{' '}
                            — and the React + TypeScript interfaces in front of them.{' '}
                            <span className="font-medium text-stone-900 dark:text-white">
                                Dishari
                            </span>{' '}
                            handles high-throughput URL redirection with a Kafka analytics
                            backbone. Ranked #1 on Amity&apos;s GeeksforGeeks leaderboard.
                        </p>

                        {/* Meta */}
                        <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] text-stone-500 sm:mt-4 sm:text-[13px] dark:text-slate-400">
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                {personal.location}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-stone-300 dark:bg-slate-600" />
                            <span className="inline-flex items-center gap-1">
                                <Trophy className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                                <span className="font-medium text-stone-700 dark:text-slate-300">
                                    #1 GFG · Amity 2025
                                </span>
                            </span>
                        </div>

                        {/* CTAs */}
                        <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
                            <button
                                type="button"
                                onClick={() => scrollTo('projects')}
                                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-stone-900 px-5 text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8] sm:h-11 sm:px-6 sm:text-[13.5px] dark:bg-white dark:text-stone-900 dark:hover:bg-slate-100 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                            >
                                View selected work
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <a
                                href={personal.resumeUrl}
                                download
                                className="inline-flex h-10 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-[13px] font-semibold tracking-[-0.01em] text-stone-800 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8] sm:h-11 sm:px-5 sm:text-[13.5px] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                            >
                                <Download className="h-3.5 w-3.5" />
                                Resume
                            </a>

                            <button
                                type="button"
                                onClick={copyEmail}
                                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-3 text-[13px] font-medium text-amber-700 transition-colors hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8] sm:h-11 sm:text-[13.5px] dark:text-amber-400 dark:hover:bg-amber-500/[0.10] dark:hover:text-amber-300 dark:focus-visible:ring-amber-400/60 dark:focus-visible:ring-offset-slate-950"
                            >
                                <Copy className="h-3.5 w-3.5" />
                                Copy email
                            </button>
                        </div>

                        {/* Socials + coding profiles */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:mt-8 sm:gap-x-6">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                                <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400 sm:inline dark:text-slate-500">
                                    Find me
                                </span>
                                <span className="hidden h-px w-5 bg-stone-200 sm:inline-block sm:w-6 dark:bg-slate-800" />

                                {/* Socials — Hero-local override: GFG → Trophy */}
                                {socials.map(({ label, href, icon: DataIcon }) => {
                                    const Icon = heroSocialIcon(label, DataIcon);
                                    return (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white transition-colors hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8] sm:h-9 sm:w-9 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                                        >
                                            <Icon
                                                className={[
                                                    'h-[14px] w-[14px] sm:h-[15px] sm:w-[15px]',
                                                    brandIconClass(label),
                                                ].join(' ')}
                                            />
                                        </a>
                                    );
                                })}

                                {/* Coding profiles — data icons only, no override */}
                                {codingProfiles
                                    .filter(
                                        (p) =>
                                            !['github', 'linkedin'].some((k) =>
                                                p.label.toLowerCase().includes(k),
                                            ),
                                    )
                                    .map(({ label, href, icon: Icon }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white transition-colors hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8] sm:h-9 sm:w-9 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                                        >
                                            <Icon
                                                className={[
                                                    'h-[14px] w-[14px] sm:h-[15px] sm:w-[15px]',
                                                    brandIconClass(label),
                                                ].join(' ')}
                                            />
                                        </a>
                                    ))}
                            </div>

                            {/* Scroll button — hidden on mobile */}
                            <button
                                type="button"
                                onClick={() => scrollTo('about')}
                                aria-label="Scroll to about section"
                                className="group relative hidden shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-stone-200 bg-white/80 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-600 backdrop-blur-md transition-colors duration-300 hover:border-amber-300 hover:bg-amber-50/70 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8] sm:inline-flex dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/[0.08] dark:hover:text-amber-300 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full border border-amber-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                                <motion.span
                                    aria-hidden="true"
                                    animate={
                                        shouldReduceMotion
                                            ? {}
                                            : { y: [0, 4, 0], opacity: [0.5, 1, 0.5] }
                                    }
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                    className="inline-flex"
                                >
                                    <ArrowDown className="h-3.5 w-3.5" />
                                </motion.span>
                                <span>Scroll</span>
                            </button>
                        </div>
                    </div>

                    {/* ========== RIGHT — Interactive code card ========== */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                        whileHover={shouldReduceMotion ? {} : { y: -4 }}
                        className="group/card relative mx-auto w-full min-w-0 max-w-[460px] lg:mx-0"
                    >
                        <div
                            aria-hidden="true"
                            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-indigo-200/40 via-transparent to-amber-200/40 blur-2xl transition-all duration-500 group-hover/card:from-indigo-300/60 group-hover/card:to-amber-300/60 dark:from-indigo-500/15 dark:to-amber-500/15 dark:group-hover/card:from-indigo-500/25 dark:group-hover/card:to-amber-500/25"
                        />

                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_20px_40px_-24px_rgba(15,23,42,0.18)] transition-shadow duration-500 group-hover/card:shadow-[0_1px_3px_rgba(15,23,42,0.08),0_28px_56px_-28px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_1px_3px_rgba(0,0,0,0.4),0_20px_40px_-24px_rgba(0,0,0,0.7)] dark:group-hover/card:shadow-[0_1px_3px_rgba(0,0,0,0.5),0_28px_56px_-28px_rgba(0,0,0,0.85)]">
                            <div className="relative flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-3 py-2 sm:px-4 sm:py-2.5 dark:border-slate-800 dark:bg-slate-900/60">
                                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                                    </div>
                                    <span className="truncate font-mono text-[11px] font-medium text-slate-600 dark:text-slate-300">
                                        Subhash.java
                                    </span>
                                    <span className="hidden items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-wider text-slate-500 sm:inline-flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                        <span className="h-1 w-1 rounded-full bg-amber-400" />
                                        modified
                                    </span>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <span className="hidden items-center gap-1 font-mono text-[10px] text-slate-400 sm:inline-flex dark:text-slate-500">
                                        <svg
                                            viewBox="0 0 16 16"
                                            className="h-3 w-3"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
                                        </svg>
                                        main
                                    </span>
                                    <span className="font-mono text-[10px] tracking-wide text-slate-400 dark:text-slate-500">
                                        Java 21
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent dark:from-slate-900"
                                />

                                <div className="overflow-x-auto">
                                    <div className="px-3 py-4 font-mono text-[10.5px] leading-[1.7] sm:px-4 sm:py-5 sm:text-[11.5px] sm:leading-[1.75]">
                                        <div className="relative space-y-[1px]">
                                            <CodeLine n={1} delay={0.3}>
                                                <span className="text-slate-400 dark:text-slate-500">
                                                    {'// production-grade, event-driven'}
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={2} delay={0.33}>
                                                &nbsp;
                                            </CodeLine>

                                            <CodeLine n={3} delay={0.36}>
                                                <span className="text-indigo-600 dark:text-indigo-400">
                                                    public final class
                                                </span>{' '}
                                                <span className="text-teal-600 dark:text-teal-400">
                                                    Subhash
                                                </span>{' '}
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    {'{'}
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={4} delay={0.39}>
                                                &nbsp;
                                            </CodeLine>

                                            <CodeLine n={5} delay={0.42}>
                                                <span className="pl-4" />
                                                <span className="text-indigo-600 dark:text-indigo-400">
                                                    private static final
                                                </span>{' '}
                                                <span className="text-teal-600 dark:text-teal-400">
                                                    String
                                                </span>
                                                <span className="text-slate-700 dark:text-slate-300">
                                                    {'[] '}
                                                </span>
                                                <span className="text-slate-900 dark:text-white">STACK</span>
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    {' = {'}
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={6} delay={0.45}>
                                                <span className="pl-8" />
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "Java 21"
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500">, </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "Spring Boot"
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500">, </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "Kafka"
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </CodeLine>

                                            <CodeLine n={7} delay={0.48}>
                                                <span className="pl-8" />
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "Redis"
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500">, </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "AWS"
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500">, </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "MySQL"
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500">,</span>
                                            </CodeLine>

                                            <CodeLine n={8} delay={0.51}>
                                                <span className="pl-8" />
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "React"
                                                </span>
                                                <span className="text-slate-400 dark:text-slate-500">, </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    "TypeScript"
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={9} delay={0.54}>
                                                <span className="pl-4" />
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    {'};'}
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={10} delay={0.57}>
                                                &nbsp;
                                            </CodeLine>

                                            <CodeLine n={11} delay={0.6}>
                                                <span className="pl-4" />
                                                <span className="text-indigo-600 dark:text-indigo-400">
                                                    public
                                                </span>{' '}
                                                <span className="text-teal-600 dark:text-teal-400">
                                                    System
                                                </span>{' '}
                                                <span className="text-slate-900 dark:text-white">ship</span>
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    (Requirement spec) {'{'}
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={12} delay={0.63}>
                                                <span className="pl-8" />
                                                <span className="text-indigo-600 dark:text-indigo-400">
                                                    return
                                                </span>{' '}
                                                <span className="text-teal-600 dark:text-teal-400">
                                                    System
                                                </span>
                                                <span className="text-slate-700 dark:text-slate-300">
                                                    .of(spec)
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={13} delay={0.66}>
                                                <span className="pl-12" />
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    .design(
                                                </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    clean, layered
                                                </span>
                                                <span className="text-slate-500 dark:text-slate-500">)</span>
                                            </CodeLine>

                                            <CodeLine n={14} delay={0.69}>
                                                <span className="pl-12" />
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    .scale(
                                                </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    eventDriven
                                                </span>
                                                <span className="text-slate-500 dark:text-slate-500">)</span>
                                            </CodeLine>

                                            <CodeLine n={15} delay={0.72}>
                                                <span className="pl-12" />
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    .observe(
                                                </span>
                                                <span className="text-emerald-700 dark:text-emerald-400">
                                                    viaCloudWatch
                                                </span>
                                                <span className="text-slate-500 dark:text-slate-500">)</span>
                                            </CodeLine>

                                            <CodeLine n={16} delay={0.75}>
                                                <span className="pl-12" />
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    .ship();
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={17} delay={0.78}>
                                                <span className="pl-4" />
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    {'}'}
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={18} delay={0.81}>
                                                <span className="text-slate-500 dark:text-slate-500">
                                                    {'}'}
                                                </span>
                                            </CodeLine>

                                            <CodeLine n={19} delay={0.84}>
                                                <span
                                                    aria-hidden="true"
                                                    className={[
                                                        'inline-block h-[13px] w-[7px] translate-y-[2px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
                                                        shouldReduceMotion ? '' : 'animate-pulse',
                                                    ].join(' ')}
                                                    style={{ animationDuration: '1.1s' }}
                                                />
                                            </CodeLine>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/90 px-3 py-2 sm:px-4 dark:border-slate-800 dark:bg-slate-900/60">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 sm:text-[10.5px] dark:text-slate-400">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        </span>
                                        compiled · 0 warnings
                                    </span>
                                    <span className="hidden h-3 w-px bg-slate-200 sm:block dark:bg-slate-700" />
                                    <span className="hidden font-mono text-[10.5px] text-slate-400 sm:inline dark:text-slate-500">
                                        UTF-8
                                    </span>
                                </div>

                                <div className="flex shrink-0 items-center gap-3">
                                    <span className="hidden font-mono text-[10.5px] text-slate-400 sm:inline dark:text-slate-500">
                                        Ln 19, Col 9
                                    </span>
                                    <span className="hidden h-3 w-px bg-slate-200 sm:block dark:bg-slate-700" />
                                    <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-[10.5px] dark:text-slate-400">
                                        Java
                                    </span>
                                </div>
                            </div>

                            <div
                                aria-hidden="true"
                                className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent transition-all duration-500 group-hover/card:via-amber-500/90 group-hover/card:h-[2px]"
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                            transition={{
                                y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                                opacity: { duration: 0.3 },
                            }}
                            className="pointer-events-none absolute -right-3 -top-3 hidden rounded-full border border-amber-200 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-700 shadow-md opacity-0 sm:block dark:border-amber-500/30 dark:bg-slate-900 dark:text-amber-300"
                        >
                            ● live
                        </motion.div>
                    </motion.div>
                </div>

                {/* ============================== STATS ============================== */}
                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-stone-200 pt-6 sm:mt-12 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-6 sm:pt-7 dark:border-slate-800">
                    {stats.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="flex min-w-0 items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 sm:h-9 sm:w-9 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                                <Icon className="h-[14px] w-[14px] sm:h-[15px] sm:w-[15px]" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[16px] font-semibold tracking-[-0.01em] text-stone-900 sm:text-[17px] dark:text-white">
                                    {value}
                                </p>
                                <p className="truncate text-[10.5px] text-stone-500 sm:text-[11px] dark:text-slate-400">
                                    {label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}