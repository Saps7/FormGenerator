import React, { useState } from 'react';
import CreateFormField from './CreateFormField';
import { useFormContext } from '../context/FormContext';

const CreateForm = () => {
  const { currentForm, addForm, addFieldToCurrentForm, finishCurrentForm, removeFieldFromCurrentForm } = useFormContext();
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
        <CreateFormField onAddField={addFieldToCurrentForm} />
        <h3>Current Fields</h3>
        {currentForm.fields.map((field, index) => (
          <div key={index}>
            <p>Label: {field.label}, Type: {field.formType}</p>
            <button onClick={() => removeFieldFromCurrentForm(index)}>Delete</button>
          </div>
        ))}
        {error && <p className="error">{error}</p>}
        <button onClick={handleFinishForm}>Finish Form</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Create a New Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="formName">Form Name:</label>
          <input
            type="text"
            id="formName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default CreateForm;