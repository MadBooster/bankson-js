import { defineConfig } from 'eslint/config'
import eslintConfigMadboosterNodeApp from 'eslint-config-madbooster-node-app'

export default defineConfig([
  {
    ignores: ['lib'],
  },
  {
    files: ['src/**/*.{ts,js}'],
    extends: eslintConfigMadboosterNodeApp(import.meta.dirname),
  },
])
