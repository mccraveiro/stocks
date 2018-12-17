/** @jsx jsx */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { css, jsx } from '@emotion/core';
import settings from '../settings.json';

const listStyle = css`
  list-style: none;
  margin: 0 auto;
  padding: 5px 0;
  text-align: left;
  width: 460px;
`

const resultStyle = css`
  color: black;
  padding: 5px 30px;

  &:hover {
    text-decoration: underline;
  }
`

const { baseURL, apikey } = settings

function Search (props) {
  const [searchResults, setSearchResults] = useState([]);

  async function searchSymbol () {
    if (!props.keywords) {
      setSearchResults([]);
      return
    }

    const result = await axios(`${baseURL}?function=SYMBOL_SEARCH&keywords=${props.keywords}&apikey=${apikey}`);
    console.log(result)

    if (!result.data.bestMatches) {
      return
    }

    setSearchResults(result.data.bestMatches.map(x => x['1. symbol']))
  }

  useEffect(() => { searchSymbol() }, [props.keywords]);

  return (
    <ul css={listStyle}>
      {searchResults.map(symbol =>
        <li
          key={symbol}
          style={{ cursor: 'pointer' }}
          onClick={() => props.onClick(symbol)}
          css={resultStyle}
        >{symbol}</li>
      )}
    </ul>
  );
}

export default Search;
