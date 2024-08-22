import React, { useState } from 'react';
import OptionsList from './OptionsList';
import { FormProvider } from '../context/FormContext';

const CreateFormField = ({ onAddField }) => {
  const [fieldData, setFieldData] = useState({ label: '', formType: '', options: [] });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData(prevData => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
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
      setFieldData({ label: '', formType: '', options: [] });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="label">Field Label:</label>
        <input
          type="text"
          id="label"
          name="label"
          value={fieldData.label}
          onChange={handleChange}
        />
        {errors.label && <span className="error">{errors.label}</span>}
      </div>
      <div>
        <label htmlFor="formType">Field Type:</label>
        <select
          id="formType"
          name="formType"
          value={fieldData.formType}
          onChange={handleChange}
        >
          <option value="">Select a field type</option>
          <option value="text">Text input</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio button</option>
        </select>
        {errors.formType && <span className="error">{errors.formType}</span>}
      </div>
      {(fieldData.formType === 'dropdown' || fieldData.formType === 'checkbox' || fieldData.formType === 'radio') && (
        <OptionsList
          options={fieldData.options}
          setOptions={(newOptions) => setFieldData({ ...fieldData, options: newOptions })}
        />
      )}
      {errors.options && <span className="error">{errors.options}</span>}
      <button type="submit">Add Field</button>
    </form>
  );
};

export default CreateFormField;