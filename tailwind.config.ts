import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        'surface-container-low': "var(--color-surface-container-low)",
        'surface-container-lowest': "var(--color-surface-container-lowest)",
        'surface-variant': "var(--color-surface-variant)",
        'on-surface': "var(--color-surface)",
        'on-surface-variant': "var(--color-on-surface-variant)",
        outline: "var(--color-outline)",
        'outline-variant': "var(--color-outline-variant)",
        'on-primary': "var(--color-on-primary)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
};
export default config;