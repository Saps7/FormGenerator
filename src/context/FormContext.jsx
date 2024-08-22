import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import PropTypes from 'prop-types';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useLocalStorage('forms', []);
  const [currentForm, setCurrentForm] = useState(null);

  const addForm = (formName) => {
    const newForm = { id: Date.now(), name: formName, fields: [] };
    setCurrentForm(newForm);
  };

  const addFieldToCurrentForm = (field) => {
    if (currentForm) {
      setCurrentForm(prevForm => ({
        ...prevForm,
        fields: [...prevForm.fields, field]
      }));
    }
  };

  const removeFieldFromCurrentForm = (index) => {
    if (currentForm) {
      setCurrentForm(prevForm => ({
        ...prevForm,
        fields: prevForm.fields.filter((_, i) => i !== index)
      }));
    }
  };

  const finishCurrentForm = () => {
    if (currentForm) {
      setForms(prevForms => [...prevForms, currentForm]);
      setCurrentForm(null);
    }
  };

  const deleteForm = (formId) => {
    setForms(prevForms => prevForms.filter(form => form.id !== formId));
  };

  // New function to remove the current form
  const removeCurrentForm = () => {
    setCurrentForm(null);
  };

  return (
    <FormContext.Provider value={{
      forms,
      currentForm,
      addForm,
      addFieldToCurrentForm,
      removeFieldFromCurrentForm,
      finishCurrentForm,
      deleteForm,
      removeCurrentForm // Add this new function to the context
    }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFormContext = () => useContext(FormContext);