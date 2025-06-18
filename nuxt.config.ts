// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    experimental: {
      nativeSqlite: true
    }
  },
  runtimeConfig: {
    public: {
      contentPreviewApi: process.env.NUXT_CONTENT_PREVIEW_API
    }
  },
  css: ['~/assets/css/main.css']
})