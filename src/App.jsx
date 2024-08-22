import React from 'react'
import CreateForm from './components/CreateForm'
import FormList from './components/FormList'
import { FormProvider } from './context/FormContext'
import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <FormProvider>
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="text-center">Form Creator</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <CreateForm />
          </Col>
          <Col md={6}>
            <FormList />
          </Col>
        </Row>
      </Container>
    </FormProvider>
  )
}

export default App