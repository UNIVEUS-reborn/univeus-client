import stylex from '@stylexjs/unplugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import relay from 'vite-plugin-relay-lite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [relay(), stylex({ devMode: mode === 'test' ? 'off' : 'full' }), react()],
}))
