import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this repo at /SW5E_CharacterSheet/, but keep the dev server at root.
  base: command === 'build' ? '/SW5E_CharacterSheet/' : '/',
  plugins: [react()],
}))
