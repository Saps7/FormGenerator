import { useState } from 'react';
import { ListGroup, Button, InputGroup, FormControl } from 'react-bootstrap';

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
      <ListGroup>
        {options.map((option, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            {option}
            <Button variant="danger" size="sm" onClick={() => handleRemoveOption(index)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <InputGroup className="mt-3">
        <FormControl
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Enter new option"
        />
        <Button variant="primary" onClick={handleAddOption}>+ Add option</Button>
      </InputGroup>
    </div>
  );
};

export default OptionsList;
