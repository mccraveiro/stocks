/** @jsx jsx */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { css, jsx } from '@emotion/core';
import { VictoryGroup, VictoryArea, VictoryContainer } from 'victory';

import settings from '../settings.json';

const { baseURL, APIKey } = settings

const quoteStyle = css`
  border: 1px solid #ececec;
  margin: 8px;
  width: 250px;
  height: 277px;
  padding: 0;
  text-align: left;
  position: relative;
`

const headerStyle = css`
  padding: 20px;
  margin: 0;
`

const priceStyle = css`
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  z-index: 1;
`

const changeStyle = css`
  position: absolute;
  font-size: 1em;
  bottom: 8px;
  width: 100%;
  text-align: center;
  z-index: 1;
`

function getChangeClassName (change) {
  if (!change) return

  if (change < 0) {
    return css`
      ${changeStyle};
      color: red;
    `
  }

  return css`
    ${changeStyle};
    color: green;
  `
}

function Quote ({ symbol }) {
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);
  const [timeseries, setTimeseries] = useState([]);

  async function getPrice () {
    const result = await axios(`${baseURL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${APIKey}`);
    console.log(result)

    if (!result.data['Time Series (Daily)']) {
      return
    }

    const data = Object.entries(result.data['Time Series (Daily)'])
      .filter(([label, data]) => Number(data['5. volume']) !== 0)
      .map(([label, data]) => ({ x: label, y: Number(data['4. close'])}))
      .reverse()

    console.log(data)

    const firstPrice = data[0].y;
    const lastPrice = data[data.length - 1].y;
    const currentChange = ((lastPrice / firstPrice) - 1) * 100;

    setPrice(lastPrice);
    setChange(currentChange);
    setTimeseries(data)
  }

  useEffect(() => { getPrice() }, [symbol]);

  return (
    <div css={quoteStyle}>
      <h1 css={headerStyle}>{ symbol }</h1>
      <h2 css={priceStyle}>{ price.toFixed(2) }</h2>
      <h2 css={getChangeClassName(change)}>{ change.toFixed(2) }%</h2>
      <VictoryGroup
        padding={0}
        width={250}
        height={200}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryArea
          interpolation="natural"
          data={timeseries}
          style={{
            data: {
              fill: change >= 0 ? 'green' : 'red',
              fillOpacity: 0.4,
              stroke: change >= 0 ? 'green' : 'red',
              strokeWidth: 2,
            },
          }}
        />
      </VictoryGroup>
    </div>
  );
}

export default Quote;
