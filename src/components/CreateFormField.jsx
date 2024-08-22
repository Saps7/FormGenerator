import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import OptionsList from './OptionsList';

const CreateFormField = ({ onAddField, existingFields = [] }) => {
  const [fieldData, setFieldData] = useState({
    label: '',
    formType: '',
    options: [],
    required: false,
    conditionalDisplay: {
      enabled: false,
      dependentOn: '',
      requiredValue: ''
    }
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFieldData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleConditionalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFieldData(prevData => ({
      ...prevData,
      conditionalDisplay: {
        ...prevData.conditionalDisplay,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const validateField = () => {
    let newErrors = {};
    if (!fieldData.label.trim()) {
      newErrors.label = 'Label is required';
    }
    if (!fieldData.formType) {
      newErrors.formType = 'Field type is required';
    }
    if (fieldData.formType === 'dropdown' && fieldData.options.length === 0) {
      newErrors.options = 'At least one option is required for dropdown';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateField()) {
      onAddField(fieldData);
      setFieldData({
        label: '',
        formType: '',
        options: [],
        required: false,
        conditionalDisplay: {
          enabled: false,
          dependentOn: '',
          requiredValue: ''
        }
      });
      setErrors({});
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="label">
        <Form.Label>Field Label:</Form.Label>
        <Form.Control
          type="text"
          name="label"
          value={fieldData.label}
          onChange={handleChange}
          isInvalid={!!errors.label}
        />
        <Form.Control.Feedback type="invalid">{errors.label}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label>Field Type:</Form.Label>
        <Form.Control
          as="select"
          name="formType"
          value={fieldData.formType}
          onChange={handleChange}
          isInvalid={!!errors.formType}
        >
          <option value="">Select a field type</option>
          <option value="text">Text input</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio button</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.formType}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="required">
        <Form.Check
          type="checkbox"
          label="Required field"
          name="required"
          checked={fieldData.required}
          onChange={handleChange}
        />
      </Form.Group>

      {(fieldData.formType === 'dropdown' || fieldData.formType === 'checkbox' || fieldData.formType === 'radio') && (
        <OptionsList
          options={fieldData.options}
          setOptions={(newOptions) => setFieldData({ ...fieldData, options: newOptions })}
        />
      )}
      {errors.options && <div className="text-danger">{errors.options}</div>}

      <Form.Group className="mb-3">
        <Form.Check 
          type="checkbox"
          label="Enable conditional display"
          name="enabled"
          checked={fieldData.conditionalDisplay.enabled}
          onChange={handleConditionalChange}
        />
      </Form.Group>

      {fieldData.conditionalDisplay.enabled && (
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Dependent on field</Form.Label>
              <Form.Select
                name="dependentOn"
                value={fieldData.conditionalDisplay.dependentOn}
                onChange={handleConditionalChange}
              >
                <option value="">Select a field</option>
                {existingFields.map(field => (
                  <option key={field.label} value={field.label}>{field.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Required value</Form.Label>
              <Form.Control
                type="text"
                name="requiredValue"
                value={fieldData.conditionalDisplay.requiredValue}
                onChange={handleConditionalChange}
                placeholder="Enter required value"
              />
            </Form.Group>
          </Col>
        </Row>
      )}

      <Button type="submit">Add Field</Button>
    </Form>
  );
};

export default CreateFormField;