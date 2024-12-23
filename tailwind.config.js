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
        'page-bg': "url('https://i.ibb.co.com/YQ6B8FK/car-7.jpg')",
        'discount-bg': "url('https://i.ibb.co.com/dByyPGx/discount-Banner.png')"
      }
    },
  },
  plugins: [daisyui],
}