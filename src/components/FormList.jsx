import React from 'react';
import { useFormContext } from '../context/FormContext';

const FormList = () => {
  const { forms, deleteForm } = useFormContext();

  return (
    <div>
      <h2>Created Forms</h2>
      {forms.map((form, index) => (
        <div key={index} className="created-form">
          <h3>{form.name}</h3>
          <p>Fields: {form.fields.length}</p>
          <button onClick={() => deleteForm(form.id)}>Delete Form</button>
          {form.fields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="form-field">
              <p>Label: {field.label}</p>
              <p>Type: {field.formType}</p>
              {field.formType === 'dropdown' && (
                <ul>
                  {field.options.map((option, optionIndex) => (
                    <li key={optionIndex}>{option}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FormList;