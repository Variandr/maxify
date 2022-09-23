/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/client/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        basic: ['Reem Kufi Fun', 'sans-serif'],
        mukta: ['Mukta', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
