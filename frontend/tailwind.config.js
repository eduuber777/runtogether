/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#006a8e', // uoc-blue
                secondary: '#73edff', // uoc-cyan
                dark: '#00425a', // uoc-dark
                light: '#e0f7ff', // uoc-light
            }
        },
    },
    plugins: [],
}
