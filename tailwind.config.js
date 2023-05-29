/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkSeconday: "#192331",
        darkPrimary: "#313131"
      },
      animation: {
        "clock-slow": "spin 4s linear infinite",
        "clock": "spin 1.2s linear infinite",
      }
    },
  },
  plugins: [],
}

