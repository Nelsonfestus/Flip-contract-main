import { createApp } from 'vinxi'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default createApp({
  server: {
    preset: 'vercel',
  },
  routers: {
    client: {
      type: 'client',
      entry: './src/client.tsx',
      plugins: () => [
        viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
      ],
    },
    ssr: {
      type: 'http',
      entry: './src/ssr.tsx',
      plugins: () => [
        viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
      ],
    },
  },
})
