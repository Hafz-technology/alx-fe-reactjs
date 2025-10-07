import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Mock Date.now for predictable IDs in the addTodo test
const mockDate = 1678886400000; // Example timestamp
global.Date.now = jest.fn(() => mockDate);

describe('TodoList Component', () => {

  // --- Initial Render Test ---
  test('renders the TodoList component and initial todos', () => {
    render(<TodoList />);

    // Check for the heading
    expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();

    // Check that the initial demo todos are rendered
    expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
    expect(screen.getByText(/Build a Todo App/i)).toBeInTheDocument();
    expect(screen.getByText(/Write Tests/i)).toBeInTheDocument();

    // Check the completed status of the first todo
    const learnReactItem = screen.getByText(/Learn React/i);
    expect(learnReactItem).toHaveStyle('text-decoration: line-through');
  });

  // --- Test Adding Todos ---
  test('allows a user to add a new todo item', async () => {
    render(<TodoList />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const newTodoText = 'Buy groceries';

    // Simulate user typing
    fireEvent.change(input, { target: { value: newTodoText } });
    expect(input.value).toBe(newTodoText);

    // Simulate form submission
    fireEvent.click(addButton);

    // Verify the new todo is in the document
    await waitFor(() => {
      expect(screen.getByText(newTodoText)).toBeInTheDocument();
    });

    // Verify the input is cleared after submission
    expect(input.value).toBe('');

    // Check that the new item is not completed (default state)
    expect(screen.getByText(newTodoText)).not.toHaveStyle('text-decoration: line-through');
  });

  // --- Test Toggling Todos ---
  test('allows a user to toggle a todo item completion status', () => {
    render(<TodoList />);

    const todoToToggle = screen.getByText(/Write Tests/i);
    
    // Initial state: not completed
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');

    // Simulate click to toggle to completed
    fireEvent.click(todoToToggle);
    expect(todoToToggle).toHaveStyle('text-decoration: line-through');

    // Simulate click again to toggle back to not completed
    fireEvent.click(todoToToggle);
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');
  });

  // --- Test Deleting Todos ---
  test('allows a user to delete a todo item', async () => {
    render(<TodoList />);

    const todoToDeleteText = /Build a Todo App/i;
    let todoItem = screen.getByText(todoToDeleteText);
    
    // Check it's initially present
    expect(todoItem).toBeInTheDocument();

    // Find the delete button for this specific todo
    const initialTodoId = 2; // Based on the initialTodos static array
    const deleteButton = screen.getByTestId(`delete-button-${initialTodoId}`);

    // Simulate click on the delete button
    fireEvent.click(deleteButton);

    // Verify the todo item is no longer in the document
    await waitFor(() => {
      expect(screen.queryByText(todoToDeleteText)).not.toBeInTheDocument();
    });
  });
});


// Checks for the implementation of the testing component