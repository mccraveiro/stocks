import React, { useState, useEffect } from 'react';
import axios from 'axios';
import settings from './settings.json';

const { baseURL, apikey } = settings

function Search (props) {
  const [inputValue, setInputValue] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const search = (e) => {
    if (e.key === 'Enter') {
      setSearchKeywords(e.target.value)
    }
  }

  const dispatchChoose = (symbol) => {
    setInputValue('')
    setSearchKeywords('')
    setSearchResults([])
    props.onChoose(symbol)
  }

  async function searchSymbol () {
    if (!searchKeywords) return

    const result = await axios(`${baseURL}?function=SYMBOL_SEARCH&keywords=${searchKeywords}&apikey=${apikey}`);
    console.log(result)

    if (!result.data.bestMatches) {
      return
    }

    setSearchResults(result.data.bestMatches.map(x => x['1. symbol']))
  }

  useEffect(() => { searchSymbol() }, [searchKeywords]);

  return (
    <div>
      <input
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={search}
      />

      <ul>
        {searchResults.map(symbol =>
          <li
            key={symbol}
            style={{ cursor: 'pointer' }}
            onClick={() => dispatchChoose(symbol)}>{symbol}</li>
        )}
      </ul>

      <hr />
    </div>
  );
}

export default Search;
