import stylex from '@stylexjs/unplugin/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import relay from 'vite-plugin-relay-lite'
import { defineConfig } from 'vitest/config'

const src = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig(({ mode }) => ({
  plugins: [
    relay({ codegen: false }),
    stylex({
      devMode: mode === 'test' ? 'off' : 'full',
      aliases: { '@src/*': [`${src}/*`] },
      propertyValidationMode: 'throw',
    }),
    react(),
  ],
  test: {
    server: { deps: { inline: [/@graphql-tools/] } },
  },
  resolve: {
    alias: {
      '@src': src,
    },
  },
}))
