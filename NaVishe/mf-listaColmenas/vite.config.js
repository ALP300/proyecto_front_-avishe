import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'mf-listaColmenas': path.resolve(__dirname, '../mf-listaColmenas/dist/mf-listaColmenas.es.js'),
      'mf-dashboard': path.resolve(__dirname, '../mf-dashboard/dist/mf-dashboard.es.js'),
    },
  },
});