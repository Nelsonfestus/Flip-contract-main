import { createApp } from 'vinxi'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'pathe'

const root = process.cwd()

export default createApp({
  root,
  server: {
    preset: 'vercel',
  },
  routers: [
    {
      name: 'client',
      type: 'client',
      handler: resolve(root, 'src/client.tsx'),
      target: 'browser',
      plugins: () => [
        tanstackStart(),
        viteReact(),
      ],
    },
    {
      name: 'ssr',
      type: 'http',
      handler: resolve(root, 'src/ssr.tsx'),
      target: 'server',
      plugins: () => [
        tanstackStart(),
        viteReact(),
      ],
    },
  ],
})
