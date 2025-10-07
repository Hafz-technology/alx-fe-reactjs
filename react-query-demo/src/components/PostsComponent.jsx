// import react from 'react';
import { useQuery } from '@tanstack/react-query';

// The function that performs the actual data fetching
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Use the useQuery hook for fetching, caching, and state management
  const {
    data: posts, // The fetched data
    isLoading, // Boolean: is the query currently fetching for the first time?
    isFetching, // Boolean: is the query currently refetching in the background?
    error, // The error object if the query failed
    refetch, // Function to manually trigger a refetch
  } = useQuery({
    queryKey: ['posts'], // Unique key for caching this query
    queryFn: fetchPosts, // The function to execute
  });

  if (isLoading) {
    return <div className="loading-state">Loading posts... ⏳</div>;
  }

  if (error) {
    return <div className="error-state">An error occurred: {error.message} 🛑</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>
        Fetched Posts ({posts.length}) {isFetching ? '(Updating...)' : ''}
      </h2>

      {/* Step 3: Refetch Button Implementation */}
      <button 
        onClick={() => refetch()} 
        disabled={isFetching}
        style={{ padding: '10px 15px', cursor: 'pointer', marginBottom: '20px' }}
      >
        {isFetching ? 'Refetching...' : 'Manually Refetch Data 🔄'}
      </button>

      {/* Data Caching/Display */}
      <p>
        **Note on Caching:** Navigate away (e.g., render another component) and come back. If you return within the configured `staleTime` (5 mins in this setup), the data will be shown **instantly** from the cache, and a background fetch will *only* occur if the data is stale. Check your Network tab to confirm the lack of an immediate API call upon re-mount.
      </p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
            <strong>{post.title}</strong>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
      <p>... displaying only the first 5 posts.</p>
    </div>
  );
};

export default PostsComponent;

