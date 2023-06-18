/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        staat: ['var(--staatliches)'],
        manrope: ['var(--manrope)']
      },
      lineHeight: {
        default: '1.2'
      }
    }
  }
};
