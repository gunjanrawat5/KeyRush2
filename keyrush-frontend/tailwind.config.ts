import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
      },
    },
  },
  plugins: [],
};

export default config;