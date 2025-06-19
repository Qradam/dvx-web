export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],
  content: {},
  runtimeConfig: {
    public: {
      contentPreviewApi: process.env.NUXT_CONTENT_PREVIEW_API
    }
  },
  css: ['~/assets/css/main.css']
})
