/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          border: '#22c55e', // Tailwind's green-500 color
          text: '#000000', // Solid black for text on primary backgrounds
          background: '#ffffff' // Solid white for primary backgrounds
        }
      },
    },
  },
  plugins: [],
}
