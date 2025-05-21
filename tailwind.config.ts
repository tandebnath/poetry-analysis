import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        lora: "var(--font-lora)",
      },
      colors: {
        background: "#F8F8F8",
        text: "#333333",
        primary: "#003366",
        secondary: "#0055aa",
        accent: "#CC5500",
        white: "#fff",
        black: "#000",
      },
    },
  },
  // darkMode: "class", // Enables class-based dark mode
};

export default config;