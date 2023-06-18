/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        staat: ['var(--staatliches)'],
        manrope: ['var(--manrope)']
      },
      lineHeight: {
        default: '1.2'
      },
      aspectRatio: {
        custom: '0.98/1'
      }
    }
  }
};
