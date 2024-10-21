/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Updated from `purge` to `content`
  darkMode: 'media', // You can also remove this line entirely
  theme: {
    extend: {
      
      colors: {
        customBlue: '#1e3a8a', // Custom blue color
        customGray: '#d1d5db', // Example light gray color
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      screens: {
        tablet: '640px',
        laptop: '1024px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
