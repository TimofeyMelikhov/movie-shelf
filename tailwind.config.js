/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      rubik:['Rubik', 'sans-serif']
    },
    extend: {
      colors: {
        high_rating: '#3bb33b'
      }
    },
  },
  plugins: [],
}

