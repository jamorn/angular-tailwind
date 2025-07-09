/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#374151',
          200: '#1f2937',
          300: '#111827',
        },
        primary: 'var(--primary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)'
      },
      outline: {
        none: 'none',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    preflight: false,
    outline: true
  }
}