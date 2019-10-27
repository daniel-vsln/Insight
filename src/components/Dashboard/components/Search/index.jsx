import React from 'react';
import './style.css';

export default ({query, onQueryChange, onSearch}) => (
  <div className="search-container">
    <input className='search-input' placeholder='Search by content' value={query} onChange={onQueryChange}/>
    <button className='search-button' onClick={onSearch}>Search</button>
  </div>
);
