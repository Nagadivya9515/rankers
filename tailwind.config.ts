import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand: Deep Green primary, Gold/Amber accent (RankersPro brochure palette)
        brand: {
          DEFAULT: "#0B4D3A",
          50: "#E8F2EE",
          100: "#C9E0D7",
          200: "#9CC5B3",
          300: "#6EA98F",
          400: "#3F8D6B",
          500: "#0B4D3A",
          600: "#0A4433",
          700: "#08392B",
          800: "#062E22",
          900: "#04221A",
          950: "#02120E",
        },
        gold: {
          DEFAULT: "#C79A3E",
          50: "#FBF6EB",
          100: "#F5E9CC",
          200: "#ECD49D",
          300: "#E2BE6E",
          400: "#D8A950",
          500: "#C79A3E",
          600: "#A87D30",
          700: "#836227",
          800: "#5E461C",
          900: "#392A11",
        },
        cream: "#FBF8F2",
        ink: "#14201C",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        // Depth-system layers: card (resting) -> card-hover (lift) ->
        // elevated (sticky/pinned panels) -> floating (device mockups,
        // popovers) — see app/globals.css §"depth system" for usage.
        card: "0 1px 2px 0 rgba(11,77,58,0.06), 0 4px 16px -4px rgba(11,77,58,0.12)",
        "card-hover":
          "0 2px 4px 0 rgba(11,77,58,0.08), 0 12px 28px -6px rgba(11,77,58,0.18)",
        elevated: "0 8px 30px -4px rgba(11,77,58,0.16), 0 2px 8px -2px rgba(11,77,58,0.08)",
        floating: "0 24px 60px -12px rgba(4,34,26,0.35), 0 8px 24px -8px rgba(4,34,26,0.25)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0B4D3A 0%, #062E22 100%)",
        // Subtle line-grid texture for hero/section backgrounds — paired
        // with the .bg-grid / .bg-grid-brand utilities in globals.css,
        // which set size + opacity per surface (dark vs light).
        grid: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        "grid-brand": "linear-gradient(rgba(11,77,58,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(11,77,58,0.5) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
