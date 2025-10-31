import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'example',
  resolve: {
    alias: {
      '@trujis/react-pagination': path.resolve(__dirname, 'src'),
    },
  },
});
