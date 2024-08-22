import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import OptionsList from './OptionsList';

const CreateFormField = ({ onAddField, existingFields = [] }) => {
  const [fieldData, setFieldData] = useState({
    label: '',
    formType: '',
    inputType: 'text',
    options: [],
    required: false,
    conditionalDisplay: {
      enabled: false,
      dependentOn: '',
      requiredValue: ''
    },
    validation: {
      minValue: '',
      maxValue: '',
      allowedFileTypes: '',
      maxFileSize: ''
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

  const handleValidationChange = (e) => {
    const { name, value } = e.target;
    setFieldData(prevData => ({
      ...prevData,
      validation: {
        ...prevData.validation,
        [name]: value
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
        inputType: 'text',
        options: [],
        required: false,
        conditionalDisplay: {
          enabled: false,
          dependentOn: '',
          requiredValue: ''
        },
        validation: {
          minValue: '',
          maxValue: '',
          allowedFileTypes: '',
          maxFileSize: ''
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
          <option value="input">Input</option>
          <option value="textarea">Textarea</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio button</option>
          <option value="file">File upload</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{errors.formType}</Form.Control.Feedback>
      </Form.Group>

      {fieldData.formType === 'input' && (
        <Form.Group controlId="inputType">
          <Form.Label>Input Type:</Form.Label>
          <Form.Control
            as="select"
            name="inputType"
            value={fieldData.inputType}
            onChange={handleChange}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="tel">Phone Number</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </Form.Control>
        </Form.Group>
      )}

      {fieldData.formType === 'input' && fieldData.inputType === 'number' && (
        <Row>
          <Col>
            <Form.Group controlId="minValue">
              <Form.Label>Minimum Value:</Form.Label>
              <Form.Control
                type="number"
                name="minValue"
                value={fieldData.validation.minValue}
                onChange={handleValidationChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="maxValue">
              <Form.Label>Maximum Value:</Form.Label>
              <Form.Control
                type="number"
                name="maxValue"
                value={fieldData.validation.maxValue}
                onChange={handleValidationChange}
              />
            </Form.Group>
          </Col>
        </Row>
      )}

      {fieldData.formType === 'file' && (
        <Row>
          <Col>
            <Form.Group controlId="allowedFileTypes">
              <Form.Label>Allowed File Types:</Form.Label>
              <Form.Control
                type="text"
                name="allowedFileTypes"
                value={fieldData.validation.allowedFileTypes}
                onChange={handleValidationChange}
                placeholder="e.g: pdf, doc, docx"
              />
              <Form.Text className="text-muted">
                Enter file extensions separated by commas (e.g: pdf,doc,docx)
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="maxFileSize">
              <Form.Label>Max File Size (in MB):</Form.Label>
              <Form.Control
                type="number"
                name="maxFileSize"
                value={fieldData.validation.maxFileSize}
                onChange={handleValidationChange}
              />
            </Form.Group>
          </Col>
        </Row>
      )}

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