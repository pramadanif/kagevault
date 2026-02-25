import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-deep": "#1D2253",
        "navy-surface": "#2A306A",
        "navy-border": "#3E468A",
        "navy-subtle": "#2E3670",
        "brand-orange": "#F35917",
        "brand-blue-gray": "#A0ABDB",
        "brand-muted": "#6B77B0",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulseRing 4s ease-out infinite",
        blob: "blob 8s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        pulseRing: {
          "0%": { "box-shadow": "0 0 0 0 rgba(243,89,23,0.4)" },
          "70%": { "box-shadow": "0 0 0 12px rgba(243,89,23,0)" },
          "100%": { "box-shadow": "0 0 0 0 rgba(243,89,23,0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-10px, 15px) scale(0.97)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
