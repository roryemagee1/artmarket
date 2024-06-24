import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, /*BrowserRouter, Routes,*/ Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'
// import '@src/assets/styles/bootstrap.custom.css'
import '@src/assets/styles/index.css'
// import './index.css'

import App from '@src/App.tsx'
import HomePage from '@src/pages/HomePage'
import ProductPage from '@src/pages/ProductPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route index element={ <HomePage /> } />
      <Route path="product/:id" element={ <ProductPage /> } />
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
