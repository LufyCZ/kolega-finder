/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: () => ({
        "gradient-radial": "radial-gradient(#13213E, #111829)",
      }),
      boxShadow: {
        "depth-1": "0px 3px 6px rgba(15, 15, 15, 0.5)",
      },
      colors: {
        blue: {
          DEFAULT: "#3b82f6",
        },
        pink: {
          DEFAULT: "#ec4899",
        },
        green: {
          DEFAULT: "#22c55e",
        },
        red: {
          DEFAULT: "#ef4444",
        },
        yellow: {
          DEFAULT: "#eab308",
        },
      },
      animation: {
        ellipsis: "ellipsis 1.25s infinite",
        "spin-slow": "spin 2s linear infinite",
        heartbeat: "heartbeat 1s ease 0.2s infinite normal forwards",
        rotate: "rotate360 1s cubic-bezier(0.83, 0, 0.17, 1) infinite",
      },
      keyframes: {
        ellipsis: {
          "0%": { content: '"."' },
          "33%": { content: '".."' },
          "66%": { content: '"..."' },
        },
        heartbeat: {
          "0%": {
            transform: "scale(1)",
            transformOrigin: "center center",
            animationTimingFunction: "ease-out",
          },
          "10%": {
            animationTimingFunction: "ease-out",
            transform: "scale(0.91)",
          },
          "17%": {
            animationTimingFunction: "ease-out",
            transform: "scale(0.98)",
          },
          "33%": {
            animationTimingFunction: "ease-out",
            transform: "scale(0.87)",
          },
          "45%": { animationTimingFunction: "ease-out", transform: "scale(1)" },
        },
        rotate360: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
  },
};
