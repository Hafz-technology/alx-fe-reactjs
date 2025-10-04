// src/components/AddRecipeForm.jsx
import React, { useState } from 'react';

const AddRecipeForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: '', // Will be processed on submit
    instructions: '', // Will be processed on submit
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  // State for success/submission message
  const [successMessage, setSuccessMessage] = useState('');

  // Universal handler for form input changes








  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value

    // const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear the specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Simple validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Recipe Title is required.';
    if (!formData.summary.trim()) newErrors.summary = 'A short Summary is required.';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required.';
    
    // Check if ingredients field is not empty
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients list is required.';
    }
    
    // Check if instructions field is not empty
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Preparation steps are required.';
    }

    setErrors(newErrors);
    // Return true if the errors object is empty
    return Object.keys(newErrors).length === 0;
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (validate()) {
      // 1. Process data for a more realistic structure (e.g., splitting by newline)
      const newRecipe = {
        id: Date.now(), // Use timestamp for a unique ID
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        image: formData.image.trim(),
        ingredients: formData.ingredients.split('\n').map(item => item.trim()).filter(item => item),
        instructions: formData.instructions.split('\n').map(item => item.trim()).filter(item => item),
      };

      // 2. Here you would typically send 'newRecipe' to an API endpoint.
      console.log('Recipe Data to Submit:', newRecipe);

      // 3. Display success message and reset form
      setSuccessMessage(`Successfully added recipe: ${newRecipe.title}! (Check console for data)`);
      setFormData({
        title: '',
        summary: '',
        image: '',
        ingredients: '',
        instructions: '',
      });
      // In a real app, you might also redirect the user here.
    } else {
      setSuccessMessage('Please correct the errors in the form.');
    }
  };

  // Tailwind classes for input fields and error messages
  const inputClass = (name) => `
    w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 
    transition duration-150 ease-in-out resize-none
    ${errors[name] ? 'border-red-500' : 'border-gray-300'}
  `;
  const errorTextClass = "text-sm text-red-500 mt-1";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-10">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Submit Your Recipe 📝
          </h1>
          <p className="mt-2 text-gray-600">
            Share your culinary creation with our community.
          </p>
        </header>

        {/* Submission Message */}
        {successMessage && (
          <div 
            className={`p-4 mb-6 rounded-lg font-medium ${
              errors.title ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
            role="alert"
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Recipe Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass('title')}
              placeholder="e.g., Simple Chocolate Chip Cookies"
            />
            {errors.title && <p className={errorTextClass}>{errors.title}</p>}
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary" className="block text-lg font-medium text-gray-700 mb-1">
              Short Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              rows="2"
              value={formData.summary}
              onChange={handleChange}
              className={inputClass('summary')}
              placeholder="A brief description of your recipe..."
            />
            {errors.summary && <p className={errorTextClass}>{errors.summary}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={inputClass('image')}
              placeholder="https://example.com/your-dish.jpg"
            />
            {errors.image && <p className={errorTextClass}>{errors.image}</p>}
          </div>

          {/* Ingredients and Instructions - Responsive Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Ingredients */}
            <div>
              <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700 mb-1">
                Ingredients (One per line)
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                rows="8"
                value={formData.ingredients}
                onChange={handleChange}
                className={inputClass('ingredients')}
                placeholder="2 cups all-purpose flour&#10;1 tsp baking soda&#10;1/2 cup butter"
              />
              {errors.ingredients && <p className={errorTextClass}>{errors.ingredients}</p>}
            </div>

            {/* Instructions */}
            <div>
              <label htmlFor="instructions" className="block text-lg font-medium text-gray-700 mb-1">
                Instructions (One step per line)
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows="8"
                value={formData.instructions}
                onChange={handleChange}
                className={inputClass('instructions')}
                placeholder="1. Preheat oven to 375°F&#10;2. Cream butter and sugars&#10;3. Mix dry ingredients..."
              />
              {errors.instructions && <p className={errorTextClass}>{errors.instructions}</p>}
            </div>
            
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="
                w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold 
                hover:bg-indigo-700 transition duration-200 ease-in-out shadow-md
                focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
              "
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;