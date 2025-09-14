import React from 'react';
import useRecipeStore from './recipeStore';

const RecipeDetails = ({ recipeId, onGoBack, onEdit, onDelete }) => {
  const recipes = useRecipeStore(state => state.recipes);
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Recipe not found</h2>
        <button
          onClick={onGoBack}
          className="bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
        >
          Go Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onGoBack}
          className="bg-gray-400 text-white p-2 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
        >
          &larr; Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="text-gray-700 leading-relaxed">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="whitespace-pre-wrap">{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;