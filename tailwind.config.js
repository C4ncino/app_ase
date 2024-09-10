/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F3F5F6",
          100: "#EAEEF0",
          200: "#DCE2E5",
          300: "#CAD3D8",
          400: "#ADBBC2",
          500: "#8A9EA8",
          600: "#6C8693",
          700: "#4C5E67",
          800: "#364349",
        },
        blue: {
          50: "#CCEEFF",
          100: "#99DDFF",
          200: "#66CCFF",
          300: "#33bbff",
          400: "#00AAFF",
          500: "#0099e6",
          600: "#0088cc",
          700: "#006699",
          800: "#004466",
        },
        red: {
          100: "#fd938b",
          200: "#f55347",
          300: "#f01e0f",
          400: "#d12115",
          500: "#98140b",
        },
        green: {
          100: "#afe9c8",
          200: "#48cb81",
          300: "#39c676",
          400: "#35a766",
          500: "#2d7c4f",
        },
      },
    },
  },
  plugins: [],
};
