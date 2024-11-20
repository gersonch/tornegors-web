/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
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
  plugins: [daisyui],
  daisyui: {
    themes: ['dark', 'cupcake'],
  },
}
