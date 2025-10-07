import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

/**
 * A component to protect routes, redirecting unauthenticated users to the home page.
 */
const ProtectedRoute = ({ children }) => {
  const { user, login, logout } = useAuth();

  if (!user) {
    // If not authenticated, redirect them to the home page
    return (
      <>
        <h1>Access Denied 🔒</h1>
        <p>You must be logged in to view this page.</p>
        {/* A simple button to simulate login */}
        <button onClick={login}>Log In (Simulated)</button>
        <Navigate to="/" replace={true} />
      </>
    );
  }

  // If authenticated, render the protected content (children)
  return (
    <>
      <p>Welcome, **{user.name}**! You are logged in.</p>
      <button onClick={logout}>Log Out</button>
      <hr />
      {children}
    </>
  );
};

export default ProtectedRoute;