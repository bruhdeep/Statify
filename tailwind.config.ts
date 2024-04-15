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
        statifydark: {
          primary: "#42B3AF",
          secondary: "#1E6664",
          accent: "#26A19F",
          neutral: "#F2F8F8",
          "base-100": "#040B0A",
        },
        statifylight: {
          primary: "#4CBDB9",
          secondary: "#98E1DF",
          accent: "#5ED9D7",
          neutral: "#070D0D",
          "base-100": "#F2F5FF",
        },
      },
      "dark",
      "cupcake",
      "emerald",
      "sunset",
      "dim",
    ],
  },
};
export default config;
