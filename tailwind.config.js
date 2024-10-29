/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dela: 'Dela Gothic One',
      },
      maxWidth: {
        'screen-3xl': '1850px', // Usa "screen-3xl" para mantener el formato de Tailwind
      },
    },
  },
  plugins: [],
}
