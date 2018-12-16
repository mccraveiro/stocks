import React, { useState } from 'react';
import SearchResults from './SearchResults'

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
    <div>
      <input
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={search}
      />

      <SearchResults
        keywords={searchKeywords}
        onClick={dispatchChoose}
      />

      <hr />
    </div>
  );
}

export default Search;
