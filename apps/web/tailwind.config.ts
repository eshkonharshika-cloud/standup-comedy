import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B01",
        background: "#FFFFFF",
        foreground: "#353535",
      },
    },
  },
  plugins: [],
};

export default config;
