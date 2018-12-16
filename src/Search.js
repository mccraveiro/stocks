import React, { useState } from 'react';
import SearchResults from './SearchResults'
import './Search.css';

function Search (props) {
  const [inputValue, setInputValue] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');

  const search = (e) => {
    if (e.key === 'Enter') {
      setSearchKeywords(e.target.value)
    }
  }

  const dispatchChoose = (symbol) => {
    setInputValue('')
    setSearchKeywords('')
    props.onChoose(symbol)
  }

  return (
    <div className="Search">
      <input
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={search}
        placeholder="Search"
        className="SearchInput"
      />

      <SearchResults
        keywords={searchKeywords}
        onClick={dispatchChoose}
      />
    </div>
  );
}

export default Search;
