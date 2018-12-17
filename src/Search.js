/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from '@emotion/core';
import SearchResults from './SearchResults';

const searchStyle = css`
  padding: 20px;
`

const inputStyle = css`
  border: 0px;
  background: #ececec;
  color: black;
  font-size: 30px;
  font-weight: bold;
  outline: 0px;
  padding: 20px 30px;
  width: 400px;

  &::placeholder {
    color: #969696;
  }
`

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
    <div css={searchStyle}>
      <input
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={search}
        placeholder="Search"
        css={inputStyle}
      />

      <SearchResults
        keywords={searchKeywords}
        onClick={dispatchChoose}
      />
    </div>
  );
}

export default Search;
