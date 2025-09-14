import React, { useState } from 'react';
import useRecipeStore from './recipeStore'; // Corrected file path

const EditRecipeForm = ({ recipeId, onCancel, onSave }) => {
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(r => r.id === recipeId);

  const [title, setTitle] = useState(recipe?.title || '');
  const [description, setDescription] = useState(recipe?.description || '');

  if (!recipe) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Recipe not found</h2>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
        >
          Go Back to List
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onSave({ ...recipe, title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Recipe</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          className="p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          required
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors shadow-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditRecipeForm;