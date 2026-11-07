import stylex from '@stylexjs/unplugin/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import relay from 'vite-plugin-relay-lite'

const src = fileURLToPath(new URL('./src', import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    relay(),
    stylex({
      devMode: mode === 'test' ? 'off' : 'full',
      aliases: { '@src/*': [`${src}/*`] },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@src': src,
    },
  },
}))
