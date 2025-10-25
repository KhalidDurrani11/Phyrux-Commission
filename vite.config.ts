import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        viteImagemin({
          gifsicle: { optimizationLevel: 7, interlaced: false },
          optipng: { optimizationLevel: 7 },
          mozjpeg: { quality: 75, progressive: true },
          pngquant: { quality: [0.65, 0.90], speed: 4 },
          svgo: { 
            plugins: [
              { name: 'removeViewBox', active: false },
              { name: 'removeEmptyAttrs', active: true }
            ]
          },
          webp: { quality: 75 }
        })
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
            },
          },
        },
        cssCodeSplit: true,
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 2,
            pure_funcs: ['console.log', 'console.info'],
          },
          mangle: {
            safari10: true,
          },
          format: {
            comments: false,
          },
        },
        chunkSizeWarningLimit: 1000,
        reportCompressedSize: false,
        sourcemap: false,
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      optimizeDeps: {
        include: ['react', 'react-dom'],
      }
    };
});
