interface IconProps {
    className?: string;
    title?: string;
}

export function GithubIcon({ className, title }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            aria-label={title}
            role={title ? 'img' : 'presentation'}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
    );
}

export function LinkedinIcon({ className, title }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            aria-label={title}
            role={title ? 'img' : 'presentation'}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
    );
}

// ---------------------------------------------------------------------------
//  Amazon DynamoDB — hexagonal prism (database shape)
// ---------------------------------------------------------------------------

export function DynamoDBIcon({ className, title }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            aria-label={title}
            role={title ? 'img' : 'presentation'}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Top face — the "table" surface */}
            <path d="M12 1.5L2 6l10 4.5L22 6 12 1.5z" />

            {/* Left face — front-left panel */}
            <path d="M2 6v12l10 4.5V10.5L2 6z" fillOpacity="0.7" />

            {/* Right face — front-right panel, darkest for depth */}
            <path d="M22 6v12l-10 4.5V10.5L22 6z" fillOpacity="0.45" />

            {/* Center seam — subtle highlight along the vertical edge */}
            <path
                d="M12 10.5v12"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeOpacity="0.35"
                fill="none"
            />
        </svg>
    );
}

// ---------------------------------------------------------------------------
//  Amazon EC2 — compute instance cube
// ---------------------------------------------------------------------------

export function EC2Icon({ className, title }: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            aria-label={title}
            role={title ? 'img' : 'presentation'}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Top face — the CPU lid */}
            <path d="M12 1.5L2 6.5l10 5 10-5-10-5z" />

            {/* Left face — front-left panel */}
            <path d="M2 6.5v11l10 5v-11L2 6.5z" fillOpacity="0.7" />

            {/* Right face — front-right panel, darkest */}
            <path d="M22 6.5v11l-10 5v-11l10-5z" fillOpacity="0.45" />

            {/* Instance indicator — small square on the top face,
                suggests an active compute instance */}
            <path d="M11 5.5l1-.5 1 .5-1 .5-1-.5z" fillOpacity="0.5" />
        </svg>
    );
}