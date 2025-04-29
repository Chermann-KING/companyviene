/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#2ba940",
          light: "#4cb85f",
          dark: "#1e8a30",
        },
        secondary: {
          main: "#333333",
          light: "#666666",
          dark: "#111111",
        },
        background: {
          light: "#ffffff",
          dark: "#f5f5f5",
        },
        accent: {
          success: "#2ba940",
          error: "#e53935",
          warning: "#ffa000",
          info: "#0288d1",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
