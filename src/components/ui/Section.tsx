import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

interface SectionProps {
    id: string;
    title?: string;
    eyebrow?: string;
    description?: string;
    className?: string;
    children: ReactNode;
}

export default function Section({
    id,
    title,
    eyebrow,
    description,
    className = '',
    children,
}: SectionProps) {
    const { ref, visible } = useReveal<HTMLDivElement>();

    return (
        <section
            id={id}
            className={`relative py-20 sm:py-24 lg:py-28 ${className}`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {(eyebrow || title || description) && (
                    <div
                        ref={ref}
                        className={[
                            'mx-auto mb-12 max-w-2xl text-center',
                            visible ? 'animate-reveal-up' : 'opacity-0',
                        ].join(' ')}
                    >
                        {eyebrow && (
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                                {eyebrow}
                            </p>
                        )}
                        {title && (
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}