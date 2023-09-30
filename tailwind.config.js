/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#30343f",
        secondary: "#081c15",
      },
      colors: {
        primary: "#d8f3dc",
        secondary: "#1b4332",
      },
      fontFamily: {
        margarine: ["var(--margarine)"],
        instrument_sans: ["var(--instrument_sans)"],
      },
      lineHeight: {
        1.1: "1.1",
        1.2: "1.2",
      },
      letterSpacing: {
        none: "0em",
      },
      borderColor: {
        primary: "#E4D9FF",
      },
      boxShadow: {
        "pricing-card-shadow": "0px 10px 20px -20px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
