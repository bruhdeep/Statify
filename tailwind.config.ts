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
          primary: "#007BFF",
          secondary: "#323F4B",
          accent: "#9C27B0",
          neutral: "#070D0D",
          "base-100": "#121212",
        },
        statifylight: {
          primary: "#007BFF",
          secondary: "#E0E0E0",
          accent: "#26C6DA",
          neutral: "#070D0D",
          "base-100": "#FFFFFF",
        },
      },
      "dark",
      "cupcake",
      "emerald",
      "sunset",
      "dim",
    ],
  },
  function({ addUtilities }: { addUtilities: any }) {
    const newUtilities = {
      ".no-scrollbar::-webkit-scrollbar": {
        display: "none",
      },
      ".no-scrollbar": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
    };
  },
};
export default config;
