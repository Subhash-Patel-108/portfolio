import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
    id: string;
    title: string;
    description?: string;
    variant: ToastVariant;
    duration: number;
}

export interface ToastInput {
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
    id?: string;
}

export interface ToastContextValue {
    toasts: Toast[];
    toast: (input: ToastInput) => string;
    success: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) => string;
    error: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) => string;
    warning: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) => string;
    info: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) => string;
    loading: (title: string, opts?: Omit<ToastInput, 'title' | 'variant'>) => string;
    dismiss: (id: string) => void;
    update: (id: string, patch: Partial<Omit<ToastInput, 'id'>>) => void;
    clear: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;
const genId = () => `toast-${Date.now().toString(36)}-${(counter++).toString(36)}`;

const DEFAULT_DURATION = 4200;
const LOADING_DURATION = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
    const toastsRef = useRef<Toast[]>([]);

    useEffect(() => {
        toastsRef.current = toasts;
    }, [toasts]);

    const clearTimer = useCallback((id: string) => {
        const t = timersRef.current.get(id);
        if (t) {
            clearTimeout(t);
            timersRef.current.delete(id);
        }
    }, []);

    const scheduleDismiss = useCallback(
        (id: string, duration: number) => {
            clearTimer(id);
            if (duration <= 0) return;
            const handle = setTimeout(() => {
                setToasts((prev) => prev.filter((x) => x.id !== id));
                timersRef.current.delete(id);
            }, duration);
            timersRef.current.set(id, handle);
        },
        [clearTimer],
    );

    const dismiss = useCallback(
        (id: string) => {
            clearTimer(id);
            setToasts((prev) => prev.filter((x) => x.id !== id));
        },
        [clearTimer],
    );

    const toast = useCallback(
        (input: ToastInput) => {
            const id = input.id ?? genId();
            const variant: ToastVariant = input.variant ?? 'info';
            const duration =
                input.duration ?? (variant === 'loading' ? LOADING_DURATION : DEFAULT_DURATION);
            const newToast: Toast = {
                id,
                title: input.title,
                description: input.description,
                variant,
                duration,
            };

            setToasts((prev) => {
                const idx = prev.findIndex((t) => t.id === id);
                if (idx >= 0) {
                    const copy = [...prev];
                    copy[idx] = newToast;
                    return copy;
                }
                return [...prev, newToast];
            });
            scheduleDismiss(id, duration);
            return id;
        },
        [scheduleDismiss],
    );

    const update = useCallback(
        (id: string, patch: Partial<Omit<ToastInput, 'id'>>) => {
            const existing = toastsRef.current.find((t) => t.id === id);
            if (!existing) return;

            clearTimer(id);

            const variant = patch.variant ?? existing.variant;
            const duration =
                patch.duration ??
                (variant === 'loading' ? LOADING_DURATION : DEFAULT_DURATION);

            setToasts((prev) =>
                prev.map((t) =>
                    t.id === id ? { ...t, ...patch, variant, duration } : t,
                ),
            );
            scheduleDismiss(id, duration);
        },
        [clearTimer, scheduleDismiss],
    );

    const clear = useCallback(() => {
        timersRef.current.forEach((t) => clearTimeout(t));
        timersRef.current.clear();
        setToasts([]);
    }, []);

    useEffect(
        () => () => {
            timersRef.current.forEach((t) => clearTimeout(t));
            timersRef.current.clear();
        },
        [],
    );

    const value = useMemo<ToastContextValue>(
        () => ({
            toasts,
            toast,
            success: (title, opts) => toast({ ...opts, title, variant: 'success' }),
            error: (title, opts) => toast({ ...opts, title, variant: 'error' }),
            warning: (title, opts) => toast({ ...opts, title, variant: 'warning' }),
            info: (title, opts) => toast({ ...opts, title, variant: 'info' }),
            loading: (title, opts) => toast({ ...opts, title, variant: 'loading' }),
            dismiss,
            update,
            clear,
        }),
        [toasts, toast, dismiss, update, clear],
    );

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
    return ctx;
}