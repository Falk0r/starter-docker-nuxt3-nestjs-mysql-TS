import type { Config } from 'tailwindcss'

export default {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

