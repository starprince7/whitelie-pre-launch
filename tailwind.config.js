const { heroui } = require('@heroui/react');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FDCA64', // amber/gold from the design system
      },
      fontFamily: {
        sans: ['var(--font-loved-by-the-king)'],
        inter: ['var(--font-inter)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui(), require('@tailwindcss/aspect-ratio')],
}
