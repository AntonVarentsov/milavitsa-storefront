import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "361px",
      sm: "760px",
      md: "1024px",
      lg: "1200px",
      xl: "1440px",
      "2xl": "1600px",
      "3xl": "1920px",
    },

    fontSize: {
      "2xs": ["10px", { lineHeight: "13px", letterSpacing: "0.03em" }],
      xs: ["12px", { lineHeight: "15px", letterSpacing: "0.02em" }],
      sm: ["14px", { lineHeight: "18px" }],
      base: ["16px", { lineHeight: "21px" }],
      lg: ["18px", { lineHeight: "23.4px" }],
      xl: ["24px", { lineHeight: "28px" }],
      "2xl": ["32px", { lineHeight: "35px" }],
      "3xl": ["2rem", { lineHeight: "2.5rem" }],
    },

    fontWeight: {
      thin: "100",
      light: "300",
      normal: "400",
      bold: "700",
      black: "900",
    },

    extend: {
      colors: {
        brand: {
          red: "#C82230",
          "red-light": "#ED1A3B",
          velvet: "#9B1F2A",
          gold: "#C49B6D",
          "gold-light": "#E5D6BD",
        },
        ink: {
          DEFAULT: "#221F20",
          "50": "rgba(34, 31, 32, 0.50)",
          "25": "rgba(34, 31, 32, 0.25)",
          "20": "rgba(34, 31, 32, 0.20)",
        },
        surface: {
          DEFAULT: "#FEFEFE",
          cream: "#EFE8E2",
          silk: "#F7F2EC",
          disabled: "#E5DDD3",
          muted: "#F3F5F7",
        },
        feedback: {
          error: "#C82230",
          success: "#669F48",
        },
        "red-15": "rgba(200, 34, 48, 0.15)",
        "red-30": "rgba(200, 34, 48, 0.30)",
        "cream-65": "rgba(239, 232, 226, 0.65)",
        "white-65": "rgba(254, 254, 254, 0.65)",
        "white-80": "rgba(254, 254, 254, 0.80)",
        "ink-overlay": "rgba(34, 31, 32, 0.20)",
        // Совместимость с Medusa UI preset (используется в cart/checkout)
        grey: {
          "0": "#FFFFFF",
          "5": "#F9FAFB",
          "10": "#F3F4F6",
          "20": "#E5E7EB",
          "30": "#D1D5DB",
          "40": "#9CA3AF",
          "50": "#6B7280",
          "60": "#4B5563",
          "70": "#374151",
          "80": "#1F2937",
          "90": "#111827",
        },
      },

      fontFamily: {
        sans: ['"TT Drugs"', "Arial", "sans-serif"],
        display: ['"TT Drugs"', "Verdana", "sans-serif"],
      },

      letterSpacing: {
        tight: "0.02em",
        wide: "0.03em",
      },

      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "8px",
        full: "9999px",
        // legacy aliases
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },

      boxShadow: {
        dropdown: "0 0 16px rgba(34, 31, 32, 0.10)",
        soft: "0 4px 20px -2px rgba(34, 31, 32, 0.08)",
        elegant: "0 20px 50px -12px rgba(200, 34, 48, 0.25)",
      },

      transitionTimingFunction: {
        soft: "cubic-bezier(0.39, 0.575, 0.565, 1)",
      },
      transitionDuration: {
        "100": "100ms",
        "150": "150ms",
        "300": "300ms",
      },

      aspectRatio: {
        product: "2 / 3",
      },

      spacing: {
        "header-h": "60px",
        "header-h-with-notif": "92px",
        "header-h-mobile": "50px",
        "header-h-mobile-notif": "86px",
        "notif-h": "32px",
        "notif-h-mobile": "36px",
        "sidebar-w": "400px",
        "popup-w": "540px",
      },

      maxWidth: {
        "8xl": "100rem",
      },

      backgroundImage: {
        "header-overlay":
          "linear-gradient(180deg, rgba(16,16,16,0.68) 0%, rgba(16,16,16,0) 100%)",
        "slide-overlay":
          "linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.15) 100%)",
        "gradient-primary":
          "linear-gradient(135deg, #C82230 0%, #9B1F2A 100%)",
      },

      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },

      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-top": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-top": {
          "0%": { height: "100%" },
          "99%": { height: "0" },
          "100%": { visibility: "hidden" },
        },
        "accordion-slide-up": {
          "0%": { height: "var(--radix-accordion-content-height)", opacity: "1" },
          "100%": { height: "0", opacity: "0" },
        },
        "accordion-slide-down": {
          "0%": { "min-height": "0", "max-height": "0", opacity: "0" },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right": "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top": "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open": "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close": "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) forwards",
        "slide-out-right": "slide-out-right 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}

export default config
