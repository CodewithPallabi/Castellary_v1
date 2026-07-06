import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "keep-primary": "var(--color-keep-primary)",
        "keep-secondary": "var(--color-keep-secondary)",
        "keep-accent": "var(--color-keep-accent)",
        "keep-success": "var(--color-keep-success)",
        "keep-danger": "var(--color-keep-danger)",
        "keep-background": "var(--color-keep-background)",
        "keep-foreground": "var(--color-keep-foreground)",
        "keep-muted": "var(--color-keep-muted)",
        "keep-border": "var(--color-keep-border)",
        "keep-overlay": "var(--color-keep-overlay)",
        "keep-glass": "var(--color-keep-glass)",
      },
      fontFamily: {
        "keep-display": ["var(--font-keep-display)", "sans-serif"],
        "keep-body": ["var(--font-keep-body)", "sans-serif"],
      },
      boxShadow: {
        "keep-cinematic": "0 20px 50px rgba(0, 0, 0, 0.7)",
      },
      backdropBlur: {
        "keep-glass": "16px",
      }
    },
  },
  plugins: [],
} satisfies Config;
