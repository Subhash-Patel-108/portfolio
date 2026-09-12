import {
    ArrowUpRight,
    GitBranch,
    Star,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import Section from './ui/Section';
import { useReveal } from '../hooks/useReveal';
import { projects, type Project } from '../data/portfolio';

/* -------------------------------------------------------------------------- */
/*                                   Tokens                                   */
/* -------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Custom cursor for project cards — classic editorial arrow with an amber
 * ink-dot at its tip. Matches the competency rows in the Skills section.
 */
const CURSOR_CARD = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M4 3 L4 17.5 L8.2 13.6 L11.2 19.6 L13.2 18.6 L10.2 12.8 L15.4 12.8 Z' fill='%231c1917' stroke='%23fdfbf7' stroke-width='1' stroke-linejoin='round'/><circle cx='4.4' cy='3.4' r='1.9' fill='%23f59e0b'/><circle cx='4.4' cy='3.4' r='0.7' fill='%23fdfbf7'/></svg>") 4 3, pointer`;

/* -------------------------------------------------------------------------- */
/*                              Status tones                                  */
/* -------------------------------------------------------------------------- */

const STATUS_STYLE: Record<
    NonNullable<Project['status']>,
    { dot: string; text: string }
> = {
    Active: {
        dot: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]',
        text: 'text-emerald-700 dark:text-emerald-400',
    },
    Production: {
        dot: 'bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.6)]',
        text: 'text-indigo-700 dark:text-indigo-400',
    },
    Complete: {
        dot: 'bg-stone-400 dark:bg-slate-500',
        text: 'text-stone-600 dark:text-slate-400',
    },
    'In development': {
        dot: 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]',
        text: 'text-amber-700 dark:text-amber-400',
    },
};

/* -------------------------------------------------------------------------- */
/*                                   Projects                                 */
/* -------------------------------------------------------------------------- */

export default function Projects() {
    const { ref, visible } = useReveal<HTMLDivElement>({
        threshold: 0.01,
        rootMargin: '0px 0px 200px 0px',
    });
    const shouldReduceMotion = useReducedMotion();

    const totalProjects = String(projects.length).padStart(2, '0');

    return (
        <Section
            id="projects"
            className="relative isolate overflow-hidden !py-10 lg:!py-14"
        >
            {/* ==================== Background ==================== */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)] dark:bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)]" />

                <motion.div
                    animate={shouldReduceMotion ? {} : {
                        x: [0, 90, -40, 0],
                        y: [0, -50, 40, 0],
                        scale: [1, 1.15, 0.92, 1],
                    }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[2%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.30),rgba(99,102,241,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(99,102,241,0.40),rgba(99,102,241,0.06),transparent)]"
                />

                <motion.div
                    animate={shouldReduceMotion ? {} : {
                        x: [0, -80, 50, 0],
                        y: [0, 50, -30, 0],
                        scale: [1, 0.94, 1.12, 1],
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-[5%] right-[2%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.26),rgba(245,158,11,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(245,158,11,0.24),rgba(245,158,11,0.05),transparent)]"
                />

                <motion.div
                    animate={shouldReduceMotion ? {} : {
                        x: [0, 60, -30, 0],
                        y: [0, -30, 30, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute left-[45%] top-[55%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.16),transparent)] blur-[70px] dark:bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)]"
                />

                <div
                    className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #1C1917 1px, transparent 1px), linear-gradient(to bottom, #1C1917 1px, transparent 1px)',
                        backgroundSize: '64px 64px',
                        maskImage: 'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center top, black 45%, transparent 82%)',
                    }}
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#FFFCF8] dark:to-slate-950" />
                <div className="absolute inset-x-0 top-0 h-px bg-stone-200 dark:bg-white/10" />
            </div>

            {/* ============================== CONTENT ============================== */}
            <div ref={ref} className="relative">
                {/* ============================ HEADER ============================ */}
                <motion.header
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-stone-300 dark:bg-slate-700" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500 dark:text-slate-500">
                            Projects
                        </span>
                    </div>

                    <h2 className="mt-4 text-[1.55rem] font-semibold leading-[1.15] tracking-[-0.03em] text-stone-900 sm:text-[2rem] lg:text-[2.25rem] dark:text-white">
                        Selected{' '}
                        <span className="font-serif font-normal italic text-indigo-600 dark:text-indigo-400">
                            work.
                        </span>
                    </h2>

                    <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-stone-600 sm:text-[14.5px] dark:text-slate-400">
                        A few systems I've built, from high-throughput backends to
                        polished frontends.
                    </p>
                </motion.header>

                {/* DIVIDER */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                    className="mt-10 flex items-baseline gap-3 sm:mt-14"
                >
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone-400 dark:text-slate-500">
                        All projects
                    </span>
                    <span className="h-px flex-1 bg-stone-200 dark:bg-slate-800" />
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone-400 dark:text-slate-500">
                        {totalProjects} total
                    </span>
                </motion.div>

                {/* STACK */}
                <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={idx}
                            visible={visible}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Project card                                  */
/* -------------------------------------------------------------------------- */

interface ProjectCardProps {
    project: Project;
    index: number;
    visible: boolean;
}

function ProjectCard({ project, index, visible }: ProjectCardProps) {
    const shouldReduceMotion = useReducedMotion();
    const {
        title,
        tagline,
        description,
        tech,
        highlights,
        liveUrl,
        repoUrl,
        featured,
        year,
        role,
        status,
        metrics,
    } = project;

    const idx = String(index + 1).padStart(2, '0');
    const statusStyle = status ? STATUS_STYLE[status] : null;

    return (
        <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: 0.35 + index * 0.08,
                ease: EASE,
            }}
            style={{ cursor: shouldReduceMotion ? 'default' : CURSOR_CARD }}
            className={[
                'group/project relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl',
                'border border-stone-200/90 bg-white',
                'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_-32px_rgba(15,23,42,0.18)]',
                'transition-all duration-300',
                'hover:-translate-y-0.5',
                'hover:border-amber-300/70 hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.05),0_28px_56px_-28px_rgba(180,83,9,0.22)]',
                'dark:border-slate-800 dark:bg-slate-900',
                'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-32px_rgba(0,0,0,0.7)]',
                'dark:hover:border-amber-500/40 dark:hover:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.45),0_28px_56px_-28px_rgba(245,158,11,0.26)]',
            ].join(' ')}
        >
            {/* Top amber accent bar */}
            <div
                aria-hidden="true"
                className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 opacity-90 transition-opacity duration-300 group-hover/project:opacity-100"
            />

            {/* ============================ Chrome strip ============================ */}
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-stone-200/80 bg-stone-50/60 px-3.5 py-2.5 sm:px-5 sm:py-3 lg:px-6 dark:border-slate-800 dark:bg-slate-900/60">
                {/* Left cluster — index + category + year + role */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
                    <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-amber-700 sm:text-[10.5px] dark:text-amber-400">
                        {idx}
                    </span>

                    <span className="h-3 w-px bg-stone-300 dark:bg-slate-700" />

                    <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-stone-500 sm:text-[10px] dark:text-slate-400">
                        {featured ? 'Featured' : 'Project'}
                    </span>

                    {year && (
                        <>
                            <span className="h-3 w-px bg-stone-300 dark:bg-slate-700" />
                            <span className="font-mono text-[9.5px] font-medium tracking-[0.16em] text-stone-400 sm:text-[10px] dark:text-slate-500">
                                {year}
                            </span>
                        </>
                    )}

                    {role && (
                        <>
                            <span className="hidden h-3 w-px bg-stone-300 sm:block dark:bg-slate-700" />
                            <span className="hidden font-mono text-[10px] font-medium tracking-[0.16em] text-stone-400 sm:inline dark:text-slate-500">
                                {role}
                            </span>
                        </>
                    )}
                </div>

                {/* Right cluster — status + featured badge */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {statusStyle && status && (
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200/80 bg-white/70 px-1.5 py-[3px] font-mono text-[9px] font-medium uppercase tracking-[0.14em] backdrop-blur-sm sm:px-2 sm:text-[9.5px] dark:border-slate-700 dark:bg-slate-900/70">
                            <span
                                className={[
                                    'h-1.5 w-1.5 rounded-full',
                                    statusStyle.dot,
                                ].join(' ')}
                            />
                            <span className={statusStyle.text}>{status}</span>
                        </span>
                    )}

                    {featured && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-200/80 bg-amber-50/70 px-1.5 py-[3px] text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-700 sm:text-[9.5px] dark:border-amber-500/25 dark:bg-amber-500/[0.10] dark:text-amber-400">
                            <Star className="h-2.5 w-2.5" strokeWidth={2.4} />
                            <span className="hidden xs:inline sm:inline">Featured</span>
                            <span className="xs:hidden sm:hidden">★</span>
                        </span>
                    )}
                </div>
            </div>

            {/* ============================ Body ============================ */}
            <div className="grid flex-1 grid-cols-1 gap-0 lg:grid-cols-[1.55fr_1fr]">
                {/* -------- LEFT: content -------- */}
                <div className="flex flex-col p-4 sm:p-6 lg:border-r lg:border-stone-200/80 lg:p-8 dark:lg:border-slate-800">
                    {/* Title block */}
                    <div className="min-w-0">
                        <h3 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.028em] text-stone-900 sm:text-[28px] sm:tracking-[-0.035em] lg:text-[34px] xl:text-[38px] dark:text-white">
                            {title}
                        </h3>

                        <p className="mt-2 font-serif text-[14px] font-normal italic leading-[1.35] tracking-[-0.01em] text-indigo-600 sm:mt-3 sm:text-[16px] lg:text-[18px] dark:text-indigo-400">
                            {tagline}
                        </p>
                    </div>

                    {/* Divider */}
                    <div
                        aria-hidden="true"
                        className="mt-4 h-px w-full bg-gradient-to-r from-stone-200 via-stone-200 to-transparent sm:mt-6 dark:from-slate-700 dark:via-slate-700 dark:to-transparent"
                    />

                    {/* Description */}
                    <p className="mt-3.5 max-w-2xl text-[13px] leading-[1.7] text-stone-600 sm:mt-5 sm:text-[14px] sm:leading-[1.75] dark:text-slate-400">
                        {description}
                    </p>

                    {/* Highlights */}
                    {highlights.length > 0 && (
                        <div className="mt-5 sm:mt-6">
                            <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-amber-700/70 sm:text-[9.5px] dark:text-amber-400/70">
                                Key highlights
                            </p>
                            <ul className="mt-2.5 space-y-2 sm:mt-3 sm:space-y-2.5">
                                {highlights.map((h) => (
                                    <li
                                        key={h}
                                        className="flex items-start gap-2 text-[12.5px] leading-[1.6] text-stone-700 sm:gap-2.5 sm:text-[13px] sm:leading-[1.65] dark:text-slate-300"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-500/70 sm:mt-[9px]"
                                        />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* -------- RIGHT: side panel -------- */}
                <div className="flex flex-col border-t border-stone-200/80 bg-stone-50/40 p-4 sm:p-6 lg:border-t-0 lg:p-8 dark:border-slate-800 dark:bg-slate-950/30">
                    <div className="flex items-baseline justify-between gap-3">
                        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-amber-700 sm:text-[9.5px] dark:text-amber-400">
                            Stack
                        </p>
                        <span className="font-mono text-[9px] font-medium tracking-[0.14em] text-amber-600/60 sm:text-[9.5px] dark:text-amber-400/60">
                            {String(tech.length).padStart(2, '0')}
                        </span>
                    </div>

                    <div
                        aria-hidden="true"
                        className="mt-2.5 h-px w-full bg-gradient-to-r from-amber-300/60 via-amber-200/40 to-transparent sm:mt-3 dark:from-amber-500/40 dark:via-amber-500/20 dark:to-transparent"
                    />

                    {/* Tech chips — grid on mobile for tighter layout, list on desktop */}
                    <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 sm:mt-4 sm:block sm:space-y-1.5">
                        {tech.map((t, i) => (
                            <motion.li
                                key={t}
                                initial={
                                    shouldReduceMotion ? false : { opacity: 0, x: -4 }
                                }
                                animate={visible ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: 0.35,
                                    delay: 0.5 + index * 0.08 + i * 0.015,
                                    ease: EASE,
                                }}
                                className="flex items-baseline gap-2 sm:gap-2.5"
                            >
                                <span
                                    aria-hidden="true"
                                    className="font-mono text-[9px] tabular-nums text-amber-500/60 sm:text-[9.5px] dark:text-amber-400/50"
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="min-w-0 truncate font-mono text-[11px] leading-[1.5] tracking-[-0.002em] text-stone-700 transition-colors duration-200 hover:text-amber-700 sm:text-[12px] sm:leading-[1.6] dark:text-slate-300 dark:hover:text-amber-400">
                                    {t}
                                </span>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="hidden flex-1 sm:block" />

                    <div
                        aria-hidden="true"
                        className="mt-5 h-px w-full bg-gradient-to-r from-stone-200 via-stone-200 to-transparent sm:mt-6 dark:from-slate-700 dark:via-slate-700 dark:to-transparent"
                    />

                    {/* Links — row on mobile, column on desktop */}
                    <div className="mt-3.5 flex flex-row flex-wrap items-center gap-x-5 gap-y-2 sm:mt-4 sm:flex-col sm:items-stretch sm:gap-2.5">
                        {repoUrl && (
                            <a
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[-0.005em] text-stone-700 transition-colors duration-200 hover:text-amber-700 sm:justify-between sm:text-[12.5px] dark:text-slate-300 dark:hover:text-amber-400"
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    <GitBranch className="h-3.5 w-3.5" />
                                    Repository
                                </span>
                                <ArrowUpRight className="hidden h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 sm:inline-block" />
                            </a>
                        )}
                        {liveUrl && (
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[-0.005em] text-stone-700 transition-colors duration-200 hover:text-amber-700 sm:justify-between sm:text-[12.5px] dark:text-slate-300 dark:hover:text-amber-400"
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                    Live demo
                                </span>
                                <ArrowUpRight className="hidden h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 sm:inline-block" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* ============================ Metrics strip ============================ */}
            {metrics && metrics.length > 0 && (
                <>
                    {/* Mobile — stacked cards with individual borders */}
                    <div className="grid grid-cols-1 divide-y divide-stone-200/80 border-t border-stone-200/80 sm:hidden dark:divide-slate-800 dark:border-slate-800">
                        {metrics.map((m) => (
                            <div
                                key={m.label}
                                className="flex items-center justify-between gap-3 bg-white/70 px-4 py-2.5 dark:bg-slate-900/60"
                            >
                                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-amber-700/70 dark:text-amber-400/70">
                                    {m.label}
                                </span>
                                <span className="text-right font-mono text-[12px] font-semibold tracking-[-0.005em] text-stone-800 dark:text-slate-200">
                                    {m.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* sm+ — horizontal 3-column strip */}
                    <div className="hidden grid-cols-3 gap-px border-t border-stone-200/80 bg-stone-200/80 sm:grid dark:border-slate-800 dark:bg-slate-800">
                        {metrics.map((m) => (
                            <div
                                key={m.label}
                                className="flex flex-col gap-1 bg-white/70 px-5 py-3.5 backdrop-blur-sm sm:px-6 dark:bg-slate-900/60"
                            >
                                <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-amber-700/70 dark:text-amber-400/70">
                                    {m.label}
                                </span>
                                <span className="font-mono text-[12.5px] font-semibold tracking-[-0.005em] text-stone-800 dark:text-slate-200">
                                    {m.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Bottom accent line */}
            <div
                aria-hidden="true"
                className="h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent transition-all duration-500 group-hover/project:via-amber-500/60"
            />
        </motion.article>
    );
}