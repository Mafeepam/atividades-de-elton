import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * Configuração mínima do Vite.
 * `base: './'` deixa o build funcionar mesmo abrindo o index.html
 * diretamente ou publicando em um subdiretório (GitHub Pages, por exemplo).
 */
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: 5173,
    open: false
  }
});
