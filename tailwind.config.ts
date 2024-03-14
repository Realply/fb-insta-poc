/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      sm: { max: '820px' },
      md: { min: '820px', max: '1510px' },
      lg: '1510px',
    },
    extend: {
      colors: {
        default: '#fff',
        primary: '#16161f',
        secondary: '#ff66ff',
        extra: '#ff6666',
      },
      width: {
        '15': '15%',
        '55': '55%',
        '60': '60%',
        '70': '70%',
        '80': '80%',
        '85': '85%',
        '90': '90%',
        '95': '95%',
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '2rem',
      full: "9999px"
    },
  },
};
