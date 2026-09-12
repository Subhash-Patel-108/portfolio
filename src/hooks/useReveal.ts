import { useEffect, useRef, useState } from 'react';

interface Options {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
    options: Options = {},
) {
    const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options;
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setVisible(false);
                }
            },
            { threshold, rootMargin },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, visible };
}