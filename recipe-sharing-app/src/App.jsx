import { Routes, Route, useParams } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import './App.css'

function App() {
  return (
    <>
    <div>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
     <div>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id"  element={<RecipeDetailsWrapper />}/>
      </Routes>
     </div>
    </div>
    </>
  );
}

function RecipeDetailsWrapper() {
  const { id } = useParams();
  return <RecipeDetails recipeId={id} />;
}

export default App;