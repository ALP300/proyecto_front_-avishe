import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mf_login",
      filename: "remoteEntry.js", // Nombre del archivo esperado
      exposes: {
        "./Login": "./src/Login.jsx", // Asegúrate de que este archivo exista
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  // En el vite.config.js del remoto
  server: {
    port: 5001,
    host: "0.0.0.0", // Expone el servidor más allá de localhost
    cors: true,
  },
  build: {
    target: "esnext",
  },
});
