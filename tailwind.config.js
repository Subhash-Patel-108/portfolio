/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            keyframes: {
                'toast-in': {
                    from: { opacity: '0', transform: 'translateX(120%) scale(0.95)' },
                    to: { opacity: '1', transform: 'translateX(0) scale(1)' },
                },
                'toast-progress': {
                    from: { transform: 'scaleX(1)' },
                    to: { transform: 'scaleX(0)' },
                },
                'reveal-up': {
                    from: { opacity: '0', transform: 'translateY(24px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'spin-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                'blob': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
                },
            },
            animation: {
                'toast-in': 'toast-in 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                'toast-progress': 'toast-progress linear forwards',
                'reveal-up': 'reveal-up 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
                'blob': 'blob 18s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};