/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077B6",      // Ocean Blue
        secondary: "#F4A261",    // Sand Yellow
        tertiary: "#2A9D8F",     // Forest Green
        neutralLight: "#F8F9FA", // Cloud White
        neutralDark: "#2D2D2D",  // Charcoal Gray
      },
    },
  },
  plugins: [],
}

