import React, { useState } from 'react';
import Search from './Search'
import Quote from './Quote'
import './App.css';

function App() {
  const [symbols, setSymbols] = useState(['STNE'])

  return (
    <div className="App">
      <Search onChoose={(symbol) => setSymbols([...symbols, symbol])} />

      {symbols.map(symbol =>
        <Quote key={symbol} symbol={symbol} />
      )}
    </div>
  );
}

export default App;
