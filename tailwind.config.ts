import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        cormorant: ["Cormorant Garamond", ...fontFamily.serif],
        golos: ["Golos Text", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
