/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'transparent-8': 'rgba(255, 255, 255, 0.08)', 
      },
      colors: {
        customBlue: "#839FCD", 
        GreenLite : '#F4FFF3',
        Bluehover : '#3F6CB5'
      },
    },
  },
  plugins: [],
}

