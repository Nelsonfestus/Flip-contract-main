import { createApp } from 'vinxi'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default createApp({
  server: {
    preset: 'vercel',
  },
  routers: [
    {
      name: 'client',
      type: 'spa',
      handler: './src/client.tsx',
      target: 'browser',
      plugins: () => [
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
        tanstackStart(),
        viteReact(),
      ],
    },
  ],
})
