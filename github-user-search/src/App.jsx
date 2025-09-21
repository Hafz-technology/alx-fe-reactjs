
import { useState } from 'react'
import './App.css'
import { Search } from './components/Search'
import { SearchResultsList } from './components/SearchResultsList'

function App() {
  const [results, setResults] = useState([]);


  return (
    <>
      <div className="App">
        <div className="search-bar-container">
              <Search setResults={setResults}/>
            <SearchResultsList results={results}/>

        </div>
                
        
        </div>
    </>
  )
}

export default App
