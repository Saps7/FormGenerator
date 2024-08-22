export const validateField = (field, value) => {
  const { label, required, formType, inputType, validation } = field;

  if (required) {
    if (formType === 'file') {
      if (!value) {
        return `${label} is required`;
      }
    } else if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${label} is required`;
    }
  }

  if (value) {
    switch (formType) {
      case 'input':
        switch (inputType) {
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              return 'Please enter a valid email address';
            }
            break;
          case 'tel':
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phoneRegex.test(value)) {
              return 'Please enter a valid phone number';
            }
            break;
          case 'number':
            const numValue = Number(value);
            if (isNaN(numValue)) {
              return 'Please enter a valid number';
            }
            if (validation.minValue && numValue < Number(validation.minValue)) {
              return `Value must be at least ${validation.minValue}`;
            }
            if (validation.maxValue && numValue > Number(validation.maxValue)) {
              return `Value must not exceed ${validation.maxValue}`;
            }
            break;
        }
        break;
      case 'file':
        if (validation.allowedFileTypes) {
          const allowedTypes = validation.allowedFileTypes.split(',').map(type => type.trim().toLowerCase());
          const fileExtension = value.name.split('.').pop().toLowerCase();
          if (!allowedTypes.includes(fileExtension)) {
            return `File type not allowed. Allowed types: ${validation.allowedFileTypes}`;
          }
        }
        if (validation.maxFileSize) {
          const maxSizeInBytes = Number(validation.maxFileSize) * 1024 * 1024; // Convert MB to bytes
          if (value.size > maxSizeInBytes) {
            return `File size exceeds the maximum allowed size of ${validation.maxFileSize} MB`;
          }
        }
        break;
    }
  }

  return '';
};