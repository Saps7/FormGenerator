import React from 'react';
import { Container, Button } from 'react-bootstrap';
import FormCard from './FormCard';

const FormDisplay = ({ form, onBack, onDelete }) => {
  return (
    <Container>
      <Button variant="secondary" onClick={onBack} className="my-3">
        Back to Form List
      </Button>
      <FormCard form={form} onDelete={onDelete} onBack={onBack} />
    </Container>
  );
};

export default FormDisplay;