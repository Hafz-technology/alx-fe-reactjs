import React from 'react';
import { useQuery } from '@tanstack/react-query';

// The function that performs the actual data fetching
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    // You could simulate an error here: throw new Error('Forced Error Demonstration');
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  // Destructure the useQuery results, explicitly including isError and isRefetching
  const {
    data: posts,          // The fetched data
    isLoading,         // Boolean: is the query currently fetching for the very first time?
    isError,           // Boolean: did the query fail? (Better than just checking if 'error' exists)
    error,             // The error object if the query failed
    isFetching,        // Boolean: is the query currently fetching (initial, background, or manual)?
    isRefetching,      // Boolean: is the query refetching in the background/manually?
    refetch,           // Function to manually trigger a refetch
  } = useQuery({
    queryKey: ['posts'], // Unique key for caching this query
    queryFn: fetchPosts, // The function to execute
  });

  if (isLoading) {
    // Only shows on the very first mount fetch
    return <div className="loading-state">Loading posts for the first time... ⏳</div>;
  }

  // Use the explicit isError boolean for robust error handling
  if (isError) {
    return <div className="error-state">An error occurred: {error.message} 🛑 Please try again later.</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>
        Fetched Posts ({posts.length}) {isRefetching ? '(Updating...)' : ''}
      </h2>

      {/* Step 3: Refetch Button Implementation */}
      <button 
        onClick={() => refetch()} 
        disabled={isRefetching}
        style={{ padding: '10px 15px', cursor: 'pointer', marginBottom: '20px' }}
      >
        {isRefetching ? 'Refetching...' : 'Manually Refetch Data 🔄'}
      </button>

      {/* Caching Explanation */}
      <p style={{ fontSize: '0.9em', color: '#555', borderLeft: '3px solid #007bff', paddingLeft: '10px' }}>
        **Caching Demonstration:** When the component re-mounts, data loads instantly from the cache. A network request (background refetch) only occurs if the data is considered **stale** (passed the configured time). Watch the network tab!
      </p>

      {/* Data Display */}
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

