import { motion, useReducedMotion } from 'framer-motion';
import {
    ArrowUpRight,
    Loader2,
    Mail,
    MapPin,
    Phone,
    Send,
    type LucideIcon,
} from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

import { useToast } from '@/contexts/ToastContext';
import { contactInfo, personal, socials } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import Section from './ui/Section';
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
/* -------------------------------------------------------------------------- */
/*                                   Tokens                                   */
/* -------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*                              Contact icon map                              */
/* -------------------------------------------------------------------------- */

const CONTACT_ICON_MAP: Record<string, LucideIcon> = {
    Mail,
    Phone,
    MapPin,
};

function resolveContactIcon(key: string): LucideIcon {
    return CONTACT_ICON_MAP[key] ?? Mail;
}

/**
 * Per-contact-type chip colors: border, background, and glyph tone.
 */
const CONTACT_CHIP_STYLES: Record<string, string> = {
    Mail: 'border-indigo-200/80 bg-indigo-50 text-indigo-600 group-hover:border-indigo-300 group-hover:bg-indigo-100 group-hover:text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/[0.08] dark:text-indigo-400 dark:group-hover:border-indigo-500/40 dark:group-hover:bg-indigo-500/[0.14] dark:group-hover:text-indigo-300',
    Phone:
        'border-emerald-200/80 bg-emerald-50 text-emerald-600 group-hover:border-emerald-300 group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/[0.08] dark:text-emerald-400 dark:group-hover:border-emerald-500/40 dark:group-hover:bg-emerald-500/[0.14] dark:group-hover:text-emerald-300',
    MapPin: 'border-rose-200/80 bg-rose-50 text-rose-600 group-hover:border-rose-300 group-hover:bg-rose-100 group-hover:text-rose-700 dark:border-rose-500/25 dark:bg-rose-500/[0.08] dark:text-rose-400 dark:group-hover:border-rose-500/40 dark:group-hover:bg-rose-500/[0.14] dark:group-hover:text-rose-300',
};

function contactChipClass(iconKey: string): string {
    return CONTACT_CHIP_STYLES[iconKey] ?? CONTACT_CHIP_STYLES.Mail;
}

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
    if (l.includes('twitter') || l.includes('x'))
        return 'text-stone-900 dark:text-white';
    return 'text-stone-500 dark:text-slate-400';
}

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

interface FormState {
    name: string;
    email: string;
    message: string;
}

const initialForm: FormState = { name: '', email: '', message: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 1000;

/* -------------------------------------------------------------------------- */
/*                                  Contact                                   */
/* -------------------------------------------------------------------------- */

export default function Contact() {
    const toast = useToast();
    const { ref, visible } = useReveal<HTMLDivElement>();
    const shouldReduceMotion = useReducedMotion();

    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);
    const [focused, setFocused] = useState<keyof FormState | null>(null);

    const validate = (data: FormState): Partial<FormState> => {
        const errs: Partial<FormState> = {};
        if (!data.name.trim()) errs.name = 'Please enter your name.';
        if (!data.email.trim()) errs.email = 'Please enter your email.';
        else if (!EMAIL_RE.test(data.email))
            errs.email = 'Please enter a valid email address.';
        if (!data.message.trim()) errs.message = 'Please enter a message.';
        else if (data.message.trim().length < MESSAGE_MIN)
            errs.message = `Message should be at least ${MESSAGE_MIN} characters.`;
        else if (data.message.length > MESSAGE_MAX)
            errs.message = `Message should be under ${MESSAGE_MAX} characters.`;
        return errs;
    };

    const handleChange =
        (field: keyof FormState) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
                if (errors[field]) {
                    setErrors((prev) => ({ ...prev, [field]: undefined }));
                }
            };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            toast.error('Please fix the highlighted fields.');
            return;
        }

        setSubmitting(true);
        const id = toast.loading('Sending your message…', {
            description: 'This should only take a moment.',
        });

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    _subject: `New contact message from ${form.name}`,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                const msg =
                    data?.errors?.map((e: { message: string }) => e.message).join(', ') ||
                    'Something went wrong.';
                throw new Error(msg);
            }

            toast.update(id, {
                variant: 'success',
                title: 'Message sent!',
                description: "Thanks for reaching out — I'll reply within 24 hours.",
            });
            setForm(initialForm);
            setErrors({});
        } catch (error) {
            console.error('Formspree error:', error);
            toast.update(id, {
                variant: 'error',
                title: 'Could not send message',
                description: 'Please try again, or email me directly.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const messageLength = form.message.length;
    const nearLimit = messageLength > MESSAGE_MAX * 0.9;

    return (
        <Section
            id="contact"
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
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, 90, -40, 0],
                                y: [0, -50, 40, 0],
                                scale: [1, 1.15, 0.92, 1],
                            }
                    }
                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[2%] top-[8%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.30),rgba(99,102,241,0.04),transparent)] blur-[60px] sm:h-[420px] sm:w-[420px] sm:blur-[70px] lg:h-[520px] lg:w-[520px] lg:blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(99,102,241,0.40),rgba(99,102,241,0.06),transparent)]"
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
                    className="absolute bottom-[5%] right-[2%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.26),rgba(245,158,11,0.04),transparent)] blur-[60px] sm:h-[380px] sm:w-[380px] sm:blur-[70px] lg:h-[480px] lg:w-[480px] lg:blur-[80px] dark:bg-[radial-gradient(closest-side,rgba(245,158,11,0.24),rgba(245,158,11,0.05),transparent)]"
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
                    className="absolute left-[45%] top-[55%] hidden h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.16),transparent)] blur-[70px] sm:block dark:bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)]"
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
                {/* ============================ HEADER ============================ */}
                <motion.header
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-7 bg-stone-300 sm:w-8 dark:bg-slate-700" />
                        <span className="text-[11.5px] font-medium uppercase tracking-[0.22em] text-stone-500 sm:text-[12px] lg:text-[12.5px] dark:text-slate-500">
                            Contact
                        </span>
                    </div>

                    <h2 className="mt-4 text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.03em] text-stone-900 sm:text-[2.15rem] lg:text-[2.55rem] dark:text-white">
                        Let&apos;s build{' '}
                        <span className="font-serif font-normal italic text-indigo-600 dark:text-indigo-400">
                            something.
                        </span>
                    </h2>

                    <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-stone-600 sm:text-[15.5px] lg:text-[16.5px] dark:text-slate-400">
                        Have a project, role, or idea in mind? I&apos;d love to
                        hear about it. I typically reply within 24 hours.
                    </p>
                </motion.header>

                {/* ============================ MAIN GRID ============================ */}
                <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
                    {/* ---------------------- LEFT: contact info ---------------------- */}
                    <div className="space-y-4 sm:space-y-5">
                        {/* ---------- Direct contact card ---------- */}
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
                            className={[
                                'relative overflow-hidden rounded-2xl',
                                'border border-stone-200/90 bg-white',
                                'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-28px_rgba(15,23,42,0.16)]',
                                'dark:border-slate-800 dark:bg-slate-900',
                                'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_16px_40px_-28px_rgba(0,0,0,0.7)]',
                            ].join(' ')}
                        >
                            {/* Top accent bar */}
                            <div
                                aria-hidden="true"
                                className="h-[3px] w-full bg-gradient-to-r from-indigo-400 via-violet-500 to-indigo-400"
                            />

                            {/* Chrome strip */}
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-b border-stone-200/80 bg-stone-50/60 px-4 py-2.5 sm:px-5 sm:py-3 dark:border-slate-800 dark:bg-slate-900/60">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 sm:h-7 sm:w-7 dark:bg-indigo-500/10 dark:text-indigo-400">
                                    <Mail className="h-3 w-3 sm:h-[13px] sm:w-[13px]" strokeWidth={2.2} />
                                </span>
                                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone-500 sm:text-[11px] dark:text-slate-400">
                                    Direct
                                </span>
                                <span className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-emerald-200/70 bg-emerald-50/60 px-1.5 py-[2px] font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-emerald-700 sm:text-[10px] dark:border-emerald-500/25 dark:bg-emerald-500/[0.10] dark:text-emerald-400">
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                                    Online
                                </span>
                            </div>

                            <div className="p-4 sm:p-5">
                                <p className="text-[13.5px] leading-[1.65] text-stone-600 sm:text-[14px] sm:leading-[1.7] dark:text-slate-400">
                                    Prefer email? Reach out directly — I read
                                    every message.
                                </p>

                                <ul className="mt-4 space-y-0.5 sm:mt-5">
                                    {contactInfo.map(({ label, value, href, icon }) => {
                                        const Icon = resolveContactIcon(icon);
                                        const isLink = Boolean(href);

                                        const body = (
                                            <div className="flex items-center gap-3">
                                                {/* Icon chip — brand-tinted */}
                                                <span
                                                    className={[
                                                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                                                        'border transition-colors duration-200',
                                                        'sm:h-10 sm:w-10 sm:rounded-xl',
                                                        contactChipClass(icon),
                                                    ].join(' ')}
                                                >
                                                    <Icon className="h-4 w-4 sm:h-[15px] sm:w-[15px]" />
                                                </span>

                                                <div className="min-w-0 flex-1">
                                                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 sm:text-[10.5px] dark:text-slate-500">
                                                        {label}
                                                    </p>
                                                    <p className="mt-0.5 break-all text-[13.5px] font-medium leading-snug tracking-[-0.005em] text-stone-900 sm:break-normal sm:truncate sm:text-[14.5px] dark:text-white">
                                                        {value}
                                                    </p>
                                                </div>

                                                {isLink && (
                                                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-stone-300 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600 group-hover:opacity-100 dark:text-slate-600 dark:group-hover:text-indigo-400" />
                                                )}
                                            </div>
                                        );

                                        return (
                                            <li key={label}>
                                                {isLink ? (
                                                    <a
                                                        href={href}
                                                        className="group flex items-center rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-stone-50 sm:rounded-xl dark:hover:bg-slate-800/50"
                                                    >
                                                        {body}
                                                    </a>
                                                ) : (
                                                    <div className="flex items-center rounded-lg px-2 py-2 sm:rounded-xl">
                                                        {body}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </motion.div>

                        {/* ---------- Follow card ---------- */}
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
                            className={[
                                'relative overflow-hidden rounded-2xl',
                                'border border-stone-200/90 bg-white',
                                'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-28px_rgba(15,23,42,0.16)]',
                                'dark:border-slate-800 dark:bg-slate-900',
                                'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_16px_40px_-28px_rgba(0,0,0,0.7)]',
                            ].join(' ')}
                        >
                            <div className="p-4 sm:p-5">
                                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-stone-500 sm:text-[11px] dark:text-slate-400">
                                    Follow along
                                </p>

                                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-3.5 sm:gap-2">
                                    {socials.map(({ label, href, icon: Icon }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={[
                                                'group inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2',
                                                'border-stone-200 bg-white text-[12.5px] font-semibold tracking-[-0.005em] text-stone-700 sm:text-[13px]',
                                                'transition-all duration-300 hover:-translate-y-0.5',
                                                'hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900',
                                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/60',
                                                'focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8]',
                                                'dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300',
                                                'dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white',
                                                'dark:focus-visible:ring-offset-slate-950',
                                            ].join(' ')}
                                        >
                                            <Icon
                                                className={[
                                                    'h-3 w-3 sm:h-3.5 sm:w-3.5',
                                                    brandIconClass(label),
                                                ].join(' ')}
                                            />
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* ---------- Fast reply note ---------- */}
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
                            className="flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/50 p-3.5 sm:p-4 dark:border-amber-500/20 dark:bg-amber-500/[0.05]"
                        >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm ring-1 ring-amber-200/70 dark:bg-slate-900 dark:text-amber-400 dark:ring-amber-500/25">
                                <Send className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-[13px] font-semibold tracking-[-0.005em] text-stone-900 sm:text-[13.5px] dark:text-white">
                                    Fast reply
                                </p>
                                <p className="mt-0.5 text-[12.5px] leading-[1.55] text-stone-600 sm:text-[13px] sm:leading-[1.6] dark:text-slate-400">
                                    I usually respond within 24 hours on weekdays.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* ---------------------- RIGHT: form ---------------------- */}
                    <motion.form
                        onSubmit={handleSubmit}
                        noValidate
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
                        className={[
                            'relative overflow-hidden rounded-2xl',
                            'border border-stone-200/90 bg-white',
                            'shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_-32px_rgba(15,23,42,0.18)]',
                            'dark:border-slate-800 dark:bg-slate-900',
                            'dark:shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_1px_2px_rgba(0,0,0,0.4),0_20px_48px_-32px_rgba(0,0,0,0.72)]',
                        ].join(' ')}
                    >
                        {/* Top accent bar */}
                        <div
                            aria-hidden="true"
                            className="h-[3px] w-full bg-gradient-to-r from-indigo-400 via-violet-500 to-indigo-400"
                        />

                        {/* Chrome strip */}
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-b border-stone-200/80 bg-stone-50/60 px-4 py-2.5 sm:px-5 sm:py-3.5 lg:px-6 dark:border-slate-800 dark:bg-slate-900/60">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                <span className="font-mono text-[10.5px] font-semibold tracking-[0.14em] text-indigo-700 sm:text-[11.5px] dark:text-indigo-400">
                                    New message
                                </span>
                                <span className="hidden h-3 w-px bg-stone-300 sm:block dark:bg-slate-700" />
                                <span className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-stone-500 sm:inline dark:text-slate-400">
                                    #{new Date().getFullYear()}
                                </span>
                            </div>
                            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-stone-500 sm:text-[10.5px] dark:text-slate-400">
                                <span className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                                Encrypted
                            </span>
                        </div>

                        <div className="p-4 sm:p-6 lg:p-8">
                            {/* Name + Email */}
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                                <Field
                                    id="contact-name"
                                    label="Your name"
                                    placeholder="e.g. Aditi Sharma"
                                    value={form.name}
                                    onChange={handleChange('name')}
                                    onFocus={() => setFocused('name')}
                                    onBlur={() => setFocused(null)}
                                    isFocused={focused === 'name'}
                                    error={errors.name}
                                    autoComplete="name"
                                    maxLength={80}
                                />

                                <Field
                                    id="contact-email"
                                    label="Email address"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange('email')}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused(null)}
                                    isFocused={focused === 'email'}
                                    error={errors.email}
                                    autoComplete="email"
                                    maxLength={120}
                                />
                            </div>

                            {/* Message */}
                            <div className="mt-5 sm:mt-6">
                                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                    <label
                                        htmlFor="contact-message"
                                        className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone-600 sm:text-[11px] dark:text-slate-300"
                                    >
                                        Message
                                    </label>
                                    <span
                                        className={[
                                            'font-mono text-[10.5px] font-medium tabular-nums tracking-[0.1em] transition-colors duration-200 sm:text-[11px]',
                                            nearLimit
                                                ? 'text-indigo-700 dark:text-indigo-400'
                                                : 'text-stone-400 dark:text-slate-500',
                                        ].join(' ')}
                                    >
                                        {messageLength} / {MESSAGE_MAX}
                                    </span>
                                </div>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={6}
                                    value={form.message}
                                    onChange={handleChange('message')}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="Tell me about your project, role, or idea…"
                                    maxLength={MESSAGE_MAX}
                                    className={[
                                        'w-full resize-none rounded-xl border bg-white px-3.5 py-3 text-[14px] leading-[1.7] text-stone-900 placeholder:text-stone-400 sm:px-4 sm:text-[14.5px]',
                                        'transition-[border-color,box-shadow] duration-200',
                                        'focus:outline-none focus:ring-4 focus:ring-indigo-500/15',
                                        'dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500',
                                        errors.message
                                            ? 'border-rose-400 dark:border-rose-500/60'
                                            : focused === 'message'
                                                ? 'border-indigo-400 dark:border-indigo-500/60'
                                                : 'border-stone-300 hover:border-stone-400 dark:border-slate-700 dark:hover:border-slate-600',
                                    ].join(' ')}
                                />
                                {errors.message && (
                                    <p className="mt-2 font-mono text-[11px] font-medium tracking-[-0.005em] text-rose-600 sm:text-[11.5px] dark:text-rose-400">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            {/* Divider */}
                            <div
                                aria-hidden="true"
                                className="mt-6 h-px w-full bg-gradient-to-r from-stone-200 via-stone-200 to-transparent sm:mt-7 dark:from-slate-700 dark:via-slate-700 dark:to-transparent"
                            />

                            {/* Footer: hint + submit */}
                            <div className="mt-5 flex flex-col-reverse items-stretch gap-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-center font-mono text-[11px] tracking-[-0.005em] text-stone-500 sm:text-left sm:text-[11.5px] dark:text-slate-400">
                                    Or email me at{' '}
                                    <a
                                        href={`mailto:${personal.email}`}
                                        className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-2 transition-colors hover:text-amber-800 hover:decoration-amber-500 dark:text-amber-400 dark:decoration-amber-500/50 dark:hover:text-amber-300"
                                    >
                                        {personal.email}
                                    </a>
                                </p>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={[
                                        'group inline-flex h-11 items-center justify-center gap-2.5 rounded-full px-5 text-[14px] font-semibold tracking-[-0.01em] text-white sm:h-12 sm:px-6 sm:text-[14.5px]',
                                        'bg-indigo-600 shadow-[0_1px_2px_rgba(49,46,129,0.20),0_10px_28px_-14px_rgba(79,70,229,0.55)]',
                                        'transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2',
                                        'focus-visible:ring-offset-white',
                                        'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-indigo-600',
                                        'dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400',
                                        'dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950',
                                        'dark:disabled:hover:bg-indigo-500',
                                    ].join(' ')}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                            Send message
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div
                            aria-hidden="true"
                            className="h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent"
                        />
                    </motion.form>
                </div>
            </div>
        </Section>
    );
}

/* -------------------------------------------------------------------------- */
/*                                  Field                                     */
/* -------------------------------------------------------------------------- */

interface FieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    isFocused?: boolean;
    error?: string;
    placeholder?: string;
    type?: string;
    autoComplete?: string;
    maxLength?: number;
}

function Field({
    id,
    label,
    value,
    onChange,
    onFocus,
    onBlur,
    isFocused,
    error,
    placeholder,
    type = 'text',
    autoComplete,
    maxLength,
}: FieldProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-stone-600 sm:text-[11px] dark:text-slate-300"
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                autoComplete={autoComplete}
                maxLength={maxLength}
                className={[
                    'w-full rounded-xl border bg-white px-3.5 py-2.5 text-[14px] text-stone-900 placeholder:text-stone-400 sm:px-4 sm:py-3 sm:text-[14.5px]',
                    'transition-[border-color,box-shadow] duration-200',
                    'focus:outline-none focus:ring-4 focus:ring-indigo-500/15',
                    'dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500',
                    error
                        ? 'border-rose-400 dark:border-rose-500/60'
                        : isFocused
                            ? 'border-indigo-400 dark:border-indigo-500/60'
                            : 'border-stone-300 hover:border-stone-400 dark:border-slate-700 dark:hover:border-slate-600',
                ].join(' ')}
            />
            {error && (
                <p className="mt-2 font-mono text-[11px] font-medium tracking-[-0.005em] text-rose-600 sm:text-[11.5px] dark:text-rose-400">
                    {error}
                </p>
            )}
        </div>
    );
}