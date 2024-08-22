import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import FormDisplay from './FormDisplay';

const FormList = () => {
  const { forms, deleteForm } = useFormContext();
  const [selectedForm, setSelectedForm] = useState(null);

  const handleFormClick = (form) => {
    setSelectedForm(form);
  };

  const handleBackToList = () => {
    setSelectedForm(null);
  };

  if (selectedForm) {
    return <FormDisplay form={selectedForm} onBack={handleBackToList} onDelete={deleteForm} />;
  }

  return (
    <Container>
      <h2 className="my-4">Your Forms</h2>
      <Row xs={1} sm={2} md={1} lg={2} className="g-4">
        {forms.map((form) => (
          <Col key={form.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{form.name}</Card.Title>
                <Card.Text>
                  Fields: {form.fields.length}
                </Card.Text>
                <Button variant="primary" onClick={() => handleFormClick(form)}>
                  View Form
                </Button>
                <Button variant="outline-danger" className="ms-2" onClick={() => deleteForm(form.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FormList;