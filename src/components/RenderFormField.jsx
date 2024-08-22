import React from 'react';
import { Form, Col } from 'react-bootstrap';

export const RenderFormField = (label, fieldType, fieldOptions, required, onChange) => {
  const commonProps = {
    name: label,
    required: required,
    onChange: onChange
  };

  const renderField = () => {
    switch (fieldType) {
      case "text":
        return (
          <Form.Control
            type="text"
            placeholder={`Enter ${label.toLowerCase()}`}
            {...commonProps}
          />
        );
      case "dropdown":
        return (
          <Form.Select {...commonProps}>
            <option value="">Select {label.toLowerCase()}</option>
            {fieldOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        );
      case "radio":
        return (
          <>
            {fieldOptions.map((option) => (
              <Form.Check
                key={option}
                type="radio"
                id={`${label}-${option}`}
                label={option}
                {...commonProps}
                value={option}
              />
            ))}
          </>
        );
      case "checkbox":
        return (
          <>
            {fieldOptions.map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                id={`${label}-${option}`}
                label={option}
                {...commonProps}
                value={option}
              />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Form.Group className="mb-3" controlId={`form${label.replace(/\s+/g, '')}`}>
      <Form.Label>{label}{required && <span className="text-danger">*</span>}</Form.Label>
      {renderField()}
    </Form.Group>
  );
};