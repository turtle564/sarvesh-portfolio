import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        sans: ["var(--font-geist-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#0d0b0b",
          surface: "#141111",
          elevated: "#1c1818",
          border: "#2a2424",
        },
        text: {
          primary: "#f0ebe8",
          secondary: "#c4bbb7",
          muted: "#8a8280",
        },
        accent: {
          DEFAULT: "#8b2020",
          hover: "#a32525",
          muted: "#5a1515",
          glow: "rgba(139,32,32,0.15)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
