import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        statifyldark: {
          "primary": "#28e269",
          "secondary": "#35712d",
          "accent": "#55b98e",
          "neutral": "#f6e9ea",
          "base-100": "#000000",
        },
        statifylight: {
          "primary": "#1dd75e",
          "secondary": "#96d28e",
          "accent": "#46aa7f",
          "neutral": "#220d0c",
          "base-100": "#ffffff",
        }
      },
      "dark",
      "cupcake",
    ],
  },
};
export default config;
