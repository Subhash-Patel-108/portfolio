import { useEffect, useRef, useState } from 'react';

interface UseTypewriterOptions {
    /** ms per character typed */
    typeSpeed?: number;
    /** ms per character deleted */
    deleteSpeed?: number;
    /** ms to hold the completed word before deleting */
    holdDuration?: number;
    /** ms to wait before typing the first character */
    startDelay?: number;
    /** Loop the sequence forever */
    loop?: boolean;
}

interface UseTypewriterResult {
    text: string;
    isTyping: boolean;
    /** true while the full word is held before deletion */
    isHolding: boolean;
    /** index of the word currently being typed */
    index: number;
}

/**
 * A calm, professional typewriter.
 *
 * - Types character by character.
 * - Holds, then deletes.
 * - Moves to the next word.
 * - Respects `prefers-reduced-motion` (jumps straight to the first word).
 */
export function useTypewriter(
    words: string[],
    options: UseTypewriterOptions = {},
): UseTypewriterResult {
    const {
        typeSpeed = 65,
        deleteSpeed = 32,
        holdDuration = 1600,
        startDelay = 400,
        loop = true,
    } = options;

    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState<'idle' | 'typing' | 'holding' | 'deleting'>('idle');

    // Refs to avoid stale closures inside setTimeout
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Respect reduced motion
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced && words.length > 0) {
            setText(words[0]);
            setPhase('holding');
        }
    }, [words]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (words.length === 0) return;

        const clear = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };

        const current = words[index % words.length];

        if (phase === 'idle') {
            clear();
            timerRef.current = setTimeout(() => setPhase('typing'), startDelay);
            return clear;
        }

        if (phase === 'typing') {
            if (text.length < current.length) {
                clear();
                timerRef.current = setTimeout(() => {
                    setText(current.slice(0, text.length + 1));
                }, typeSpeed);
            } else {
                clear();
                timerRef.current = setTimeout(() => setPhase('holding'), holdDuration);
            }
            return clear;
        }

        if (phase === 'holding') {
            clear();
            timerRef.current = setTimeout(() => setPhase('deleting'), 0);
            return clear;
        }

        if (phase === 'deleting') {
            if (text.length > 0) {
                clear();
                timerRef.current = setTimeout(() => {
                    setText(current.slice(0, text.length - 1));
                }, deleteSpeed);
            } else {
                clear();
                timerRef.current = setTimeout(() => {
                    setIndex((i) => {
                        const next = i + 1;
                        if (!loop && next >= words.length) return i;
                        return next;
                    });
                    setPhase('typing');
                }, 260);
            }
            return clear;
        }

        return clear;
    }, [text, phase, index, words, typeSpeed, deleteSpeed, holdDuration, startDelay, loop]);

    return {
        text,
        isTyping: phase === 'typing',
        isHolding: phase === 'holding',
        index: index % Math.max(words.length, 1),
    };
}