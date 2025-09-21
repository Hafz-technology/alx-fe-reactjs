import { useState } from "react";
import {FaSearch } from "react-icons/fa";
import './Search.css'; 
import axios from 'axios';
import { fetchUserData } from "../services/githubService";






export const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setUserData(null);
    setError(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Looks like we can't find the user");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white font-sans">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          GitHub User Search
        </h1>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="Enter a GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-purple-600 rounded-lg font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        </div>
        </div>

  )};







// ["avatar_url", "login", "Looks like we cant find the user", "img"]

  // const [input, setInput] = useState("");
//   const fetchData = (value) => {
    
//     fetch("https://jsonplaceholder.typicode.com/users")    

//     .then((Response) => Response.json())
//     .then(json => {
//       const results = json.filter((user) => {
//         return (
//           value &&
//           user &&
//           user.name &&
//           user.name.toLowerCase().includes(value)
//         )
//       })
      
//       setResults(results);
//     }) ; 
//   } 

//   const handleChange = (value) => {
//     setInput(value);
//     fetchData(value);
//   }


//   return (
//    <div className="input-wrapper">
//    <FaSearch id="search-icon" /> 
//     <input 
//      placeholder="Type to search..." 
//      value={input} 
//      onChange={(e) => handleChange(e.target.value)} 
//      />
//    </div>
//   );
// };


