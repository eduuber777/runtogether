/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6f7ff',
                    100: '#b3e5ff',
                    200: '#80d4ff',
                    300: '#4dc2ff',
                    400: '#1ab1ff',
                    500: '#0099e6',
                    600: '#0077b3',
                    700: '#006a8e',
                    800: '#00425a',
                    900: '#001f2b',
                },
                secondary: {
                    50: '#f0feff',
                    100: '#d4fcff',
                    200: '#b8faff',
                    300: '#9cf7ff',
                    400: '#80f5ff',
                    500: '#73edff',
                    600: '#5cd9eb',
                    700: '#45c5d7',
                    800: '#2eb1c3',
                    900: '#179daf',
                },
                accent: {
                    orange: '#ff6b35',
                    purple: '#7c3aed',
                    pink: '#ec4899',
                    green: '#10b981',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, #0099e6 0%, #006a8e 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #73edff 0%, #45c5d7 100%)',
                'gradient-vibrant': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-sunset': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                'gradient-ocean': 'linear-gradient(135deg, #0099e6 0%, #73edff 100%)',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(0, 153, 230, 0.3)',
                'glow-lg': '0 0 30px rgba(0, 153, 230, 0.4)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
        },
    },
    plugins: [],
}
