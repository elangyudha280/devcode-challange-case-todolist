/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'poppins':["'Poppins'",'sans-serif']
      },
      colors:{
        'blue':{
          'navbar':'rgba(22, 171, 248,1)'
        }
      }
    },
  },
  plugins: [],
}

