import { JSX } from 'react';
import { Container } from 'react-bootstrap'
// import './App.css';

import Header from '@src/components/Header'
import Footer from '@src/components/Footer'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>It's working!</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
