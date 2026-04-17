import { createApp } from 'vinxi'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default createApp({
  server: {
    preset: 'vercel',
  },
  routers: [
    {
      name: 'client',
      type: 'client',
      handler: './src/client.tsx',
      target: 'browser',
      plugins: () => [
        tanstackStart(),
        viteReact(),
        tailwindcss(),
      ],
      // Replace vite-tsconfig-paths with a manual alias
      vite: {
        resolve: {
          alias: {
            '@': resolve(__dirname, './src'),
          },
        },
      },
    },
    {
      name: 'ssr',
      type: 'http',
      handler: './src/ssr.tsx',
      target: 'server',
      plugins: () => [
        tanstackStart(),
        viteReact(),
        tailwindcss(),
      ],
      vite: {
        resolve: {
          alias: {
            '@': resolve(__dirname, './src'),
          },
        },
      },
    },
  ],
})
