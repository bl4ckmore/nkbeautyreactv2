/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Google Sans'", "Inter", "sans-serif"],
      },
      colors: {
        blush: "#f4c6c6",
        rose: "#e8a0a0",
        cream: "#fdf6f0",
        charcoal: "#1a1a1a",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
}