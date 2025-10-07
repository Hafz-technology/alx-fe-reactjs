import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; 
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile'; // Nested Parent
import ProfileDetails from './pages/ProfileDetails'; 
import ProfileSettings from './pages/ProfileSettings'; 
import Post from './pages/Post'; 

const App = () => {
  return (
    <Routes>
      {/* Route for the Layout, acting as a container for all subsequent routes */}
      <Route path="/" element={<Layout />}> 
        
        {/* Basic Routes */}
        <Route index element={<Home />} /> {/* Renders at / */}
        <Route path="about" element={<About />} /> 

        {/* Dynamic Route: path uses a colon (:) to define a parameter */}
        <Route path="post/:postId" element={<Post />} /> 

        {/* Protected Route: Wraps the Profile parent component (Step 3) */}
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes: The path is relative to the parent route "/profile" */}
          {/* To render a component when only the parent path is matched, use index */}
          <Route index element={<h3>Select a profile section above.</h3>} /> 
          <Route path="details" element={<ProfileDetails />} /> 
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;


