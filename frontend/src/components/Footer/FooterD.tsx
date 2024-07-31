import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>&#169; {currentYear}  Audasite LLC. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}