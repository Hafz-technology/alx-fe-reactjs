import { useState } from "react";
import {FaSearch } from "react-icons/fa";
import './Search.css'; 
export const Search = ({setResults}) => {
  const [input, setInput] = useState("");
  const fetchData = (value) => {
    fetch("https://api.github.com/users/Hafz-technology")
    .then((Response) => Response.json())
    .then(json => {
      const results = json.
      console.log(results);
      setResults(results);
    }) ; 
  } 

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  }


  return (
   <div className="input-wrapper">
   <FaSearch id="search-icon" /> 
    <input 
     placeholder="Type to search..." 
     value={input} 
     onChange={(e) => handleChange(e.target.value)} 
     />
   </div>
  );
};


