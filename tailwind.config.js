/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0866FF",
        secondary: "#8B96AA",
      },
      backgroundImage: {
        "login-background": `url('/Login.svg')`,
      },
      backgroundSize: {
        "fill-image": `100% 100%`,
      },
    },
  },
  plugins: [],
}
