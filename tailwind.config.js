/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    borderRadius: {
      none: '0',
      sm: '2px',
      md: '4px',
      lg: '6px',
      xl: '8px',
      '2xl': '10px',
      '3xl': '12px',
      full: '9999px'
    },

    extend: {
      colors: {
        'cod-gray': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#191919'
        },

        'ocean-green': {
          50: '#eefbf4',
          100: '#d6f5e2',
          200: '#b1e9ca',
          300: '#7ed7ac',
          400: '#42b883',
          500: '#27a26f',
          600: '#188359',
          700: '#136949',
          800: '#12533c',
          900: '#104432',
          950: '#08261c'
        }
      }
    }
  },
  plugins: []
}
