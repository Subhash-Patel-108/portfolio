import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import Section from './ui/Section';
import { useReveal } from '../hooks/useReveal';
import { personal } from '../data/portfolio';
import { useCallback, useEffect, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                   Tokens                                   */
/* -------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*                        Proof points — "why hire me"                        */
/* -------------------------------------------------------------------------- */

type ProofTone = 'amber' | 'emerald' | 'indigo';

interface ProofPoint {
    metric: string;
    label: string;
    context: string;
    tone: ProofTone;
}

const PROOF_POINTS: ProofPoint[] = [
    {
        metric: '< 1ms',
        label: 'Redirect latency',
        context: 'Dishari · Redis cached',
        tone: 'amber',
    },
    {
        metric: '10K+',
        label: 'Events / min',
        context: 'Dishari · Kafka stream',
        tone: 'emerald',
    },
    {
        metric: '10+',
        label: 'AWS services',
        context: 'EC2 · S3 · RDS · Lambda',
        tone: 'indigo',
    },
];

/* -------------------------------------------------------------------------- */
/*                        Multi-color proof palettes                          */
/* -------------------------------------------------------------------------- */

interface ProofPalette {
    metric: string;
    accentBar: string;
    hoverBorder: string;
    hoverBg: string;
}

const PROOF_TONE_STYLE: Record<ProofTone, ProofPalette> = {
    amber: {
        metric: 'text-amber-700 dark:text-amber-400',
        accentBar: 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-400',
        hoverBorder: 'hover:border-amber-300/70 dark:hover:border-amber-500/40',
        hoverBg: 'hover:bg-amber-50/30 dark:hover:bg-amber-500/[0.04]',
    },
    emerald: {
        metric: 'text-emerald-700 dark:text-emerald-400',
        accentBar:
            'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-400',
        hoverBorder:
            'hover:border-emerald-300/70 dark:hover:border-emerald-500/40',
        hoverBg: 'hover:bg-emerald-50/30 dark:hover:bg-emerald-500/[0.04]',
    },
    indigo: {
        metric: 'text-indigo-700 dark:text-indigo-400',
        accentBar: 'bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-400',
        hoverBorder:
            'hover:border-indigo-300/70 dark:hover:border-indigo-500/40',
        hoverBg: 'hover:bg-indigo-50/30 dark:hover:bg-indigo-500/[0.04]',
    },
};

/* -------------------------------------------------------------------------- */
/*                              Tech tags                                     */
/* -------------------------------------------------------------------------- */

type Category = 'backend' | 'frontend' | 'infra';

interface TechTag {
    label: string;
    angle: number;
    radius: number;
    depth: 'near' | 'mid' | 'far';
    category: Category;
}

const TAGS: TechTag[] = [
    { label: 'Java 21', angle: 108, radius: 46, depth: 'near', category: 'backend' },
    { label: 'Spring Boot', angle: 90, radius: 48, depth: 'near', category: 'backend' },
    { label: 'Apache Kafka', angle: 72, radius: 46, depth: 'near', category: 'backend' },
    { label: 'Redis', angle: 30, radius: 44, depth: 'mid', category: 'backend' },
    { label: 'AWS', angle: 0, radius: 48, depth: 'near', category: 'infra' },
    { label: 'Docker', angle: -30, radius: 44, depth: 'mid', category: 'infra' },
    { label: 'React', angle: -90, radius: 48, depth: 'near', category: 'frontend' },
    { label: 'TypeScript', angle: -70, radius: 46, depth: 'near', category: 'frontend' },
    { label: 'MySQL', angle: 210, radius: 44, depth: 'mid', category: 'backend' },
    { label: 'Linux', angle: 180, radius: 48, depth: 'near', category: 'infra' },
    { label: 'CI/CD', angle: 150, radius: 46, depth: 'mid', category: 'infra' },
];

const CATEGORY_DOT: Record<Category, string> = {
    backend: 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]',
    frontend: 'bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.6)]',
    infra: 'bg-slate-500 shadow-[0_0_6px_rgba(100,116,139,0.5)]',
};

const DEPTH_STYLE: Record<TechTag['depth'], string> = {
    near: 'text-[10px] font-semibold sm:text-[11.5px] lg:text-[12px]',
    mid: 'text-[9px] font-medium sm:text-[10.5px] lg:text-[11px]',
    far: 'text-[8.5px] font-medium sm:text-[10px] lg:text-[10.5px]',
};

const DEPTH_OPACITY: Record<TechTag['depth'], string> = {
    near: 'opacity-100',
    mid: 'opacity-90',
    far: 'opacity-75',
};

/* -------------------------------------------------------------------------- */
/*                              Spec strip data                               */
/* -------------------------------------------------------------------------- */

type SpecTone = 'neutral' | 'amber' | 'emerald';

interface Spec {
    label: string;
    value: string;
    tone: SpecTone;
    live?: boolean;
}

const SPECS: Spec[] = [
    { label: 'Based in', value: personal.location, tone: 'neutral' },
    { label: 'Focus', value: 'Backend · Cloud · Full Stack', tone: 'amber' },
    { label: 'Status', value: 'Open to opportunities', tone: 'emerald', live: true },
];

const TONE_STYLE: Record<SpecTone, { card: string; dot: string }> = {
    neutral: {
        card: [
            'border-stone-200/80 bg-stone-50/70',
            'hover:border-stone-300 hover:bg-stone-100/70',
            'dark:border-slate-800 dark:bg-slate-900/50',
            'dark:hover:border-slate-700 dark:hover:bg-slate-800/50',
        ].join(' '),
        dot: 'bg-slate-400 dark:bg-slate-500',
    },
    amber: {
        card: [
            'border-amber-200/70 bg-amber-50/60',
            'hover:border-amber-300/80 hover:bg-amber-50/90',
            'dark:border-amber-500/20 dark:bg-amber-500/[0.06]',
            'dark:hover:border-amber-500/30 dark:hover:bg-amber-500/[0.09]',
        ].join(' '),
        dot: 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.55)]',
    },
    emerald: {
        card: [
            'border-emerald-200/70 bg-emerald-50/60',
            'hover:border-emerald-300/80 hover:bg-emerald-50/90',
            'dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]',
            'dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/[0.09]',
        ].join(' '),
        dot: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.55)]',
    },
};

/* -------------------------------------------------------------------------- */
/*                                Tech tag pill                               */
/* -------------------------------------------------------------------------- */

interface TechTagPillProps {
    tag: TechTag;
    index: number;
    reduced: boolean;
    active: boolean;
}

function TechTagPill({ tag, index, reduced, active }: TechTagPillProps) {
    const rad = (tag.angle * Math.PI) / 180;
    const left = 50 + tag.radius * Math.cos(rad);
    const top = 50 - tag.radius * Math.sin(rad);

    const floatDuration = 3.4 + (index % 4) * 0.4;
    const floatDelay = (index * 0.23) % 1.8;

    // Faster entrance cascade — 0.15s start, 0.03s per item
    // so 11 pills finish revealing in ~0.48s instead of 1.16s.
    const entranceDelay = 0.15 + index * 0.03;

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: entranceDelay, ease: EASE }}
            style={{ left: `${left}%`, top: `${top}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
        >
            <motion.div
                // Floating animation only runs when the section is on screen
                animate={active && !reduced ? { y: [0, -4, 0] } : {}}
                transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatDelay,
                }}
                className={[
                    'flex items-center gap-1 whitespace-nowrap rounded-full sm:gap-1.5 lg:gap-2',
                    'border border-stone-200/90 bg-white/95 backdrop-blur-md',
                    'px-2 py-[3px] font-mono tracking-[-0.01em] text-stone-800 sm:px-2.5 sm:py-1 lg:px-3 lg:py-[5px]',
                    'shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_12px_-6px_rgba(15,23,42,0.14)]',
                    'dark:border-slate-700/80 dark:bg-slate-900/95 dark:text-slate-200',
                    'dark:shadow-[0_1px_2px_rgba(0,0,0,0.35),0_4px_12px_-6px_rgba(0,0,0,0.6)]',
                    DEPTH_STYLE[tag.depth],
                    DEPTH_OPACITY[tag.depth],
                ].join(' ')}
            >
                <span
                    aria-hidden="true"
                    className={['h-1 w-1 shrink-0 rounded-full sm:h-1.5 sm:w-1.5', CATEGORY_DOT[tag.category]].join(' ')}
                />
                <span>{tag.label}</span>
            </motion.div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Proof point card                              */
/* -------------------------------------------------------------------------- */

function ProofCard({ point, index }: { point: ProofPoint; index: number }) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, visible } = useReveal<HTMLDivElement>({
        threshold: 0.05,
        rootMargin: '0px 0px 120px 0px',
    });

    const palette = PROOF_TONE_STYLE[point.tone];

    return (
        <motion.div
            ref={ref}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
            className={[
                'group/proof relative overflow-hidden rounded-xl border',
                'border-stone-200/80 bg-white',
                'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04)]',
                'transition-colors duration-300',
                palette.hoverBorder,
                palette.hoverBg,
                'dark:border-slate-800 dark:bg-slate-900',
            ].join(' ')}
        >
            <span
                aria-hidden="true"
                className={[
                    'absolute left-0 top-0 h-full w-[3px] opacity-80 transition-opacity duration-300 group-hover/proof:opacity-100',
                    palette.accentBar,
                ].join(' ')}
            />

            <div className="px-3.5 py-3 sm:px-4 sm:py-3.5">
                <p
                    className={[
                        'font-mono text-[20px] font-semibold leading-none tracking-[-0.03em] sm:text-[24px]',
                        palette.metric,
                    ].join(' ')}
                >
                    {point.metric}
                </p>

                <p className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-700 sm:text-[9.5px] dark:text-slate-300">
                    {point.label}
                </p>

                <p className="mt-1 font-mono text-[9px] font-medium tracking-[0.02em] text-stone-400 sm:text-[9.5px] dark:text-slate-500">
                    {point.context}
                </p>
            </div>
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                Spec card                                   */
/* -------------------------------------------------------------------------- */

function SpecCard({ spec }: { spec: Spec }) {
    const tone = TONE_STYLE[spec.tone];

    return (
        <div
            className={[
                'group/spec flex items-center justify-between gap-2 rounded-lg border px-3 py-2 transition-colors duration-300 sm:block sm:rounded-xl sm:px-3 sm:py-2.5 lg:px-3.5 lg:py-3',
                tone.card,
            ].join(' ')}
        >
            <div className="flex items-center gap-1.5">
                <span
                    aria-hidden="true"
                    className={[
                        'relative flex h-1.5 w-1.5 shrink-0 rounded-full',
                        tone.dot,
                    ].join(' ')}
                >
                    {spec.live && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    )}
                </span>

                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-stone-500 sm:text-[9.5px] lg:text-[10px] dark:text-slate-500">
                    {spec.label}
                </span>
            </div>

            <p className="shrink-0 truncate text-right text-[12px] font-semibold leading-snug tracking-[-0.005em] text-stone-900 sm:mt-1 sm:shrink sm:text-left sm:text-[12.5px] lg:mt-1.5 lg:text-[13.5px] dark:text-white">
                {spec.value}
            </p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   About                                    */
/* -------------------------------------------------------------------------- */

export default function About() {
    const { ref, visible } = useReveal<HTMLDivElement>({
        threshold: 0.01,
        rootMargin: '0px 0px 200px 0px',
    });
    const shouldReduceMotion = useReducedMotion();

    const [firstBio] = personal.bio;
    const firstLetter = firstBio?.charAt(0) ?? '';
    const firstBioRest = firstBio?.slice(1) ?? '';

    // Shared animation gate — background orbs and floating pills
    // only animate when the section is on screen.
    const orbActive = visible && !shouldReduceMotion;

    return (
        <Section
            id="about"
            className="relative isolate overflow-hidden !py-10 lg:!py-14"
        >
            {/* ==================== Background ==================== */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)] dark:bg-[radial-gradient(80%_60%_at_20%_20%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(70%_50%_at_90%_85%,rgba(245,158,11,0.10),transparent_55%)]" />

                <motion.div
                    animate={
                        orbActive
                            ? {
                                x: [0, 90, -40, 0],
                                y: [0, -50, 40, 0],
                                scale: [1, 1.15, 0.92, 1],
                            }
                            : {}
                    }
                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[2%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.30),rgba(99,102,241,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(99,102,241,0.40),rgba(99,102,241,0.06),transparent)]"
                />

                <motion.div
                    animate={
                        orbActive
                            ? {
                                x: [0, -80, 50, 0],
                                y: [0, 50, -30, 0],
                                scale: [1, 0.94, 1.12, 1],
                            }
                            : {}
                    }
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute bottom-[5%] right-[2%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.26),rgba(245,158,11,0.04),transparent)] blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(245,158,11,0.24),rgba(245,158,11,0.05),transparent)]"
                />

                <motion.div
                    animate={
                        orbActive
                            ? {
                                x: [0, 60, -30, 0],
                                y: [0, -30, 30, 0],
                                scale: [1, 1.1, 0.95, 1],
                            }
                            : {}
                    }
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                    }}
                    className="absolute left-[45%] top-[55%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.16),transparent)] blur-[70px] dark:bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)]"
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

            {/* ============================== CONTENT ============================== */}
            <div ref={ref} className="relative">
                {/* HEADER */}
                <motion.header
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-stone-300 dark:bg-slate-700" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500 lg:text-[11.5px] dark:text-slate-500">
                            About
                        </span>
                    </div>

                    <h2 className="mt-4 text-[1.55rem] font-semibold leading-[1.15] tracking-[-0.03em] text-stone-900 sm:text-[2rem] lg:text-[2.4rem] dark:text-white">
                        The person behind{' '}
                        <span className="font-serif font-normal italic text-stone-600 dark:text-slate-400">
                            the code.
                        </span>
                    </h2>

                    <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-stone-600 sm:text-[14.5px] lg:text-[15.5px] dark:text-slate-400">
                        A quick intro to who I am, what I do, and what drives me.
                    </p>
                </motion.header>

                {/* GRID */}
                <div className="mt-8 grid items-center gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
                    {/* LEFT: constellation */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                        className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:mx-0 lg:max-w-[520px]"
                    >
                        <TechConstellationPortrait active={visible} />
                    </motion.div>

                    {/* RIGHT: intro → why hire me */}
                    <div className="space-y-5 sm:space-y-6 lg:space-y-7">
                        {/* ==================== FIRST BIO (drop cap) ==================== */}
                        <motion.p
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                            className="text-[14px] leading-[1.7] text-stone-700 sm:text-[14.5px] lg:text-[15.5px] lg:leading-[1.75] dark:text-slate-300"
                        >
                            <span
                                aria-hidden="true"
                                className="float-left mr-2.5 mt-[4px] font-serif text-[2.6rem] font-normal italic leading-[0.85] text-stone-900 sm:mr-3 sm:text-[3.4rem] lg:text-[3.8rem] dark:text-white"
                            >
                                {firstLetter}
                            </span>
                            {firstBioRest}
                        </motion.p>

                        {/* ==================== PULL QUOTE ==================== */}
                        <motion.blockquote
                            initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                            animate={visible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                            className="my-4 border-l-2 border-amber-500/80 pl-4 sm:my-5 sm:pl-5 lg:my-6 dark:border-amber-400/70"
                        >
                            <p className="font-serif text-[1.1rem] font-normal italic leading-[1.35] tracking-[-0.01em] text-stone-900 sm:text-[1.25rem] lg:text-[1.4rem] dark:text-white">
                                &ldquo;Write it for the engineer who debugs it next.&rdquo;
                            </p>
                        </motion.blockquote>

                        {/* ==================== WHY HIRE ME — EYEBROW ==================== */}
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.4, ease: EASE }}
                            className="flex items-center gap-2.5"
                        >
                            <span className="h-px w-6 bg-gradient-to-r from-amber-500 via-emerald-500 to-indigo-500" />
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-700 sm:text-[10.5px] dark:text-slate-300">
                                Why hire me
                            </span>
                        </motion.div>

                        {/* ==================== HOOK HEADLINE ==================== */}
                        <motion.h3
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                            className="text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.025em] text-stone-900 sm:text-[1.55rem] lg:text-[1.75rem] dark:text-white"
                        >
                            I build backends that{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 font-serif font-normal italic text-indigo-600 dark:text-indigo-400">
                                    vanish under load.
                                </span>
                            </span>
                        </motion.h3>

                        {/* ==================== 3 PROOF CARDS ==================== */}
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                            {PROOF_POINTS.map((point, idx) => (
                                <ProofCard key={point.label} point={point} index={idx} />
                            ))}
                        </div>

                        {/* ==================== LEAD PARAGRAPH ==================== */}
                        <motion.p
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                            className="text-[14px] leading-[1.75] text-stone-700 sm:text-[14.5px] lg:text-[15.5px] dark:text-slate-300"
                        >
                            Three systems shipped end-to-end with{' '}
                            <span className="font-medium text-stone-900 dark:text-white">
                                Java 21, Spring Boot, Kafka, and AWS
                            </span>{' '}
                            — each one solving a problem most portfolios skip.
                        </motion.p>

                        {/* ==================== CTA ==================== */}
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                            className="flex flex-wrap items-center gap-3 pt-1"
                        >
                            <a
                                href="#contact"
                                className="group inline-flex h-10 items-center gap-2 rounded-full bg-stone-900 px-4 text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-11 sm:px-5 sm:text-[13.5px] lg:text-[14.5px] dark:bg-white dark:text-stone-900 dark:hover:bg-slate-100 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                            >
                                Get in touch
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

/* -------------------------------------------------------------------------- */
/*                       Tech Constellation Portrait                          */
/* -------------------------------------------------------------------------- */

function TechConstellationPortrait({ active }: { active: boolean }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="relative mx-auto aspect-square w-full">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.20),transparent_72%)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(245,158,11,0.14),transparent_72%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent_72%)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(99,102,241,0.16),transparent_72%)]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[2%] rounded-full border border-dashed border-stone-300/60 dark:border-slate-700/50"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[12%] rounded-full border border-stone-200/70 dark:border-slate-800/70"
            />

            <CardinalTicks />

            <div className="absolute inset-[19%]">
                <PhotoFrame active={active} />
            </div>

            <div className="pointer-events-none absolute inset-0">
                {TAGS.map((tag, i) => (
                    <TechTagPill
                        key={tag.label}
                        tag={tag}
                        index={i}
                        reduced={shouldReduceMotion ?? false}
                        active={active}
                    />
                ))}
            </div>

            <div className="pointer-events-none absolute -bottom-1 left-1/2 z-10 -translate-x-1/2">
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
                    className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/95 px-2.5 py-1 shadow-[0_4px_16px_-8px_rgba(28,25,23,0.25)] backdrop-blur-md sm:gap-2 sm:px-3.5 sm:py-1.5 lg:px-4 lg:py-2 dark:border-slate-800 dark:bg-slate-900/95"
                >
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-stone-700 sm:text-[10px] lg:text-[10.5px] dark:text-slate-300">
                        {personal.name} · online
                    </span>
                </motion.div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Cardinal ticks                                */
/* -------------------------------------------------------------------------- */

function CardinalTicks() {
    const cardinals = [
        { angle: 0, size: 'h-2.5 w-px', accent: 'bg-amber-500' },
        { angle: 90, size: 'h-2.5 w-px', accent: 'bg-indigo-500' },
        { angle: 180, size: 'h-2.5 w-px', accent: 'bg-emerald-500' },
        { angle: 270, size: 'h-2.5 w-px', accent: 'bg-teal-500' },
    ];

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-[2%]">
            {cardinals.map((tick, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 top-1/2 origin-top"
                    style={{
                        transform: `rotate(${tick.angle}deg) translateY(-50%)`,
                        width: 0,
                        height: '50%',
                    }}
                >
                    <span
                        className={[
                            'absolute left-1/2 -translate-x-1/2 rounded-full',
                            tick.size,
                            tick.accent,
                        ].join(' ')}
                        style={{ top: 0 }}
                    />
                </div>
            ))}

            {[45, 135, 225, 315].map((angle) => (
                <div
                    key={angle}
                    className="absolute left-1/2 top-1/2 origin-top"
                    style={{
                        transform: `rotate(${angle}deg) translateY(-50%)`,
                        width: 0,
                        height: '50%',
                    }}
                >
                    <span className="absolute left-1/2 h-1 w-px -translate-x-1/2 rounded-full bg-stone-300 dark:bg-slate-700" />
                </div>
            ))}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                              Portrait frame                                */
/* -------------------------------------------------------------------------- */

function PhotoFrame({ active }: { active: boolean }) {
    const shouldReduceMotion = useReducedMotion();
    const [revealed, setRevealed] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            setIsTouch(false);
            return;
        }

        const query = window.matchMedia('(any-hover: hover)');
        const update = () => setIsTouch(!query.matches);

        update();

        if (typeof query.addEventListener === 'function') {
            query.addEventListener('change', update);
            return () => query.removeEventListener('change', update);
        } else if (typeof query.addListener === 'function') {
            query.addListener(update);
            return () => query.removeListener(update);
        }
    }, []);

    const toggleReveal = useCallback(() => {
        if (isTouch) setRevealed((r) => !r);
    }, [isTouch]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (!isTouch) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleReveal();
            }
        },
        [isTouch, toggleReveal],
    );

    // NOTE: `will-change` was removed. It was permanently pinning a
    // composited layer for the whole page lifetime, costing memory.
    // The grayscale transition is fast enough without it.
    const imgClassName = [
        'h-full w-full object-cover',
        'transition-[filter] duration-500 ease-out',
        isTouch
            ? revealed
                ? 'grayscale-0'
                : 'grayscale'
            : 'grayscale group-hover:grayscale-0',
    ].join(' ');

    const hintClassName = [
        'pointer-events-none absolute inset-x-0 bottom-[8%] flex justify-center',
        'transition-opacity duration-500',
        isTouch
            ? revealed
                ? 'opacity-0'
                : 'opacity-100'
            : 'opacity-100 group-hover:opacity-0',
    ].join(' ');

    return (
        <motion.div
            initial={shouldReduceMotion ? false : { scale: 0.96, opacity: 0 }}
            // Uses parent's `active` state instead of its own IO.
            // Reveals as soon as the section enters view.
            animate={active ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="relative h-full w-full"
        >
            <div
                className={[
                    'group relative h-full w-full',
                    isTouch ? 'cursor-pointer' : '',
                ].join(' ')}
                onClick={toggleReveal}
                onKeyDown={handleKeyDown}
                role={isTouch ? 'button' : undefined}
                tabIndex={isTouch ? 0 : undefined}
                aria-label={
                    isTouch
                        ? revealed
                            ? 'Hide photo colour'
                            : 'Reveal photo colour'
                        : undefined
                }
            >
                <div
                    className={[
                        'relative h-full w-full overflow-hidden rounded-full',
                        'shadow-[0_2px_4px_rgba(15,23,42,0.06),0_20px_48px_-24px_rgba(15,23,42,0.3)]',
                        'dark:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_20px_48px_-24px_rgba(0,0,0,0.7)]',
                    ].join(' ')}
                >
                    {/* width/height prevent CLS while the image decodes.
                        aspect-square is inherited from the parent wrapper. */}
                    <img
                        src={personal.avatarUrl}
                        alt={`Portrait of ${personal.name}`}
                        loading="lazy"
                        decoding="async"
                        width={512}
                        height={512}
                        className={imgClassName}
                        onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback =
                                target.nextElementSibling as HTMLElement | null;
                            if (fallback) fallback.style.display = 'flex';
                        }}
                    />

                    <div
                        style={{ display: 'none' }}
                        className="absolute inset-0 items-center justify-center bg-stone-900 font-serif text-[3.5rem] italic text-white sm:text-[5rem] dark:bg-white dark:text-stone-900"
                    >
                        {personal.name.charAt(0)}
                    </div>

                    {isTouch && revealed && (
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-inset ring-amber-500/30 dark:ring-amber-400/30"
                        />
                    )}
                </div>

                <div className={hintClassName}>
                    <span className="flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/85 px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] text-stone-600 backdrop-blur-md sm:px-3 sm:text-[10px] lg:text-[10.5px] dark:border-slate-700/80 dark:bg-slate-900/85 dark:text-slate-300">
                        <span className="h-1 w-1 rounded-full bg-amber-500" />
                        {isTouch ? 'Tap to reveal' : 'Hover to reveal'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}