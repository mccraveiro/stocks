import React, { useState, useEffect } from 'react';
import axios from 'axios';
import settings from './settings.json';

const { baseURL, apikey } = settings

function Quote ({ symbol }) {
  const [price, setPrice] = useState('?');

  async function getPrice () {
    const result = await axios(`${baseURL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`);
    console.log(result)
    setPrice(result.data['Global Quote']['05. price'])
  }

  useEffect(() => { getPrice() }, [symbol]);

  return (
    <div style={{ border: '1px solid black' }}>
      <h1>{ symbol }</h1>
      <h2>{ price }</h2>
    </div>
  );
}

export default Quote;
