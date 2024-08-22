import React, { useState } from 'react';
import CreateFormField from './CreateFormField';
import { useFormContext } from '../context/FormContext';
import { Form, Button, Alert } from 'react-bootstrap';

const CreateForm = () => {
  const { currentForm, addForm, addFieldToCurrentForm, finishCurrentForm } = useFormContext();
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

  if (currentForm) {
    return (
      <div>
        <h2>Adding fields to: {currentForm.name}</h2>
        <CreateFormField 
          onAddField={addFieldToCurrentForm} 
          existingFields={currentForm.fields || []} // Provide an empty array as fallback
        />
        {error && <Alert variant="danger">{error}</Alert>}
        <Button onClick={handleFinishForm}>Finish Form</Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Form Name:</Form.Label>
        <Form.Control
          type="text"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Enter form name"
        />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit">Create Form</Button>
    </Form>
  );
};

export default CreateForm;