import { createPortal } from 'react-dom';
import {
    AlertTriangle,
    CheckCircle2,
    Info,
    Loader2,
    X,
    XCircle,
} from 'lucide-react';
import {
    useToast,
    type Toast,
    type ToastVariant,
} from '../../contexts/ToastContext';

interface VariantStyle {
    Icon: typeof Info;
    wrapper: string;
    iconWrap: string;
    iconColor: string;
    progress: string;
    spin?: boolean;
}

const VARIANTS: Record<ToastVariant, VariantStyle> = {
    success: {
        Icon: CheckCircle2,
        wrapper: 'border-emerald-200 dark:border-emerald-500/30',
        iconWrap: 'bg-emerald-100 dark:bg-emerald-500/15',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        progress: 'bg-emerald-500',
    },
    error: {
        Icon: XCircle,
        wrapper: 'border-rose-200 dark:border-rose-500/30',
        iconWrap: 'bg-rose-100 dark:bg-rose-500/15',
        iconColor: 'text-rose-600 dark:text-rose-400',
        progress: 'bg-rose-500',
    },
    warning: {
        Icon: AlertTriangle,
        wrapper: 'border-amber-200 dark:border-amber-500/30',
        iconWrap: 'bg-amber-100 dark:bg-amber-500/15',
        iconColor: 'text-amber-600 dark:text-amber-400',
        progress: 'bg-amber-500',
    },
    info: {
        Icon: Info,
        wrapper: 'border-indigo-200 dark:border-indigo-500/30',
        iconWrap: 'bg-indigo-100 dark:bg-indigo-500/15',
        iconColor: 'text-indigo-600 dark:text-indigo-400',
        progress: 'bg-indigo-500',
    },
    loading: {
        Icon: Loader2,
        wrapper: 'border-slate-200 dark:border-slate-700',
        iconWrap: 'bg-slate-100 dark:bg-slate-800',
        iconColor: 'text-slate-600 dark:text-slate-300',
        progress: 'bg-slate-500',
        spin: true,
    },
};

function ToastItem({
    toast,
    onDismiss,
}: {
    toast: Toast;
    onDismiss: (id: string) => void;
}) {
    const style = VARIANTS[toast.variant];
    const { Icon } = style;

    return (
        <div
            role="status"
            aria-live="polite"
            className={[
                'pointer-events-auto relative w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-xl',
                'border bg-white shadow-lg shadow-slate-900/5 backdrop-blur-sm',
                'animate-toast-in dark:bg-slate-900 dark:shadow-black/30',
                style.wrapper,
            ].join(' ')}
        >
            <div className="flex items-start gap-3 p-3.5">
                <span
                    className={[
                        'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        style.iconWrap,
                        style.iconColor,
                    ].join(' ')}
                >
                    <Icon className={['h-4 w-4', style.spin ? 'animate-spin' : ''].join(' ')} />
                </span>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-5 text-slate-900 dark:text-slate-50">
                        {toast.title}
                    </p>
                    {toast.description && (
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            {toast.description}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => onDismiss(toast.id)}
                    aria-label="Dismiss notification"
                    className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>

            {toast.duration > 0 && (
                <span
                    aria-hidden="true"
                    className={[
                        'absolute bottom-0 left-0 h-0.5 w-full origin-left',
                        style.progress,
                        'animate-toast-progress',
                    ].join(' ')}
                    style={{ animationDuration: `${toast.duration}ms` }}
                />
            )}
        </div>
    );
}

export default function Toaster() {
    const { toasts, dismiss } = useToast();
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div
            aria-label="Notifications"
            className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-end gap-2 px-4 sm:inset-x-auto sm:right-4 sm:px-0"
        >
            {toasts.map((t) => (
                <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
            ))}
        </div>,
        document.body,
    );
}