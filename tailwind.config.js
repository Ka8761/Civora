/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#0A2A43',
        'blue-dark': '#061A2C',
        'blue-mid': '#123B5D',
        'blue-light': '#1E5A85',

        gold: '#C9921A',
        'gold-light': '#E8B84B',
        'gold-bright': '#F2C94C',
      },

      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        barlow: ['Barlow', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
};