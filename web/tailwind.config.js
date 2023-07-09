/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Inter', sans-serif",
      },
      colors: {
        app: {
          950: "#00111c",
          900: "#001523",
          800: "#001a2c",
          700: "#002137",
          600: "#00253e",
          500: "#002945",
          400: "#002e4e",
          300: "#003356",
          200: "#003a61",
          100: "#00406c",
        },
      },
      keyframes: {
        slideToRight: {
          "0%": { width: 0 },
          "100%": { width: "100%" },
        },
      },
      animation: {
        slideToRight: "slideToRight 0.2s ease-in-out forwards",
      },
      boxShadow: {
        glass:
          "inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.2), 0 5px 1rem 0 rgba(0, 33, 55, 0.5)",
      },
    },
  },
  plugins: [],
};
