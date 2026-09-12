import { useRef } from 'react';
import {
    Award,
    Download,
    GraduationCap,
    Trophy,
} from 'lucide-react';
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';

import Section from './ui/Section';
import { useReveal } from '../hooks/useReveal';
import {
    awards,
    certifications,
    education,
    personal,
} from '../data/portfolio';

/* -------------------------------------------------------------------------- */
/*                                   Tokens                                   */
/* -------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CURSOR_CARD = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M4 3 L4 17.5 L8.2 13.6 L11.2 19.6 L13.2 18.6 L10.2 12.8 L15.4 12.8 Z' fill='%231c1917' stroke='%23fdfbf7' stroke-width='1' stroke-linejoin='round'/><circle cx='4.4' cy='3.4' r='1.9' fill='%23f59e0b'/><circle cx='4.4' cy='3.4' r='0.7' fill='%23fdfbf7'/></svg>") 4 3, pointer`;

/* -------------------------------------------------------------------------- */
/*                        Responsive timeline geometry                        */
/* -------------------------------------------------------------------------- */

/**
 * Timeline geometry is driven by two CSS variables so the layout scales
 * cleanly across viewport sizes:
 *
 *   --tl-line  — horizontal position of the vertical timeline
 *   --tl-gap   — horizontal gap between the timeline and the card's left edge
 *
 * Set once on the outer wrapper via Tailwind's arbitrary-value syntax, then
 * referenced with `var()` in inline styles throughout the tree.
 *
 *   Mobile   < 640px   line at  18px  ·  gap 22px  (card starts at  40px)
 *   sm       ≥ 640px   line at  28px  ·  gap 34px  (card starts at  62px)
 *   lg       ≥ 1024px  line at clamp  ·  gap 48px  (card starts at ~288px)
 */
const TIMELINE_VARS_CLASS = [
    '[--tl-line:18px] [--tl-gap:22px]',
    'sm:[--tl-line:28px] sm:[--tl-gap:34px]',
    'lg:[--tl-line:clamp(32px,24%,220px)] lg:[--tl-gap:48px]',
].join(' ');

/* -------------------------------------------------------------------------- */
/*                        Section color palettes                              */
/* -------------------------------------------------------------------------- */

interface SectionPalette {
    dot: string;
    connector: string;
    indexChip: string;
    iconChip: string;
    indexNumber: string;
    accentBar: string;
    cardHover: string;
    headingRule: string;
    bottomLine: string;
    linkHover: string;
}

const INDIGO: SectionPalette = {
    dot: 'bg-indigo-500 shadow-[0_0_0_3px_rgba(255,255,255,1),0_0_10px_rgba(99,102,241,0.55)] sm:shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_12px_rgba(99,102,241,0.55)] dark:shadow-[0_0_0_3px_rgba(15,23,42,1),0_0_10px_rgba(129,140,248,0.65)] sm:dark:shadow-[0_0_0_4px_rgba(15,23,42,1),0_0_12px_rgba(129,140,248,0.65)]',
    connector:
        'bg-gradient-to-r from-indigo-400/80 via-indigo-300/50 to-transparent dark:from-indigo-400/70 dark:via-indigo-500/30 dark:to-transparent',
    indexChip:
        'border-indigo-200/70 bg-gradient-to-b from-indigo-50 to-indigo-50/60 text-indigo-700 dark:border-indigo-500/25 dark:from-indigo-500/[0.10] dark:to-indigo-500/[0.05] dark:text-indigo-400',
    iconChip:
        'border-indigo-200/70 bg-gradient-to-b from-indigo-50 to-indigo-50/60 text-indigo-600 dark:border-indigo-500/25 dark:from-indigo-500/[0.10] dark:to-indigo-500/[0.05] dark:text-indigo-400',
    indexNumber: 'text-indigo-600 dark:text-indigo-400',
    accentBar:
        'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400',
    cardHover:
        'hover:border-indigo-300/70 hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.05),0_28px_56px_-28px_rgba(79,70,229,0.24)] dark:hover:border-indigo-500/40 dark:hover:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.45),0_28px_56px_-28px_rgba(129,140,248,0.28)]',
    headingRule:
        'from-indigo-300/60 via-indigo-200/40 to-transparent dark:from-indigo-500/40 dark:via-indigo-500/20 dark:to-transparent',
    bottomLine:
        'via-indigo-500/25 group-hover:via-indigo-500/60 dark:via-indigo-400/25 dark:group-hover:via-indigo-400/60',
    linkHover: 'hover:text-indigo-700 dark:hover:text-indigo-400',
};

const AMBER: SectionPalette = {
    dot: 'bg-amber-500 shadow-[0_0_0_3px_rgba(255,255,255,1),0_0_10px_rgba(245,158,11,0.55)] sm:shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_12px_rgba(245,158,11,0.55)] dark:shadow-[0_0_0_3px_rgba(15,23,42,1),0_0_10px_rgba(251,191,36,0.65)] sm:dark:shadow-[0_0_0_4px_rgba(15,23,42,1),0_0_12px_rgba(251,191,36,0.65)]',
    connector:
        'bg-gradient-to-r from-amber-400/80 via-amber-300/50 to-transparent dark:from-amber-400/70 dark:via-amber-500/30 dark:to-transparent',
    indexChip:
        'border-amber-200/70 bg-gradient-to-b from-amber-50 to-amber-50/60 text-amber-700 dark:border-amber-500/25 dark:from-amber-500/[0.10] dark:to-amber-500/[0.05] dark:text-amber-400',
    iconChip:
        'border-amber-200/70 bg-gradient-to-b from-amber-50 to-amber-50/60 text-amber-600 dark:border-amber-500/25 dark:from-amber-500/[0.10] dark:to-amber-500/[0.05] dark:text-amber-400',
    indexNumber: 'text-amber-600 dark:text-amber-400',
    accentBar:
        'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400',
    cardHover:
        'hover:border-amber-300/70 hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.05),0_28px_56px_-24px_rgba(180,83,9,0.26)] dark:hover:border-amber-500/40 dark:hover:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.45),0_28px_56px_-24px_rgba(245,158,11,0.28)]',
    headingRule:
        'from-amber-300/60 via-amber-200/40 to-transparent dark:from-amber-500/40 dark:via-amber-500/20 dark:to-transparent',
    bottomLine:
        'via-amber-500/25 group-hover:via-amber-500/60 dark:via-amber-400/25 dark:group-hover:via-amber-400/60',
    linkHover: 'hover:text-amber-700 dark:hover:text-amber-400',
};

const EMERALD: SectionPalette = {
    dot: 'bg-emerald-500 shadow-[0_0_0_3px_rgba(255,255,255,1),0_0_10px_rgba(16,185,129,0.55)] sm:shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_12px_rgba(16,185,129,0.55)] dark:shadow-[0_0_0_3px_rgba(15,23,42,1),0_0_10px_rgba(52,211,153,0.65)] sm:dark:shadow-[0_0_0_4px_rgba(15,23,42,1),0_0_12px_rgba(52,211,153,0.65)]',
    connector:
        'bg-gradient-to-r from-emerald-400/80 via-emerald-300/50 to-transparent dark:from-emerald-400/70 dark:via-emerald-500/30 dark:to-transparent',
    indexChip:
        'border-emerald-200/70 bg-gradient-to-b from-emerald-50 to-emerald-50/60 text-emerald-700 dark:border-emerald-500/25 dark:from-emerald-500/[0.10] dark:to-emerald-500/[0.05] dark:text-emerald-400',
    iconChip:
        'border-emerald-200/70 bg-gradient-to-b from-emerald-50 to-emerald-50/60 text-emerald-600 dark:border-emerald-500/25 dark:from-emerald-500/[0.10] dark:to-emerald-500/[0.05] dark:text-emerald-400',
    indexNumber: 'text-emerald-600 dark:text-emerald-400',
    accentBar:
        'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400',
    cardHover:
        'hover:border-emerald-300/70 hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.05),0_20px_40px_-20px_rgba(5,150,105,0.24)] dark:hover:border-emerald-500/40 dark:hover:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.45),0_20px_40px_-20px_rgba(16,185,129,0.28)]',
    headingRule:
        'from-emerald-300/60 via-emerald-200/40 to-transparent dark:from-emerald-500/40 dark:via-emerald-500/20 dark:to-transparent',
    bottomLine:
        'via-emerald-500/25 group-hover:via-emerald-500/60 dark:via-emerald-400/25 dark:group-hover:via-emerald-400/60',
    linkHover: 'hover:text-emerald-700 dark:hover:text-emerald-400',
};

/* -------------------------------------------------------------------------- */
/*                                   Resume                                   */
/* -------------------------------------------------------------------------- */

export default function Resume() {
    const { ref, visible } = useReveal<HTMLDivElement>({
        threshold: 0.01,
        rootMargin: '0px 0px 200px 0px',
    });
    const shouldReduceMotion = useReducedMotion();

    const totalCredentials =
        education.length + awards.length + certifications.length;
    const totalCredentialsStr = String(totalCredentials).padStart(2, '0');

    return (
        <Section
            id="resume"
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
                {/* HEADER */}
                <motion.header
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-stone-300 dark:bg-slate-700" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500 dark:text-slate-500">
                            Resume
                        </span>
                    </div>

                    <h2 className="mt-4 text-[1.55rem] font-semibold leading-[1.15] tracking-[-0.03em] text-stone-900 sm:text-[2rem] lg:text-[2.25rem] dark:text-white">
                        Education, awards &{' '}
                        <span className="font-serif font-normal italic text-indigo-600 dark:text-indigo-400">
                            certifications.
                        </span>
                    </h2>

                    <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-stone-600 sm:text-[14.5px] dark:text-slate-400">
                        My academic background, the honors I've earned, and the
                        credentials I've collected along the way.
                    </p>
                </motion.header>

                {/* DOWNLOAD CTA */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
                    className="mt-7 sm:mt-8"
                >
                    <a
                        href={personal.resumeUrl}
                        download
                        className="group inline-flex h-10 items-center gap-2 rounded-full bg-stone-900 px-4 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-[0_1px_2px_rgba(28,25,23,0.15),0_8px_24px_-12px_rgba(28,25,23,0.35)] transition-colors duration-300 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-11 sm:px-5 sm:text-[13.5px] dark:bg-white dark:text-stone-900 dark:hover:bg-slate-100 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                    >
                        <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                        <span>Download full resume</span>
                        <span className="hidden font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] opacity-60 sm:inline">
                            PDF
                        </span>
                    </a>
                </motion.div>

                {/* DIVIDER */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
                    className="mt-10 flex items-baseline gap-3 sm:mt-12"
                >
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone-400 dark:text-slate-500">
                        Timeline
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-indigo-200/60 via-amber-200/60 to-emerald-200/60 dark:from-indigo-500/30 dark:via-amber-500/30 dark:to-emerald-500/30" />
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone-400 dark:text-slate-500">
                        {totalCredentialsStr} entries
                    </span>
                </motion.div>

                {/* TIMELINE */}
                <ScrollTimeline />
            </div>
        </Section>
    );
}

/* -------------------------------------------------------------------------- */
/*                            Scroll Timeline                                 */
/* -------------------------------------------------------------------------- */

function ScrollTimeline() {
    const shouldReduceMotion = useReducedMotion();
    const timelineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 0.9', 'end 0.6'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 26,
        mass: 0.4,
        restDelta: 0.001,
    });

    const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <div
            ref={timelineRef}
            className={[
                'relative mt-10 pb-2 sm:mt-12 sm:pb-4',
                TIMELINE_VARS_CLASS,
            ].join(' ')}
        >
            {/* ============================ THE VERTICAL TRACK ============================ */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2"
                style={{ left: 'var(--tl-line)' }}
            >
                {/* Base track */}
                <div className="absolute inset-0 w-px bg-gradient-to-b from-stone-200/0 via-stone-200 to-stone-200/0 dark:from-slate-800/0 dark:via-slate-800 dark:to-slate-800/0" />

                {/* Tri-color fill — grows downward with scroll */}
                {!shouldReduceMotion && (
                    <motion.div
                        className="absolute inset-x-0 top-0 w-px origin-top rounded-full"
                        style={{
                            scaleY: lineScaleY,
                            height: '100%',
                            background:
                                'linear-gradient(to bottom, rgb(99,102,241) 0%, rgb(129,140,248) 40%, rgb(245,158,11) 55%, rgb(251,191,36) 70%, rgb(16,185,129) 100%)',
                            boxShadow:
                                '0 0 12px rgba(99,102,241,0.30), 0 0 18px rgba(245,158,11,0.26), 0 0 22px rgba(16,185,129,0.30)',
                        }}
                    />
                )}

                {/* Reduced-motion — full tri-color line */}
                {shouldReduceMotion && (
                    <div
                        className="absolute inset-0 w-px rounded-full"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgb(99,102,241) 0%, rgb(129,140,248) 40%, rgb(245,158,11) 55%, rgb(251,191,36) 70%, rgb(16,185,129) 100%)',
                        }}
                    />
                )}

                {/* Top cap — indigo dot */}
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] sm:shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
            </div>

            {/* ==================== SECTION 01 — EDUCATION ==================== */}
            <TimelineSectionHeading
                index="01"
                title="Education"
                count={education.length}
                icon={GraduationCap}
                palette={INDIGO}
            />

            <ol className="mt-8 space-y-10 sm:mt-10 sm:space-y-14 lg:space-y-20">
                {education.map((ed, idx) => (
                    <EducationTimelineEntry
                        key={ed.degree}
                        ed={ed}
                        index={idx}
                        total={education.length}
                        palette={INDIGO}
                    />
                ))}
            </ol>

            {/* ==================== SECTION 02 — AWARDS ==================== */}
            <TimelineSectionHeading
                index="02"
                title="Awards & Honors"
                count={awards.length}
                icon={Trophy}
                palette={AMBER}
                className="mt-14 sm:mt-20 lg:mt-24"
            />

            <ul className="mt-8 space-y-6 sm:mt-10 sm:space-y-8 lg:space-y-10">
                {awards.map((award, idx) => (
                    <AwardTimelineEntry
                        key={award.title}
                        award={award}
                        index={idx}
                        palette={AMBER}
                    />
                ))}
            </ul>

            {/* ==================== SECTION 03 — CERTIFICATIONS ==================== */}
            <TimelineSectionHeading
                index="03"
                title="Certifications"
                count={certifications.length}
                icon={Award}
                palette={EMERALD}
                className="mt-14 sm:mt-20 lg:mt-24"
            />

            <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6 lg:space-y-8">
                {certifications.map((cert, idx) => (
                    <CertificationTimelineEntry
                        key={cert.title}
                        cert={cert}
                        index={idx}
                        palette={EMERALD}
                    />
                ))}
            </ul>

            {/* End cap — emerald dot */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] sm:shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                style={{ left: 'var(--tl-line)' }}
            />
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                       Timeline section heading                             */
/* -------------------------------------------------------------------------- */

interface TimelineSectionHeadingProps {
    index: string;
    title: string;
    count: number;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    palette: SectionPalette;
    className?: string;
}

function TimelineSectionHeading({
    index,
    title,
    count,
    icon: Icon,
    palette,
    className = '',
}: TimelineSectionHeadingProps) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, visible } = useReveal<HTMLDivElement>({
        threshold: 0.5,
        rootMargin: '0px 0px -40px 0px',
    });

    return (
        <motion.div
            ref={ref}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className={className}
        >
            <div
                className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 sm:gap-x-3"
                style={{
                    paddingLeft: 'calc(var(--tl-line) + var(--tl-gap))',
                }}
            >
                <span
                    className={[
                        'font-mono text-[10px] font-medium tracking-[0.18em] sm:text-[11px]',
                        palette.indexNumber,
                    ].join(' ')}
                >
                    {index}
                </span>
                <span className="h-3 w-px bg-stone-300 dark:bg-slate-700" />

                <span
                    className={[
                        'flex h-6 w-6 items-center justify-center rounded-md border sm:h-7 sm:w-7',
                        palette.iconChip,
                    ].join(' ')}
                >
                    <Icon className="h-3 w-3 sm:h-[13px] sm:w-[13px]" strokeWidth={2.2} />
                </span>

                <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-stone-900 sm:text-[17px] lg:text-[19px] dark:text-white">
                    {title}
                </h3>

                <span className="ml-auto font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400 sm:text-[10.5px] dark:text-slate-500">
                    {String(count).padStart(2, '0')}
                </span>
            </div>

            <div
                aria-hidden="true"
                className={[
                    'mt-3 h-px w-full bg-gradient-to-r sm:mt-4',
                    palette.headingRule,
                ].join(' ')}
                style={{
                    marginLeft: 'calc(var(--tl-line) + var(--tl-gap))',
                }}
            />
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*                    Education entry on the timeline                         */
/* -------------------------------------------------------------------------- */

interface EducationTimelineEntryProps {
    ed: (typeof education)[number];
    index: number;
    total: number;
    palette: SectionPalette;
}

function EducationTimelineEntry({
    ed,
    index,
    total,
    palette,
}: EducationTimelineEntryProps) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, visible } = useReveal<HTMLLIElement>({
        threshold: 0.18,
        rootMargin: '0px 0px -100px 0px',
    });

    const itemIndex = String(index + 1).padStart(2, '0');
    const isLast = index === total - 1;

    return (
        <motion.li
            ref={ref}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.65,
                delay: 0.05,
                ease: EASE,
            }}
            className="relative"
            style={{
                paddingLeft: 'calc(var(--tl-line) + var(--tl-gap))',
            }}
        >
            {/* Dot */}
            <span
                aria-hidden="true"
                className={[
                    'absolute top-5 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center rounded-full sm:top-6 sm:h-3 sm:w-3',
                    palette.dot,
                ].join(' ')}
                style={{ left: 'var(--tl-line)' }}
            />

            {/* Horizontal connector */}
            <motion.span
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={visible ? { scaleX: 1 } : {}}
                transition={{
                    duration: 0.5,
                    delay: 0.15,
                    ease: EASE,
                }}
                className={[
                    'absolute top-[23px] h-px origin-left rounded-full sm:top-[29px]',
                    palette.connector,
                ].join(' ')}
                style={{
                    left: 'var(--tl-line)',
                    width: 'var(--tl-gap)',
                }}
            />

            {/* Card */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: 60 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: EASE,
                }}
                className={[
                    'group/edu relative overflow-hidden rounded-xl sm:rounded-2xl',
                    'border border-stone-200/90 bg-white',
                    'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_-32px_rgba(15,23,42,0.16)]',
                    'transition-all duration-300',
                    'hover:-translate-y-0.5',
                    palette.cardHover,
                    'dark:border-slate-800 dark:bg-slate-900',
                    'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-32px_rgba(0,0,0,0.7)]',
                ].join(' ')}
            >
                {/* Top accent bar */}
                <div
                    aria-hidden="true"
                    className={[
                        'h-[3px] w-full opacity-90 transition-opacity duration-300 group-hover/edu:opacity-100',
                        palette.accentBar,
                    ].join(' ')}
                />

                {/* Chrome strip — index + meta */}
                <div className="flex flex-wrap items-center gap-2 border-b border-stone-200/80 bg-stone-50/60 px-3.5 py-2.5 sm:gap-3 sm:px-5 sm:py-3 lg:px-6 dark:border-slate-800 dark:bg-slate-900/60">
                    <span
                        className={[
                            'inline-flex h-7 w-7 items-center justify-center rounded-md border sm:h-8 sm:w-8 sm:rounded-lg',
                            'font-mono text-[10.5px] font-semibold tracking-[0.04em] sm:text-[11px]',
                            palette.indexChip,
                        ].join(' ')}
                    >
                        {itemIndex}
                    </span>

                    <span className="hidden h-3 w-px bg-stone-300 sm:inline-block dark:bg-slate-700" />

                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] sm:gap-2 sm:text-[10.5px] sm:tracking-[0.16em]">
                        <span className={palette.indexNumber}>
                            {ed.start} — {ed.end}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-stone-300 dark:bg-slate-600" />
                        <span className="text-stone-400 dark:text-slate-500">
                            {ed.location}
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <h4 className="max-w-4xl text-[17px] font-semibold leading-[1.2] tracking-[-0.02em] text-stone-900 sm:text-[22px] sm:leading-[1.15] sm:tracking-[-0.025em] lg:text-[28px] xl:text-[32px] dark:text-white">
                        {ed.degree}
                    </h4>

                    <p className="mt-2 max-w-3xl font-serif text-[14px] font-normal italic leading-[1.4] tracking-[-0.01em] text-indigo-600 sm:mt-2.5 sm:text-[16px] lg:text-[18px] dark:text-indigo-400">
                        {ed.institution}
                    </p>

                    {ed.details && (
                        <>
                            <div
                                aria-hidden="true"
                                className="mt-4 h-px w-full bg-gradient-to-r from-stone-200 via-stone-200 to-transparent sm:mt-6 dark:from-slate-700 dark:via-slate-700 dark:to-transparent"
                            />
                            <p className="mt-3.5 max-w-3xl text-[13px] leading-[1.7] text-stone-600 sm:mt-5 sm:text-[14px] sm:leading-[1.75] lg:text-[14.5px] dark:text-slate-400">
                                {ed.details}
                            </p>
                        </>
                    )}
                </div>

                {/* Bottom accent line */}
                <div
                    aria-hidden="true"
                    className={[
                        'h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500',
                        palette.bottomLine,
                    ].join(' ')}
                />

                {isLast && (
                    <span className="sr-only">Last education entry</span>
                )}
            </motion.div>
        </motion.li>
    );
}

/* -------------------------------------------------------------------------- */
/*                    Award entry on the timeline                             */
/* -------------------------------------------------------------------------- */

interface AwardTimelineEntryProps {
    award: (typeof awards)[number];
    index: number;
    palette: SectionPalette;
}

function AwardTimelineEntry({
    award,
    index,
    palette,
}: AwardTimelineEntryProps) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, visible } = useReveal<HTMLLIElement>({
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px',
    });

    return (
        <motion.li
            ref={ref}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: 0.05,
                ease: EASE,
            }}
            className="relative"
            style={{
                paddingLeft: 'calc(var(--tl-line) + var(--tl-gap))',
            }}
        >
            {/* Dot */}
            <span
                aria-hidden="true"
                className={[
                    'absolute top-5 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center rounded-full sm:top-6 sm:h-3 sm:w-3',
                    palette.dot,
                ].join(' ')}
                style={{ left: 'var(--tl-line)' }}
            />

            {/* Connector */}
            <motion.span
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={visible ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                className={[
                    'absolute top-[23px] h-px origin-left rounded-full sm:top-[29px]',
                    palette.connector,
                ].join(' ')}
                style={{
                    left: 'var(--tl-line)',
                    width: 'var(--tl-gap)',
                }}
            />

            {/* Card */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: 60 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className={[
                    'group/award relative overflow-hidden rounded-xl sm:rounded-2xl',
                    'border border-amber-200/70 bg-gradient-to-br from-amber-50/60 via-white to-white',
                    'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_-28px_rgba(180,83,9,0.20)]',
                    'transition-all duration-300',
                    'hover:-translate-y-0.5',
                    palette.cardHover,
                    'dark:border-amber-500/25 dark:from-amber-500/[0.06] dark:via-slate-900 dark:to-slate-900',
                    'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-28px_rgba(0,0,0,0.7)]',
                ].join(' ')}
            >
                <div
                    aria-hidden="true"
                    className={[
                        'h-[3px] w-full opacity-90 transition-opacity duration-300 group-hover/award:opacity-100',
                        palette.accentBar,
                    ].join(' ')}
                />

                <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-6 lg:p-7">
                    <span
                        className={[
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_4px_12px_-6px_rgba(245,158,11,0.4)] sm:h-12 sm:w-12 sm:rounded-xl dark:shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_4px_12px_-6px_rgba(245,158,11,0.3)]',
                            palette.iconChip,
                        ].join(' ')}
                    >
                        <Trophy className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.2} />
                    </span>

                    <div className="min-w-0 flex-1">
                        <h4 className="text-[15px] font-semibold leading-tight tracking-[-0.015em] text-stone-900 sm:text-[16px] lg:text-[17px] dark:text-white">
                            {award.title}
                        </h4>

                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] sm:gap-2 sm:text-[10.5px]">
                            <span className={palette.indexNumber}>
                                {award.issuer}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-stone-300 dark:bg-slate-600" />
                            <span className="text-stone-400 dark:text-slate-500">
                                {award.year}
                            </span>
                        </div>

                        <p className="mt-2.5 text-[13px] leading-[1.65] text-stone-600 sm:mt-3 sm:text-[13.5px] sm:leading-[1.7] dark:text-slate-400">
                            {award.description}
                        </p>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className={[
                        'h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500',
                        palette.bottomLine,
                    ].join(' ')}
                />
            </motion.div>
        </motion.li>
    );
}

/* -------------------------------------------------------------------------- */
/*                    Certification entry on the timeline                     */
/* -------------------------------------------------------------------------- */

interface CertificationTimelineEntryProps {
    cert: (typeof certifications)[number];
    index: number;
    palette: SectionPalette;
}

function CertificationTimelineEntry({
    cert,
    index,
    palette,
}: CertificationTimelineEntryProps) {
    const shouldReduceMotion = useReducedMotion();
    const { ref, visible } = useReveal<HTMLLIElement>({
        threshold: 0.25,
        rootMargin: '0px 0px -60px 0px',
    });

    const hasLink = Boolean(cert.link);

    return (
        <motion.li
            ref={ref}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.55,
                delay: 0.05,
                ease: EASE,
            }}
            className="relative"
            style={{
                paddingLeft: 'calc(var(--tl-line) + var(--tl-gap))',
            }}
        >
            {/* Dot */}
            <span
                aria-hidden="true"
                className={[
                    'absolute top-5 flex h-2.5 w-2.5 -translate-x-1/2 items-center justify-center rounded-full sm:top-6 sm:h-3 sm:w-3',
                    palette.dot,
                ].join(' ')}
                style={{ left: 'var(--tl-line)' }}
            />

            {/* Connector */}
            <motion.span
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={visible ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                className={[
                    'absolute top-[23px] h-px origin-left rounded-full sm:top-[29px]',
                    palette.connector,
                ].join(' ')}
                style={{
                    left: 'var(--tl-line)',
                    width: 'var(--tl-gap)',
                }}
            />

            {/* Card */}
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: 60 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                style={{ cursor: shouldReduceMotion ? 'default' : CURSOR_CARD }}
                className={[
                    'group/cert relative overflow-hidden rounded-xl',
                    'border border-stone-200/90 bg-white',
                    'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-20px_rgba(15,23,42,0.14)]',
                    'transition-all duration-300',
                    'hover:-translate-y-0.5',
                    palette.cardHover,
                    'dark:border-slate-800 dark:bg-slate-900',
                    'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_12px_32px_-20px_rgba(0,0,0,0.6)]',
                ].join(' ')}
            >
                <div
                    aria-hidden="true"
                    className={[
                        'h-[2px] w-full opacity-90 transition-opacity duration-300 group-hover/cert:opacity-100',
                        palette.accentBar,
                    ].join(' ')}
                />

                <div className="flex items-start gap-3 p-3.5 sm:gap-3.5 sm:p-5">
                    <span
                        className={[
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-md border shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] sm:h-10 sm:w-10 sm:rounded-lg dark:shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]',
                            palette.iconChip,
                        ].join(' ')}
                    >
                        <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
                    </span>

                    <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold leading-snug tracking-[-0.01em] text-stone-900 sm:text-[14px] dark:text-white">
                            {cert.title}
                        </p>

                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] sm:gap-2 sm:text-[10px]">
                            <span className={palette.indexNumber}>
                                {cert.issuer}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-stone-300 dark:bg-slate-600" />
                            <span className="text-stone-400 dark:text-slate-500">
                                {cert.year}
                            </span>
                        </div>

                        {(cert.verify || hasLink) && (
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                {cert.verify && (
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200/70 bg-emerald-50/60 px-1.5 py-[2px] font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-emerald-700 sm:text-[9.5px] sm:tracking-[0.14em] dark:border-emerald-500/25 dark:bg-emerald-500/[0.10] dark:text-emerald-400">
                                        <span className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                                        {cert.verify}
                                    </span>
                                )}

                                {hasLink && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={[
                                            'inline-flex items-center gap-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-stone-500 underline decoration-stone-300 underline-offset-2 transition-colors duration-200 hover:decoration-current sm:text-[9.5px] sm:tracking-[0.14em] dark:text-slate-400 dark:decoration-slate-700',
                                            palette.linkHover,
                                        ].join(' ')}
                                    >
                                        Verify credential
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className={[
                        'h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500',
                        palette.bottomLine,
                    ].join(' ')}
                />
            </motion.div>
        </motion.li>
    );
}