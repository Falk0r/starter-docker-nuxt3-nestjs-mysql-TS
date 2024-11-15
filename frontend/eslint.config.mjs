// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue", "**/*.js"],
    rules: {
      "no-console": 1, // allow console.log in TypeScript files,
      "no-var": 2,
      "quotes": [2, "double"],
    },
  },
);
