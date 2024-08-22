import React from 'react';
import { useFormContext } from '../context/FormContext';
import FormCard from './FormCard';
import './FormStyles.css';

const FormList = () => {
  const { forms, deleteForm } = useFormContext();

  return (
    <div>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} onDelete={deleteForm} />
      ))}
    </div>
  );
};

export default FormList;