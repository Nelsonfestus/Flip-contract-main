import { createApp } from 'vinxi'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'pathe'

const root = process.cwd()

// Dedicated plugin to force-inject the alias
const aliasPlugin = () => ({
  name: 'force-alias',
  config: () => ({
    resolve: {
      alias: {
        '@': resolve(root, 'src'),
      },
    },
  }),
})

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
        aliasPlugin(),
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
        aliasPlugin(),
      ],
    },
  ],
})
