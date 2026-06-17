import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import tailwindcss from "@tailwindcss/vite"

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  css: [resolve(currentDir, './app/assets/css/main.css')],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@vueuse/nuxt',
    'shadcn-nuxt'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: resolve(currentDir, './app/components/ui')
  }
})
