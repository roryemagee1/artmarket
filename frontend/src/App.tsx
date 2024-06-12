import { JSX } from 'react';
import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
// import './App.css';

import Header from '@src/components/Header'
import Footer from '@src/components/Footer'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
