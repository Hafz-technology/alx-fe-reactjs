import useRecipeStore from './recipeStore';

const RecipeList = ({ onSelectRecipe }) => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-500 italic">No recipes added yet. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          {recipes.map(recipe => (
            <li key={recipe.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center transition-transform transform hover:scale-105 shadow-sm">
              <div className="cursor-pointer" onClick={() => onSelectRecipe(recipe.id)}>
                <h3 className="text-xl font-semibold text-gray-700">{recipe.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;