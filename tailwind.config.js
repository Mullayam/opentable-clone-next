/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "2xsm": "10px",
      xsm: "12px",
      sm: "13px",
      red: "15px",
      lg: "18px",
      "2xl": "22px",
      "3xl": "15px",
      "4xl": "32px",
      "5xl": "40px",
      "6xl": "50px",
      "7xl": "70px",
    },
  },
  plugins: [],
};
