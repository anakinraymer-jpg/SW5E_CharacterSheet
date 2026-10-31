import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

// Emits dist/sw.js (scripts/sw-template.js) listing every built file, so the app works offline
// after the first visit. Registered only in production builds (src/serviceWorker.ts).
function offlineServiceWorker(): Plugin {
  return {
    name: 'offline-service-worker',
    apply: 'build',
    generateBundle(_options, bundle) {
      const files = Object.keys(bundle)
        .filter((f) => !f.endsWith('.map') && f !== 'index.html')
        .sort()
      // public/ files aren't in the bundle; add the ones the page loads.
      files.push('favicon.svg')
      const version = createHash('sha256').update(files.join('\n')).digest('hex').slice(0, 12)
      const source = readFileSync('scripts/sw-template.js', 'utf8')
        .replace('"__VERSION__"', JSON.stringify(version))
        .replace('= __FILES__;', `= ${JSON.stringify(files)};`)
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // GitHub Pages serves this repo at /SW5E_CharacterSheet/ (vite preview mirrors it), but keep
  // the dev server at root.
  base: command === 'build' || isPreview ? '/SW5E_CharacterSheet/' : '/',
  plugins: [react(), offlineServiceWorker()],
}))
