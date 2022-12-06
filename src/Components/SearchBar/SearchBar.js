import React, { useState } from 'react';

import './SearchBar.css';

function SearchBar(props) {
  const [state, setState] = useState("")

  function search() {
    props.onSearch(state.term)
  }

  function handleTermChange(e) {
    setState({ term: e.target.value })
  }

  return (
    <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist" 
          onChange={handleTermChange}/>
        <button 
          className="SearchButton"
          onClick={search}
        >SEARCH</button>
    </div>
  )
}

export default SearchBar;
