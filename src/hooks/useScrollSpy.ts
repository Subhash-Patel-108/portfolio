import { useEffect, useState } from 'react';

export function useScrollSpy(
    ids: string[],
    options: { rootMargin?: string; threshold?: number[] } = {},
): string {
    const { rootMargin = '-45% 0px -50% 0px', threshold = [0] } = options;
    const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (elements.length === 0) return;

        const visible = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visible.set(
                        entry.target.id,
                        entry.isIntersecting ? entry.intersectionRatio : 0,
                    );
                });

                let bestId = '';
                let bestRatio = -1;
                visible.forEach((ratio, id) => {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        bestId = id;
                    }
                });
                if (bestId && bestRatio > 0) setActiveId(bestId);
            },
            { rootMargin, threshold },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids, rootMargin, threshold]);

    return activeId;
}