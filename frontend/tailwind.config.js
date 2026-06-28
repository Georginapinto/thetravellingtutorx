/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["Caveat", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: {
          pink: "#E11D67",
          pinkDeep: "#C0145A",
          pinkSoft: "#FCE2EC",
          pinkPastel: "#FBD0DD",
          sage: "#A8B89A",
          sageDeep: "#7E9B79",
          sageSoft: "#E3EAD9",
          warmWhite: "#FBF7F2",
          ink: "#2A1F26",
          mute: "#6B5E62",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(43,18,30,0.06)",
        medium: "0 14px 40px rgba(43,18,30,0.10)",
        hover: "0 22px 50px rgba(43,18,30,0.14)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        floaty: "floaty 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
