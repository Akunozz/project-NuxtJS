// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'shadcn-nuxt'],
  alias: {
    '#tailwind-config': './tailwind.config.js'
  },
  colorMode: {
    classSuffix: "",
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  app: {
    head: {
      script: [
        { src: 'https://unpkg.com/flowbite@latest/dist/flowbite.js', defer: true }
      ]
    }
  },
})
