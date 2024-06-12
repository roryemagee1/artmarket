import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
// import '@src/assets/styles/bootstrap.custom.css'
import '@src/assets/styles/index.css'
// import './index.css'

import App from '@src/App.tsx'
import HomeScreen from '@src/pages/HomeScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route index element={ <HomeScreen /> } />
    </Route>
  )
)

// const router = (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={ <App /> }>
//         <Route index element={ <HomeScreen /> } />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
