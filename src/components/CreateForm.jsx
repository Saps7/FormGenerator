import React, { useState } from 'react';
import CreateFormField from './CreateFormField';
import { useFormContext } from '../context/FormContext';
import { Form, Button, Alert, Card, ListGroup, Badge, Row, Col } from 'react-bootstrap';

const CreateForm = () => {
  const { 
    currentForm, 
    addForm, 
    addFieldToCurrentForm, 
    finishCurrentForm, 
    removeFieldFromCurrentForm,
    removeCurrentForm
  } = useFormContext();
  const [formName, setFormName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setError('Form name is required');
      return;
    }
    addForm(formName);
    setFormName('');
    setError('');
  };

  const handleFinishForm = () => {
    if (currentForm.fields.length === 0) {
      setError('At least one field is required');
      return;
    }
    finishCurrentForm();
    setError('');
  };

  const handleRemoveCurrentForm = () => {
    if (window.confirm('Are you sure you want to remove the current form? This action cannot be undone.')) {
      removeCurrentForm();
      setError('');
    }
  };

  return (
    <div className="d-flex flex-column gap-4 mt-4" style={{ maxWidth: '400px' }}>
      {!currentForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className='mb-3'>
            <Form.Label>Form Name:</Form.Label>
            <Form.Control
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter form name"
              style={{ width: '100%' }}
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit" className='mb-3 mt-3' style={{ width: '100%', textAlign: "center" }}>Create Form</Button>
        </Form>
      )}

      {currentForm && (
        <>
          <h2>Adding fields to: {currentForm.name}</h2>
          <CreateFormField 
            onAddField={addFieldToCurrentForm} 
            existingFields={currentForm.fields || []}
          />
          <Card className="mt-4">
            <Card.Header>
              <h3>Current Form: {currentForm.name}</h3>
            </Card.Header>
            <ListGroup variant="flush">
              {currentForm.fields.map((field, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{field.label}</strong> - {field.formType}
                    {field.required && <Badge bg="danger" className="ms-2">Required</Badge>}
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => removeFieldFromCurrentForm(index)}
                  >
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row className="mt-3">
            <Col>
              <Button onClick={handleFinishForm} variant="primary">Finish Form</Button>
            </Col>
            <Col className="text-end">
              <Button onClick={handleRemoveCurrentForm} variant="danger">Remove Current Form</Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default CreateForm;