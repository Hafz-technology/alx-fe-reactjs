import React, { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New todo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        data-testid="todo-input"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" data-testid="add-button" style={{ padding: '8px 15px' }}>
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;