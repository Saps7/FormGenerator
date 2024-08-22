import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import PropTypes from 'prop-types';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useLocalStorage('forms', []);
  const [currentForm, setCurrentForm] = useLocalStorage('currentForm', null);

  const addForm = (formName) => {
    const newForm = { id: Date.now(), name: formName, fields: [] };
    setForms([...forms, newForm]);
    setCurrentForm(newForm);
  };

  const addFieldToCurrentForm = (field) => {
    if (currentForm) {
      const updatedFields = [...currentForm.fields, field];
      const updatedCurrentForm = { ...currentForm, fields: updatedFields };
      setCurrentForm(updatedCurrentForm);
      
      setForms(prevForms => 
        prevForms.map(form => 
          form.id === currentForm.id ? updatedCurrentForm : form
        )
      );
    }
  };

  const removeFieldFromCurrentForm = (index) => {
    if (currentForm) {
      const updatedFields = currentForm.fields.filter((_, i) => i !== index);
      const updatedCurrentForm = { ...currentForm, fields: updatedFields };
      setCurrentForm(updatedCurrentForm);
      
      setForms(prevForms => 
        prevForms.map(form => 
          form.id === currentForm.id ? updatedCurrentForm : form
        )
      );
    }
  };

  const deleteForm = (formId) => {
    setForms(prevForms => prevForms.filter(form => form.id !== formId));
    if (currentForm && currentForm.id === formId) {
      setCurrentForm(null);
    }
  };

  const finishCurrentForm = () => {
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
      deleteForm
    }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFormContext = () => useContext(FormContext);