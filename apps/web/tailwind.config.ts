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
        paper: {
          canvas: "#FAF7F2",
          surface: "#FFFFFF",
          elevated: "#F4EFE6",
          border: "#E3DCD0",
        },
        ink: {
          primary: "#121417",
          secondary: "#3D434D",
          tertiary: "#6A7280",
        },
        vermilion: {
          primary: "#B83A24",
          hover: "#932714",
          wash: "#F9EDE9",
          border: "#E8B8AE",
        },
        forensic: {
          verified: "#1B5E20",
          verifiedBg: "#EDF7EE",
          partial: "#8C6200",
          partialBg: "#FFF9E6",
          contested: "#B25900",
          contestedBg: "#FFF0E0",
          overruled: "#B71C1C",
          overruledBg: "#FDECEA",
        },
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(18, 20, 23, 0.05)",
        folio: "0 4px 12px rgba(18, 20, 23, 0.08)",
        elevation: "0 8px 24px rgba(18, 20, 23, 0.12)",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
