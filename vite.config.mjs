import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import dotenv from "dotenv";

// dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  publicDir: "public",
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     // "/api": `http://localhost:${process.env.PORT || 3000}`,
  //   },
  // },
});
