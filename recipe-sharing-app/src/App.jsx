import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';
import { useState } from 'react';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import useRecipeStore from './components/recipeStore';

const App = () => {
  const [view, setView] = useState('list');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const handleSelectRecipe = (id) => {
    setSelectedRecipeId(id);
    setView('details');
  };

  const handleEditRecipe = () => {
    setView('edit');
  };

  const handleGoBack = () => {
    setView('list');
    setSelectedRecipeId(null);
  };

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = () => {
    deleteRecipe(selectedRecipeId);
    handleGoBack();
    setIsConfirmingDelete(false);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleSave = (updatedRecipe) => {
    updateRecipe(updatedRecipe);
    setView('details');
  };

  let content;
  if (view === 'list') {
    content = (
      <>
        <AddRecipeForm />
        <RecipeList onSelectRecipe={handleSelectRecipe} />
      </>
    );
  } else if (view === 'details') {
    content = (
      <RecipeDetails
        recipeId={selectedRecipeId}
        onGoBack={handleGoBack}
        onEdit={handleEditRecipe}
        onDelete={handleDeleteClick}
      />
    );
  } else if (view === 'edit') {
    content = (
      <EditRecipeForm
        recipeId={selectedRecipeId}
        onCancel={handleGoBack}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-200 rounded-xl shadow-2xl p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          My Recipe App
        </h1>
        {content}
        {isConfirmingDelete && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <p className="text-lg font-semibold mb-4">Are you sure you want to delete this recipe?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;