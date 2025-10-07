import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  const itemStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
    cursor: 'pointer',
    marginRight: '10px',
  };

  return (
    <div data-testid={`todo-item-${todo.id}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <span
        style={itemStyle}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        data-testid={`delete-button-${todo.id}`}
        style={{ marginLeft: 'auto', padding: '5px 10px' }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;