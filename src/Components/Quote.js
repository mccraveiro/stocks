/** @jsx jsx */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { css, jsx } from '@emotion/core';
import settings from '../settings.json';

const { baseURL, apikey } = settings

const quoteStyle = css`
  border: 1px solid #ececec;
  margin: 8px;
  width: 250px;
  height: 150px;
  padding: 20px;
  text-align: left;
`

const headerStyle = css`
  padding: 0;
  margin: 0;
`

function getChangeClassName (change) {
  if (!change) return

  const changeWithoutPercentage = Number(change.slice(0, -1))

  if (changeWithoutPercentage < 0) {
    return css`
      color: red;
    `
  }

  return css`
    color: green;
  `
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
    <div css={quoteStyle}>
      <h1 css={headerStyle}>{ symbol }</h1>
      <h2>{ price }</h2>
      <h2 css={getChangeClassName(change)}>{ change }</h2>
    </div>
  );
}

export default Quote;
