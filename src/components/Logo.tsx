import { useId } from 'react';

interface LogoProps {
    /** Rendered width & height in px. Default 36. */
    size?: number;
    className?: string;
    /** Optional title for a11y — omit to make it decorative. */
    title?: string;
}

export function Logo({ size = 36, className, title }: LogoProps) {
    const uid = useId().replace(/[:]/g, '');
    const gradId = `logo-grad-${uid}`;
    const shineId = `logo-shine-${uid}`;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            role={title ? 'img' : 'presentation'}
            aria-label={title}
            aria-hidden={title ? undefined : true}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="55%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                    <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
            </defs>

            <rect width="48" height="48" rx="12" fill={`url(#${gradId})`} />
            <rect width="48" height="48" rx="12" fill={`url(#${shineId})`} />

            <path
                d="M33 17c-1.8-2.4-4.8-3.8-8.2-3.8-5.3 0-8.8 2.9-8.8 6.9 0 3.7 2.4 5.5 7.5 6.6 4.5 1 6.2 2 6.2 4 0 2.2-2.1 3.6-5.4 3.6-3.2 0-5.8-1.3-7.4-3.6"
                stroke="#ffffff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

export default Logo;