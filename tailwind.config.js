/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      rubik:['Rubik', 'sans-serif']
    },
    extend: {
      colors: {
        high_rating: '#3bb33b',
        low_rating: 'red',
        medium_rating: '#777',
        bgc_color: '#f4f4f4;',
        active_staff_link: '#f50'
      }
    },
  },
  plugins: [],
}

