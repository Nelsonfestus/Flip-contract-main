import { createApp } from 'vinxi'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

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
        viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
      ],
    },
    {
      name: 'ssr',
      type: 'http',
      handler: './src/ssr.tsx',
      target: 'server',
      plugins: () => [
        viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
      ],
    },
  ],
})
