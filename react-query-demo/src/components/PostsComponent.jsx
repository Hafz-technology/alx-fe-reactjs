import React from 'react';
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
  // Destructure the useQuery results
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isRefetching,
    refetch,
    // Note: isFetching will be true for any fetch, including initial load
  } = useQuery({
    queryKey: ['posts'], // Unique key for caching this query
    queryFn: fetchPosts, // The function to execute
    
    // --- Local Configuration for Advanced Features ---
    
    // 1. staleTime: How long data stays 'fresh'. 
    //    If fresh (e.g., 30s), component re-mounts will NOT trigger a background fetch.
    staleTime: 1000 * 30, // Local override: data is fresh for 30 seconds
    
    // 2. cacheTime: How long inactive/unused data is kept in the cache before garbage collection.
    //    Should usually be longer than staleTime.
    cacheTime: 1000 * 60 * 5, // Local override: garbage collect after 5 minutes of inactivity

    // 3. refetchOnWindowFocus: Automatically refetch when the browser window regains focus.
    refetchOnWindowFocus: true, // Boolean: Re-fetches data when the user focuses the window

    // 4. keepPreviousData: While fetching new data, the component continues to show the old data.
    //    (Useful mainly for pagination/filters, but demonstrated here)
    //    *Note: In v5, this is named 'placeholderData'*
    keepPreviousData: false, // Keep the old data displayed while fetching new data

    // --------------------------------------------------
  });

  if (isLoading) {
    return <div className="loading-state">Loading posts for the first time... ⏳</div>;
  }

  if (isError) {
    return <div className="error-state">An error occurred: {error.message} 🛑 Please try again later.</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>
        Fetched Posts ({posts.length}) {isRefetching ? '(Updating...)' : ''}
      </h2>

      {/* Manual Refetch Button */}
      <button 
        onClick={() => refetch()} 
        disabled={isRefetching}
        style={{ padding: '10px 15px', cursor: 'pointer', marginBottom: '20px' }}
      >
        {isRefetching ? 'Refetching...' : 'Manually Refetch Data 🔄'}
      </button>

      {/* Explanation of Local Configuration */}
      <div style={{ fontSize: '0.9em', color: '#555', border: '1px solid #ddd', padding: '10px', marginBottom: '15px' }}>
        **Advanced React Query Options (Local Overrides):**
        <ul>
          <li>**`staleTime`**: Data is fresh for 30s.</li>
          <li>**`cacheTime`**: Inactive data is removed after 5 mins.</li>
          <li>**`refetchOnWindowFocus`**: Set to **`true`**; try clicking out and back into the window!</li>
        </ul>
      </div>

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


