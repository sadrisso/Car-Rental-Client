/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': "url('https://i.ibb.co.com/yffdYfV/car-4.jpg')",
        'page-bg': "url('https://i.ibb.co.com/KqMS0CH/car-6.jpg')"
      }
    },
  },
  plugins: [daisyui],
}