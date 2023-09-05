/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                ListShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
            },
        },
    },
    plugins: [],
    compilerOptions: {
        types: ["kakao.maps.d.ts"],
    },
};
