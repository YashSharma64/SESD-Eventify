/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
      },
      colors: {
        'dark': {
          'bg': '#0f0f0f',
          'card': '#1a1a1a',
          'border': '#2a2a2a',
        },
        'accent': {
          'blue': '#3b82f6',
          'purple': '#8b5cf6',
        }
      }
    },
  },
  plugins: [],
}
