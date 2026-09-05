import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
//
// The build runs in three stages (see package.json "build"):
//   1. client build            → dist/
//   2. SSR build of entry-server → dist-ssr/  (temporary)
//   3. scripts/prerender.mjs   → static HTML per route, then deletes dist-ssr
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',
  build: isSsrBuild
    ? {
        outDir: 'dist-ssr',
        ssr: 'src/entry-server.jsx',
        emptyOutDir: true,
        // The prerenderer only reads entry-server.js; copying public/ here
        // would just be deleted again with the rest of dist-ssr.
        copyPublicDir: false,
        rollupOptions: {
          output: {
            // Emit one self-contained file. Code-split chunks are what the
            // browser wants, but in the SSR bundle the split dynamic imports
            // never settle under `node`, which leaves the prerenderer hanging
            // on an unresolved top-level await (Node exit code 13).
            inlineDynamicImports: true,
          },
        },
      }
    : {
        outDir: 'dist',
        emptyOutDir: true,
        // Slightly below the default so an inlined asset cannot bloat the
        // entry CSS; the product icons are small but numerous.
        assetsInlineLimit: 2048,
      },
}));
