/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,tsx,js,ts, html}'],
  theme: {
    extend: {
      colors: {
        main: '#17192D',
      },
      backgroundColor: {
        main: '#17192D',
      },
      borderColor: {
        card: 'rgba(216, 223, 230, 1)',
      },
      keyframes: {
        rotate180: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        rotate180: 'rotate180 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
