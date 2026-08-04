import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The Docker/nginx build and local dev both serve the site from the
  // domain root ("/"), so the base only changes to "/osnel-portfolio/"
  // when the GitHub Pages workflow sets GITHUB_PAGES=true before building.
  // This keeps `docker compose up` and `npm run dev` working exactly as
  // before — only the GitHub Pages deploy is affected.
  base: process.env.GITHUB_PAGES ? '/osnel-portfolio/' : '/',
  plugins: [react()],
})
