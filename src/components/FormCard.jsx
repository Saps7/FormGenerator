import React, { useState } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import { RenderFormField } from './RenderFormField';
import { validateField } from '../utils/validationUtils';

const FormCard = ({ form, onDelete }) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' 
        ? checked 
          ? [...(prevValues[name] || []), value]
          : (prevValues[name] || []).filter(v => v !== value)
        : type === 'file'
          ? files[0]
          : value
    }));
  };

  const handleBlur = (field) => {
    const error = validateField(field, formValues[field.label]);
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [field.label]: error
    }));
  };

  const shouldDisplayField = (field) => {
    if (!field.conditionalDisplay || !field.conditionalDisplay.enabled) {
      return true;
    }

    const { dependentOn, requiredValue } = field.conditionalDisplay;
    return formValues[dependentOn] === requiredValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    form.fields.forEach(field => {
      const error = validateField(field, formValues[field.label]);
      if (error) {
        errors[field.label] = error;
      }
    });

    if (Object.keys(errors).length === 0) {
      setShowSubmitModal(true);
    } else {
      setFormErrors(errors);
    }
  };

  const handleCloseSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const handleShowJsonModal = () => {
    setShowJsonModal(true);
  };

  const handleCloseJsonModal = () => {
    setShowJsonModal(false);
  };

  const renderFormData = () => {
    return form.fields.map(field => {
      const value = formValues[field.label];
      if (field.formType === 'file' && value) {
        return (
          <p key={field.label}>
            <strong>{field.label}:</strong> {value.name} ({(value.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        );
      }
      return (
        <p key={field.label}>
          <strong>{field.label}:</strong> {Array.isArray(value) ? value.join(', ') : value}
        </p>
      );
    });
  };

  const getFormDataJson = () => {
    const jsonData = {
      id: form.id,
      name: form.name,
      fields: form.fields.map(field => ({
        label: field.label,
        formType: field.formType,
        inputType: field.inputType,
        options: field.options,
        required: field.required,
        conditionalDisplay: field.conditionalDisplay,
        validation: field.validation
      }))
    };
    return JSON.stringify(jsonData, null, 2);
  };

  return (
    <>
      <Card className="shadow">
        <Card.Body>
          <div className="mb-3 mt-4">
            <h2 className="fw-bold text-uppercase mb-2">{form.name}</h2>
            <p className="mb-5">Please fill out the form below:</p>
            <Form onSubmit={handleSubmit}>
              {form.fields.map((field, index) => (
                shouldDisplayField(field) && (
                  <React.Fragment key={index}>
                    {RenderFormField(
                      field, 
                      formValues[field.label], 
                      handleChange, 
                      () => handleBlur(field),
                      formErrors[field.label]
                    )}
                  </React.Fragment>
                )
              ))}
              <div className="d-grid gap-2">
                <Button variant="secondary" onClick={handleShowJsonModal}>
                  View JSON Configuration
                </Button>
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

      <Modal show={showSubmitModal} onHide={handleCloseSubmitModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Successfully Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Form Data:</h4>
          {renderFormData()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSubmitModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showJsonModal} onHide={handleCloseJsonModal}>
        <Modal.Header closeButton>
          <Modal.Title>Form Configuration JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{getFormDataJson()}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseJsonModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormCard;