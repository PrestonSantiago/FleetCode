/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "#D5CFD2",
        "primary-dark": "#333432",
        secondary: "#9FE232",
      },
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
        serif: ["Lekton", "serif"],
      },
      spacing: {
        150: "37.5rem",
        120: "30rem",
      },
      borderRadius: {
        "8xl": "4rem",
      },
    },
  },
  plugins: [],
};
