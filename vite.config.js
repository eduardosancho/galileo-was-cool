import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/galileo-was-cool/', // Replace with your actual repository name
  publicDir: '../static',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})