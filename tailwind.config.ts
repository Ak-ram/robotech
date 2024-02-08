import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        designColor: "#ff9900",
        // designColor: "#000",
      },
      screens: {
        'xs': '500px',
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
};
export default config;
