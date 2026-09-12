import { ArrowUp, Heart } from 'lucide-react';
import { personal, socials } from '../data/portfolio';

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

export default function Footer() {
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative isolate overflow-hidden border-t border-stone-200 bg-[#FFFCF8] dark:border-slate-800 dark:bg-slate-950">
            {/* Top accent bar — matches Contact card gradients */}
            <div
                aria-hidden="true"
                className="h-[3px] w-full bg-gradient-to-r from-indigo-400 via-violet-500 to-indigo-400"
            />

            {/* Subtle background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.07),transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent_60%)]" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="sm:col-span-2">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-amber-200/80 bg-amber-50 shadow-[0_1px_2px_rgba(120,53,15,0.10),0_10px_24px_-14px_rgba(245,158,11,0.55)] dark:border-amber-500/25 dark:bg-amber-500/[0.10]">
                                <img
                                    src="/favicon.svg"
                                    alt={`${personal.name} logo`}
                                    className="h-full w-full object-contain p-1"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </span>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[15px] font-semibold tracking-[-0.01em] text-stone-900 dark:text-white">
                                    {personal.name}
                                </span>
                                <span className="mt-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400">
                                    {personal.role}
                                </span>
                            </div>
                        </div>
                        <p className="mt-5 max-w-sm text-[14px] leading-[1.7] text-stone-600 dark:text-slate-400">
                            {personal.shortBio}
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400">
                            Explore
                        </h3>
                        <ul className="mt-5 space-y-2.5">
                            {[
                                { label: 'About', href: '#about' },
                                { label: 'Skills', href: '#skills' },
                                { label: 'Projects', href: '#projects' },
                                { label: 'Resume', href: '#resume' },
                                { label: 'Contact', href: '#contact' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        className="group inline-flex items-center gap-2 text-[14px] text-stone-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                                    >
                                        <span className="h-px w-0 bg-indigo-500 transition-all duration-300 group-hover:w-3 dark:bg-indigo-400" />
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400">
                            Connect
                        </h3>
                        <ul className="mt-5 space-y-2.5">
                            {socials.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2.5 text-[14px] text-stone-600 transition-colors duration-200 hover:text-stone-900 dark:text-slate-400 dark:hover:text-white"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200/80 bg-white transition-colors duration-200 group-hover:border-stone-300 group-hover:bg-stone-50 dark:border-slate-800 dark:bg-slate-900 dark:group-hover:border-slate-700 dark:group-hover:bg-slate-800">
                                            <Icon
                                                className={[
                                                    'h-3.5 w-3.5',
                                                    brandIconClass(label),
                                                ].join(' ')}
                                            />
                                        </span>
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-6 sm:flex-row dark:border-slate-800">
                    <p className="flex flex-wrap items-center justify-center gap-1.5 text-[12.5px] tracking-[-0.005em] text-stone-500 sm:justify-start dark:text-slate-400">
                        © {new Date().getFullYear()} {personal.name}. Built with
                        <Heart className="h-3.5 w-3.5 text-amber-500" />
                        using React, TypeScript &amp; Tailwind.
                    </p>

                    <button
                        type="button"
                        onClick={scrollTop}
                        className={[
                            'group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold tracking-[-0.01em] text-white',
                            'bg-indigo-600 shadow-[0_1px_2px_rgba(49,46,129,0.20),0_10px_28px_-14px_rgba(79,70,229,0.55)]',
                            'transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 active:translate-y-0',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF8]',
                            'dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-slate-950',
                        ].join(' ')}
                    >
                        <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
}