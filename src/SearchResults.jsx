import React, { useState, useEffect } from 'react';
import axios from 'axios';
import settings from './settings.json';

const { baseURL, apikey } = settings

function Search (props) {
  const [searchResults, setSearchResults] = useState([]);

  async function searchSymbol () {
    if (!props.keywords) return

    const result = await axios(`${baseURL}?function=SYMBOL_SEARCH&keywords=${props.keywords}&apikey=${apikey}`);
    console.log(result)

    if (!result.data.bestMatches) {
      return
    }

    setSearchResults(result.data.bestMatches.map(x => x['1. symbol']))
  }

  useEffect(() => { searchSymbol() }, [props.keywords]);

  return (
    <ul>
      {searchResults.map(symbol =>
        <li
          key={symbol}
          style={{ cursor: 'pointer' }}
          onClick={() => props.onClick(symbol)}>{symbol}</li>
      )}
    </ul>
  );
}

export default Search;
