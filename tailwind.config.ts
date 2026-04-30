import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#FFF5F5',
                    100: '#FFE0E0',
                    200: '#FFC2C2',
                    300: '#FF9E9E',
                    400: '#FF7B7B',
                    500: '#FF6B6B',
                    600: '#E05555',
                    700: '#C04040',
                    800: '#A02B2B',
                    900: '#801A1A',
                },
                secondary: {
                    50: '#FFF5F7',
                    100: '#FFEBEF',
                    200: '#FFD6DE',
                    300: '#FFB5C5',
                    400: '#FF8FA8',
                    500: '#FF698B',
                    600: '#E05572',
                    700: '#C0405A',
                    800: '#A02B42',
                    900: '#801A2E',
                },
                accent: {
                    50: '#FDF8F3',
                    100: '#F9EDE0',
                    200: '#F2D9BD',
                    300: '#E8C49A',
                    400: '#DEAF77',
                    500: '#D4A574',
                    600: '#B8895E',
                    700: '#9C6D48',
                    800: '#805132',
                    900: '#643A20',
                },
                neutral: {
                    0: '#FFFFFF',
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    1000: '#0A0A0A',
                },
                success: {
                    50: '#F0FDF4',
                    500: '#22C55E',
                    700: '#15803D',
                },
                warning: {
                    50: '#FFFBEB',
                    500: '#F59E0B',
                    700: '#B45309',
                },
                error: {
                    50: '#FEF2F2',
                    500: '#EF4444',
                    700: '#B91C1C',
                },
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '12px',
                base: '16px',
                lg: '24px',
                xl: '32px',
                '2xl': '48px',
            },
            borderRadius: {
                sm: '6px',
                md: '12px',
                lg: '16px',
                xl: '24px',
                full: '9999px',
            },
            boxShadow: {
                card: '0 2px 12px rgba(0,0,0,0.08)',
                float: '0 8px 30px rgba(0,0,0,0.12)',
            },
            animation: {
                'bounce-in': 'bounceIn 0.5s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'fade-in': 'fadeIn 0.3s ease-out',
                shimmer: 'shimmer 2s infinite',
            },
            keyframes: {
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            screens: {
                xs: '375px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1440px',
            },
        },
    },
    plugins: [],
};

export default config;