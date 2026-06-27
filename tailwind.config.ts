import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#101816", concrete: "#f2f0e9", blueprint: "#173f3b", copper: "#b47a45" },
      fontFamily: { sans: ["var(--font-manrope)", "sans-serif"], display: ["var(--font-cormorant)", "serif"] },
      boxShadow: { premium: "0 30px 90px rgba(16, 24, 22, .14)" },
      animation: { "fade-up": "fadeUp .8s cubic-bezier(.2,.7,.2,1) both", "slow-spin": "spin 24s linear infinite" },
      keyframes: { fadeUp: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } } }
    }
  },
  plugins: []
};

export default config;
