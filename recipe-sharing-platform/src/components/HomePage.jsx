import React, { useState, useEffect } from 'react';
import mockRecipes from '../data.json'; 
// import { useParams, Link } from 'react-router-dom';

const HomePage = () => {

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(true);

  // useEffect to simulate data fetching when the component mounts
  useEffect(() => {
    // Simulate a network delay for fetching data
    const fetchRecipes = async () => {
      try {
        setLoading(true);
       
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        setRecipes(mockRecipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-indigo-600">Loading Recipes...</div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Recipe Platform 🍽️</h1>
        <p className="text-lg text-gray-600">No recipes found. Time to add some!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome to the Recipe Hub!
        </h1>
        <p className="mt-3 text-xl text-gray-600">
          Discover your next favorite meal from our community's best recipes.
        </p>
      </header>

      {/* Responsive Grid Layout:
        - mobile (default): 1 column (grid-cols-1)
        - small screens (sm): 2 columns (sm:grid-cols-2)
        - large screens (lg): 3 columns (lg:grid-cols-3)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="
              bg-white rounded-xl shadow-lg overflow-hidden flex flex-col 
              hover:shadow-2xl transition duration-300 ease-in-out 
              hover:scale-[1.02] transform 
            "
          >
            {/* Recipe Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 flex-grow mb-4">
                {recipe.summary}
              </p>

              {/* View Detail Link/Button */}
              <a
                href={`/recipe/${recipe.id}`} // Placeholder link for detail view
                className="
                  mt-auto inline-block text-center bg-indigo-600 text-white font-semibold 
                  py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 
                  transition duration-200 ease-in-out
                "
              >
                View Recipe Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;