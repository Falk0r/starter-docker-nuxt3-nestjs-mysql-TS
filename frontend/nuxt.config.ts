// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
  css: ["~/assets/css/base.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "nuxt-primevue",
    "@nuxt/eslint",
    "@nuxt/devtools",
  ],
  auth: {
    baseURL: "http://localhost:3500/auth",
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        signUp: { path: "/register", method: "post" },
        getSession: { path: "/session", method: "get" },
      },
      // token: { signInResponseTokenPointer: '/token/accessToken' },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  i18n: {
    debug: false,
    baseUrl: "http://localhost:3000",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en-US.json" },
      { code: "fr", iso: "fr-FR", name: "Français", file: "fr-FR.json" },
    ],
    langDir: "./locales",
    strategy: "prefix_except_default",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
        braceStyle: "1tbs",
      },
      standalone: true,
    },
    checker: true,
  },
  primevue: {
    options: { unstyled: true },
    importPT: { as: "Lara", from: path.resolve(__dirname, "./presets/lara/") },
  },
  tailwindcss: {
    config: {
      content: ["presets/**/*.{js,vue,ts}"],
      theme: {
        extend: {
          colors: {
            "primary-50": "#ecfdf5",
            "primary-100": "#d1fae5",
            "primary-200": "#a7f3d0",
            "primary-300": "#6ee7b7",
            "primary-400": "#34d399",
            "primary-500": "#10b981",
            "primary-600": "#059669",
            "primary-700": "#047857",
            "primary-800": "#065f46",
            "primary-900": "#064e3b",
            "primary-950": "#022c22",
            "surface-0": "#ffffff",
            "surface-50": "#f8fafc",
            "surface-100": "#f1f5f9",
            "surface-200": "#e2e8f0",
            "surface-300": "#cbd5e1",
            "surface-400": "#94a3b8",
            "surface-500": "#64748b",
            "surface-600": "#475569",
            "surface-700": "#334155",
            "surface-800": "#1e293b",
            "surface-900": "#0f172a",
            "surface-950": "#020617",
          },
        },
      },
    },
  },
});
