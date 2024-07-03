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
import CartPage from '@src/pages/CartPage'
import LoginPage from '@src/pages/LoginPage'
import RegisterPage from '@src/pages/RegisterPage'
import ShippingPage from '@src/pages/ShippingPage'
import PrivateRoute from '@src/components/PrivateRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route index element={ <HomePage /> } />
      <Route path="product/:id" element={ <ProductPage /> } />
      <Route path="cart" element={ <CartPage /> } />
      <Route path="login" element={ <LoginPage /> } />
      <Route path="register" element={ <RegisterPage />}  />
      <Route path="" element={ <PrivateRoute /> }>
        <Route path="shipping" element={ <ShippingPage /> } />
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
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
