/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'taj-gold': '#D4AF37',
        'taj-amber': '#8B4513',
        'taj-charcoal': '#1A1A1A',
        'taj-black': '#0F0F0F',
        'taj-sandalwood': '#C2B280',
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
