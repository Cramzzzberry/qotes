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
  },
  plugins: []
}
