import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: '0 0 15px rgba(0, 255, 255, 0.5)',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      perspective: {
        '800': '800px',
      },
      rotate: {
        'y-5': 'rotateY(5deg)',
        'y-10': 'rotateY(10deg)',
        'y-90': 'rotateY(90deg)',
        'x-5': 'rotateX(5deg)',
        'x-90': 'rotateX(90deg)',
      }
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.perspective-800': {
          perspective: '800px',
        },
        '.transform-style': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.rotate-y-10': {
          transform: 'rotateY(10deg)',
        },
        '.rotate-y-90': {
          transform: 'rotateY(90deg)',
        },
        '.rotate-x-5': {
          transform: 'rotateX(5deg)',
        },
        '.rotate-x-90': {
          transform: 'rotateX(90deg)',
        },
        '.blur-xl': {
          filter: 'blur(12px)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config; 
