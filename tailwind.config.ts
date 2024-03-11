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
          primary: "#4446a7",
          secondary: "#212373",
          accent: "#1d1fa5",
          neutral: "#f0f0f4",
          "base-100": "#05050a",
        },
        statifylight: {
          primary: "#5759bb",
          secondary: "#8b8cde",
          accent: "#5c5fe2",
          neutral: "#0a0a0e",
          "base-100": "#f6f6fa",
        },
      },
      "dark",
      "cupcake",
    ],
  },
};
export default config;
