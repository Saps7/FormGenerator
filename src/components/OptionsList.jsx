import { useState } from 'react';

const OptionsList = ({ options, setOptions }) => {
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <div>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            {option}
            <button type="button" onClick={() => handleRemoveOption(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Enter new option"
        />
        <button type="button" onClick={handleAddOption}>+ Add another option</button>
      </div>
    </div>
  );
};

export default OptionsList;
