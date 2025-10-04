// src/components/RecipeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockRecipes from '../data.json'; // Import the updated mock data

/**
 * Displays the detailed view for a single recipe.
 */
const RecipeDetail = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch recipe data based on ID when the component mounts
  useEffect(() => {
    setLoading(true);
    // Simulate fetching/finding the recipe
    const foundRecipe = mockRecipes.find(r => r.id === parseInt(id));
    
    // Simulate a network delay
    setTimeout(() => {
      setRecipe(foundRecipe);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-indigo-600">Loading Recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Recipe Not Found 😢</h1>
        <p className="text-lg text-gray-700 mb-6">The recipe you are looking for does not exist.</p>
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-800 font-medium mb-6 inline-block transition duration-200"
        >
          &larr; Back to All Recipes
        </Link>
        
        {/* Recipe Header and Image */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-6 sm:p-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
              {recipe.title}
            </h1>
            <p className="text-xl text-gray-600 border-b pb-4 mb-4">
              {recipe.summary}
            </p>
            
            {/* Time Stats */}
            <div className="flex justify-start gap-6 text-sm text-gray-500">
              <span>**Prep Time:** {recipe.prepTime}</span>
              <span>**Cook Time:** {recipe.cookTime}</span>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Ingredients Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4 border-b pb-2">
              Ingredients 🥕
            </h2>
            <ul className="space-y-3 text-lg text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-500 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions Section */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg md:col-span-1">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4 border-b pb-2">
              Instructions 🧑‍🍳
            </h2>
            <ol className="space-y-5 text-lg text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="font-semibold text-indigo-600 text-xl mr-3">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;