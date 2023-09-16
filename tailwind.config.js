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
        },
        'priority':{
          'very-high':'#ed4c5c',
          'high':'#F8A541',
          'medium':'#00A790',
          'low':'#428BC1',
          'very-low':'#8942C1'
        }
      }
    },
  },
  plugins: [],
}

