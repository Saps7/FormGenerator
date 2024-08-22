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
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border-3 border-primary border"></div>
            <h1 className="text-center mb-4">Form Creator</h1>
            <CreateForm />
            <FormList />
          </Col>
        </Row>
      </Container>
    </FormProvider>
  )
}

export default App