import { JSX } from 'react';
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from '@src/components/Header/Header'
import Footer from '@src/components/Footer/Footer'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main className="app">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
