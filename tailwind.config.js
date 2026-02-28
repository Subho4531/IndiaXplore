/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                serif: ['Volkhov', 'serif'],
            },
            colors: {
                coral: '#DF6951',
                'orange-accent': '#F1A501',
            }
        },
    },
    plugins: [],
}
