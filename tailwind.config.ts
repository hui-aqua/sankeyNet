import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#eef9fb",
          100: "#d5f0f5",
          500: "#178ea6",
          700: "#11657b",
          900: "#0b3340"
        },
        kelp: {
          100: "#e8f5e9",
          500: "#2e7d57",
          700: "#1c5a3d"
        }
      },
      boxShadow: {
        panel: "0 12px 40px rgba(8, 41, 52, 0.14)"
      }
    }
  },
  plugins: []
} satisfies Config;
