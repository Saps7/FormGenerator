import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { RenderFormField } from './RenderFormField';

const FormCard = ({ form, onDelete }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const shouldDisplayField = (field) => {
    if (!field.conditionalDisplay || !field.conditionalDisplay.enabled) {
      return true;
    }

    const { dependentOn, requiredValue } = field.conditionalDisplay;
    return formValues[dependentOn] === requiredValue;
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <div className="mb-3 mt-4">
          <h2 className="fw-bold text-uppercase mb-2">{form.name}</h2>
          <p className="mb-5">Please fill out the form below:</p>
          <Form className="mb-3">
            {form.fields.map((field, index) => (
              shouldDisplayField(field) && (
                <React.Fragment key={index}>
                  {RenderFormField(field.label, field.formType, field.options, field.required, handleChange)}
                </React.Fragment>
              )
            ))}
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
          <div className="mt-3 text-end">
            <Button variant="outline-danger" onClick={() => onDelete(form.id)}>
              Delete Form
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FormCard;