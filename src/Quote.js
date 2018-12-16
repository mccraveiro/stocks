import React, { useState, useEffect } from 'react';
import axios from 'axios';
import settings from './settings.json';
import './Quote.css';

const { baseURL, apikey } = settings

function getChangeClassName (change) {
  if (!change) return

  const changeWithoutPercentage = Number(change.slice(0, -1))

  if (changeWithoutPercentage < 0) {
    return 'NegativeChange'
  }

  return 'PositiveChange'
}

function Quote ({ symbol }) {
  const [price, setPrice] = useState('-');
  const [change, setChange] = useState('-');

  async function getPrice () {
    const result = await axios(`${baseURL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`);
    console.log(result)
    setPrice(result.data['Global Quote']['05. price'])
    setChange(result.data['Global Quote']['10. change percent'])
  }

  useEffect(() => { getPrice() }, [symbol]);

  return (
    <div className="Quote">
      <h1>{ symbol }</h1>
      <h2>{ price }</h2>
      <h2 className={getChangeClassName(change)}>{ change }</h2>
    </div>
  );
}

export default Quote;
