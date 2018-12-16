import React, { useState } from 'react';
import Search from './Search'
import Quote from './Quote'
import './App.css';

function App() {
  const [symbols, setSymbols] = useState(['STNE', 'HGTX3.SAO'])

  return (
    <div className="App">
      <Search onChoose={(symbol) => setSymbols([...symbols, symbol])} />

      <div className="QuoteList">
        {symbols.map(symbol =>
          <Quote key={symbol} symbol={symbol} />
        )}
      </div>
    </div>
  );
}

export default App;
