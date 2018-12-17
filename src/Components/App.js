/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx, Global } from '@emotion/core';
import Search from './Search';
import Quote from './Quote';

const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

const appStyle = css`
  text-align: center;
`

const bodyStyle = css`
  display: flex;
  justify-content: space-evenly;
  margin: 40px auto;
  width: 1000px;
`

const defaultSymbolList = []

function loadData () {
  const serializedSymbols = window.localStorage.getItem('symbols');

  if (!serializedSymbols) {
    return defaultSymbolList;
  }

  const parsedSymbols = JSON.parse(serializedSymbols);

  return parsedSymbols;
}

function saveData (data) {
  const serializedSymbols = JSON.stringify(data);
  window.localStorage.setItem('symbols', serializedSymbols);
}

function App() {
  const [symbols, setSymbols] = useState(defaultSymbolList);

  useEffect(() => {
    const data = loadData();
    setSymbols(data);
  }, []);

  function addSymbol (symbol) {
    const newValue = [...symbols, symbol];
    saveData(newValue);
    setSymbols(newValue);
  }

  return (
    <div css={appStyle}>
      <Global styles={globalStyle} />

      <Search onChoose={addSymbol} />

      <div css={bodyStyle}>
        {symbols.map(symbol =>
          <Quote key={symbol} symbol={symbol} />
        )}
      </div>
    </div>
  );
}

export default App;
