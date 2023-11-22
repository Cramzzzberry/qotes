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
    screens: {
      'on-2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      'on-xl': { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      'on-lg': { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      'on-md': { max: '767px' },
      // => @media (max-width: 767px) { ... }

      'on-sm': { max: '639px' }
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: []
}
