import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertOctagon, Home, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: (error: Error, reset: () => void) => ReactNode;
    onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
    error: Error | null;
}

const isDev = import.meta.env?.DEV ?? false;

export class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        if (isDev) {
            // eslint-disable-next-line no-console
            console.error('[ErrorBoundary]', error, info);
        }
        this.props.onError?.(error, info);
    }

    private reset = (): void => this.setState({ error: null });
    private reload = (): void => {
        if (typeof window !== 'undefined') window.location.reload();
    };
    private goHome = (): void => {
        if (typeof window !== 'undefined') (window.location.href = '/');
    };

    render(): ReactNode {
        const { error } = this.state;
        const { children, fallback } = this.props;
        if (!error) return children;
        if (fallback) return fallback(error, this.reset);

        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-500/15">
                        <AlertOctagon className="h-7 w-7 text-rose-600 dark:text-rose-400" />
                    </div>

                    <h1 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-50">
                        Something went wrong
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        An unexpected error occurred. You can try again, or head back home.
                    </p>

                    {isDev && (
                        <pre className="mt-4 max-h-40 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-left text-xs text-rose-600 dark:border-slate-800 dark:bg-slate-950 dark:text-rose-400">
                            {error.message}
                            {error.stack ? `\n\n${error.stack}` : ''}
                        </pre>
                    )}

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={this.reload}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Reload page
                        </button>
                        <button
                            type="button"
                            onClick={this.goHome}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            <Home className="h-4 w-4" />
                            Go home
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}