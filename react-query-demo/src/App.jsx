// import react from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './App.css';

// 1. Initialize the QueryClient
const queryClient = new QueryClient({
  // Optional: Configure default options for the queries
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Unused data is removed from cache after 10 minutes
    },
  },
});

function App() {
  return (
    // 2. Wrap the application with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>React Query Posts Demo</h1>
        <p>Using React Query for advanced data handling, caching, and updates.</p>
        <hr />
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App;