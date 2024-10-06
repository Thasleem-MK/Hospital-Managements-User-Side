import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Medi-Guide",
        short_name: "Medi-Guide",
        description: "Your App Description",
        theme_color: "#5d4d28",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/favicon.jpeg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/favicon.jpeg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
