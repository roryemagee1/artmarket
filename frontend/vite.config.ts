import { defineConfig, /*loadEnv*/ } from 'vite'
import react from '@vitejs/plugin-react'

// For information about setting up a proxy server with vite:
// https://stackoverflow.com/questions/72266050/vite-react-proxy-sends-requests-to-different-endpoints-depending-on-current-loca

export default defineConfig({ 
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": 'http://localhost:3000',
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

// export default defineConfig(({ mode }) => {
//   // const env = loadEnv(mode, process.cwd(), "");
//   return {
//     // define: {
//     //   "process.env.PAYPAL_CLIENT_ID" : JSON.stringify(env.PAYPAL_CLIENT_ID)
//     // },
//     plugins: [react()],
//     server: {
//       proxy: {
//         "/api": {
//           target: "http://localhost:3000",
//           changeOrigin: true,
//           secure: false,
//         },
//         "/uploads": 'http://localhost:3000',
//       }
//     },
//     resolve: {
//       alias: {
//         "@src": "/src",
//       }
//     }
//   }   
// })
