// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  ssr: false,
  srcDir: "./",
  spaLoadingTemplate: "spa-loading-template.html",
  modules: [
    [
      "@nuxtjs/i18n",
      {
        /* module options */
      },
    ],
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
  ],
  auth: {
    provider: {
      type: "local",
      pages: {
        login: "/login",
      },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
    baseURL: "http://localhost:3500/auth",
  },
});
