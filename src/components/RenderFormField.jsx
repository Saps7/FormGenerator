import React from 'react';
import { Form, Col } from 'react-bootstrap';

export const RenderFormField = (field, value, onChange, onBlur, error) => {
  const { label, formType, inputType, options, required, validation } = field;

  const commonProps = {
    name: label,
    required: required,
    onChange: onChange,
    onBlur: onBlur,
    isInvalid: !!error
  };

  const renderField = () => {
    switch (formType) {
      case "dropdown":
        return (
          <Form.Select value={value || ''} {...commonProps}>
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        );
      case "radio":
        return (
          <>
            {options.map((option) => (
              <Form.Check
                key={option}
                type="radio"
                id={`${label}-${option}`}
                label={option}
                checked={value === option}
                {...commonProps}
                value={option}
              />
            ))}
          </>
        );
      case "checkbox":
        return (
          <>
            {options.map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                id={`${label}-${option}`}
                label={option}
                checked={value && value.includes(option)}
                {...commonProps}
                value={option}
              />
            ))}
          </>
        );
      case "file":
        return (
          <>
            <Form.Control
              type="file"
              {...commonProps}
              accept={validation.allowedFileTypes}
              onChange={(e) => {
                onChange(e);
                onBlur();
              }}
            />
            {value && <Form.Text className="text-muted">Selected file: {value.name}</Form.Text>}
          </>
        );
      case "textarea":
        return (
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value || ''}
            {...commonProps}
          />
        );
      case "input":
        return (
          <Form.Control
            type={inputType}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value || ''}
            {...commonProps}
            {...(inputType === 'number' && {
              min: validation.minValue,
              max: validation.maxValue
            })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form.Group className="mb-3" controlId={`form${label.replace(/\s+/g, '')}`}>
      <Form.Label>{label}{required && <span className="text-danger">*</span>}</Form.Label>
      {renderField()}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      {formType === 'file' && validation.maxFileSize && (
        <Form.Text className="text-muted">
          Maximum file size: {validation.maxFileSize} MB
        </Form.Text>
      )}
    </Form.Group>
  );
};