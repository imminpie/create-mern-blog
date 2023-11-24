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
        accent: '#55b988',
        accentHover: '#5ac490',
        closeHover: '#dcdcdc',
        danger: '#e75b6f',
      },
    },
  },
  plugins: [],
};
