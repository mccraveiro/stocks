/** @jsx jsx */
import { useLocalStorage } from 'react-use';
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
  flex-wrap: wrap;
`

function App() {
  const [symbols, setSymbols] = useLocalStorage('symbols', []);

  return (
    <div css={appStyle}>
      <Global styles={globalStyle} />

      <Search onChoose={(symbol) => setSymbols([...symbols, symbol])} />

      <div css={bodyStyle}>
        {symbols.map(symbol =>
          <Quote key={symbol} symbol={symbol} />
        )}
      </div>
    </div>
  );
}

export default App;
