/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backdropBlur: {
        super: "100px",
        gigant: "180px",
      },
      colors: {
        'primary': {
          default: '#339dff',
          hover: '#0084ff',
          'red': {
            default: '#ec8273',
            hover: '#e55742'
          }
        },
        'light': '#f1f6fb',
        'blackPearl': '#0b1825',
        'darkBlue': '#112337',
        'darkGray': 'rgba(246,241,251,5%)',
        'lightGray': '#808c98',
        'extraLightGray': '#8c97a3',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      fontSize: {
        xxs: ["10px", {}],
      },
    },
  },
  plugins: [],
}