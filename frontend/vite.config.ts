import { defineConfig, /*loadEnv*/ } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ 
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      "@src": "/src",
    }
  }
})

// In the event that the process.env information must be available on the frontend, use the following solution found here:
// https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg

// https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return { 
//     define: {
//       'process.env': env,
//     },
//     plugins: [react()],
//     server: {
//       proxy: {
//         "/api": {
//           target: "http://localhost:3000",
//           changeOrigin: true,
//           secure: false,
//         }
//       }
//     },
//     resolve: {
//       alias: {
//         "@src": "/src",
//       }
//     }
//   }
// })
