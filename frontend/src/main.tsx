import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { HelmetProvider } from 'react-helmet-async'
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'
// import '@src/assets/styles/bootstrap.custom.css'
import '@src/assets/styles/index.css'
import './index.css'

import App from '@src/App.tsx'
import HomePage from '@src/pages/HomePage/HomePage'
import ProductPage from '@src/pages/ProductPage/ProductPage'
import CartPage from '@src/pages/CartPage/CartPage'
import LoginPage from '@src/pages/LoginPage/LoginPage'
import RegisterPage from '@src/pages/RegisterPage/RegisterPage'
import ShippingPage from '@src/pages/ShippingPage/ShippingPage'
import PaymentPage from '@src/pages/PaymentPage/PaymentPage'
import PlaceOrderPage from '@src/pages/PlaceOrderPage/PlaceOrderPage'
import OrderPage from '@src/pages/OrderPage/OrderPage'
import ProfilePage from '@src/pages/ProfilePage'
import OrderListPage from '@src/pages/admin/OrderListPage'
import ProductListPage from '@src/pages/admin/ProductListPage'
import ProductEditPage from '@src/pages/admin/ProductEditPage'
import UserListPage from '@src/pages/admin/UserListPage'
import UserEditPage from '@src/pages/admin/UserEditPage'

import PrivateRoute from '@src/components/PrivateRoute'
import AdminRoute from '@src/components/AdminRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route index element={ <HomePage /> } />
      <Route path="/search" element={ <HomePage /> } />
      <Route path="/search/:keyword" element={ <HomePage /> } />
      {/* <Route path="/page/:pageNumber" element={ <HomePage /> } /> */}
      {/* <Route path="/search/:keyword/page/:pageNumber" element={ <HomePage /> } /> */}
      <Route path="/product/:id" element={ <ProductPage /> } />
      <Route path="/cart" element={ <CartPage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/register" element={ <RegisterPage />}  />
      <Route path="" element={ <PrivateRoute /> }>
        <Route path="/shipping" element={ <ShippingPage /> } />
        <Route path="/payment" element={ <PaymentPage /> } />
        <Route path="/placeorder" element={ <PlaceOrderPage />} />
        <Route path="/order/:id" element={ <OrderPage />} />
        <Route path="/profile" element={ <ProfilePage /> } />
      </Route>
      <Route path="" element={ <AdminRoute /> }>
        <Route path="/admin/orderlist" element={ <OrderListPage /> } />
        <Route path="/admin/productlist" element={ <ProductListPage /> } />
        <Route path="/admin/productlist/:pageNumber" element={ <ProductListPage /> } />
        <Route path="/admin/product/:id/edit" element={ <ProductEditPage /> } />
        <Route path="/admin/userlist" element={ <UserListPage /> } />
        <Route path="/admin/user/:id/edit" element={ <UserEditPage /> } />
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true} options={{clientId: "test"}}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
