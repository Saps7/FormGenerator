export const RenderFormField = (label, fieldType, fieldOptions) => {
    if (fieldType.type === "text") {
      return (
        <>
          <input
            type="text"
            id={label}
            name={label}
            required={fieldType.required}
          />
          <label htmlFor={label}>{label}</label>
        </>
      );
    } else if (fieldType.type === "dropdown") {
      return (
        <div>
          <label htmlFor={label}>Select a {label}</label>
          <select
            style={{ marginBottom: "20px" }}
            id={label}
            name={label}
            required={fieldType.required}
          >
            <option value="">Select a {label}</option>
            {fieldOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (fieldType.type === "radio") {
      return (
        <div>
          <input
            type="radio"
            id={label}
            name={label}
            value={fieldType.label}
          />
          <label htmlFor={label}>{fieldType.label}</label>
        </div>
      );
    } else if (fieldType.type === "email") {
      return (
        <>
          <input
            type="email"
            id={label}
            name={label}
            required={fieldType.required}
          />
          <label htmlFor={label}>{label}</label>
        </>
      );
    }
  };