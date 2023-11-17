/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        main: 'rgb(var(--color-main) / <alpha-value>)',
        sub: 'rgb(var(--color-sub) / <alpha-value>)',
        title: 'rgb(var(--color-title) / <alpha-value>)',
        content: 'rgb(var(--color-content) / <alpha-value>)',
        other: 'rgb(var(--color-other) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        accent: '#55b988',
        accentHover: '#5ac490',
        closeHover: '#b5b5b5',
      },
      keyframes: {
        darkMode: {
          '0%': { opacity: 0, transform: 'rotate(-120deg)' },
          '100%': { opacity: 1, transform: 'rotate(0)' },
        },
      },
      animation: {
        darkMode: 'darkMode 0.4s ease-in-out ',
      },
    },
  },
  plugins: [],
};
