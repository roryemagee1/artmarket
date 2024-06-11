import { JSX } from 'react';
import { Container } from 'react-bootstrap'
// import './App.css';

import Header from '@src/components/Header'
import Footer from '@src/components/Footer'
import HomeScreen from '@src/pages/HomeScreen'

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
