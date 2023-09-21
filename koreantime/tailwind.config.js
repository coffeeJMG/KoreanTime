/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xs: "576px",
            sm: "768px",
            md: "992px",
            lg: "1200px",
            xl: "1280px",
        },
        plugins: [],
    },
    plugins: [],
};
