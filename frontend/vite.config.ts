import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// the manifest file
const manifest:any ={
  registerType: "prompt",
  manifest: {
    name: "Blogspot",
    short_name: "Blogspot",
    description: "An application for blogging",
    icons: [
      
      {
        src: "/blog.png",
        sizes: "65x65",
        type: "image/png",
        purpose:'icon',
      },
      
      {
        src: '/blog.png',
        sizes:'65x65',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: '/blog.png',
        sizes:'65x65',
        type:'image/png',
        purpose:'any maskable icon',
      },
    ],
    theme_color: "#03040c",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),VitePWA(manifest)],
})
