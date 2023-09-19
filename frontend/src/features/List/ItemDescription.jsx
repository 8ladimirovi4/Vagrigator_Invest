import React from 'react';
import './itemDescription.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartLine from '../Chart/Chart.jsx';
import { Chart as ChartJS } from 'chart.js/auto';

function ItemDescription() {
  const apiKey = '5MVXPAY7SIHWAHC1';
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [stock, setStock] = useState('');

  async function fetchTechnical() {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`
    );
    let data = await response.json();
   
    setStock(data);
  }

  const { ticker, figi } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/list/${figi}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstDate: '2021-09-12T00:00:00Z',
          lastDate: '2022-09-12T00:00:00Z',
          interval: 1,
        }),
      });
      const data = await response.json();
     
      const newArr = [].concat(
        data.candles
          .slice(0, 19)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(19, 38)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(38, 57)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(57, 76)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(76, 95)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(95, 114)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(114, 133)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(133, 152)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(152, 171)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(171, 190)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(190, 209)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(209, 228)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19
      );
      setData(newArr);

      setName([
        'October',
        'November',
        'December',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
      ]);
    }
    fetchData();
    fetchTechnical();
  }, []);

  async function fetchData(e) {
    if (Number(e.target.value) === 1) {
      const response = await fetch(`/api/list/${figi}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstDate: '2021-09-12T00:00:00Z',
          lastDate: '2022-09-12T00:00:00Z',
          interval: 1,
        }),
      });
      const data = await response.json();
      const newArr = [].concat(
        data.candles
          .slice(0, 19)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(19, 38)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(38, 57)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(57, 76)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(76, 95)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(95, 114)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(114, 133)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(133, 152)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(152, 171)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(171, 190)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(190, 209)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19,
        data.candles
          .slice(209, 228)
          .reduce((sum, cur) => sum + cur.open.units, 0) / 19
      );
      setData(newArr);

      setName([
        'October',
        'November',
        'December',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
      ]);
    } else if (Number(e.target.value) === 2) {
      const response = await fetch(`/api/list/${figi}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstDate: '2022-09-01T00:00:00Z',
          lastDate: '2022-09-30T00:00:00Z',
          interval: 2,
        }),
      });
      const data = await response.json();
      setData(data.candles.map((el) => el.open.units));
      setName(data.candles.map((el) => el.time.slice(5, 10)));

    } else {
      const response = await fetch(`/api/list/${figi}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstDate: '2022-09-14T00:00:00Z',
          lastDate: '2022-09-15T23:00:00Z',
          interval: 3,
        }),
      });
      const data = await response.json();
    
      setData(data.candles.map((el) => el.open.units));
      setName(data.candles.map((el) => el.time.slice(11, 16)));
    }
  }

  return (
    <>
      <div>
        <div className="ticker">
          <div className="ticker__info">
            <h2 className="ticker__name">{stock && stock.Name}</h2>
            <hr />
            <div className="ticker__name">{`${stock && stock.Symbol} [${
              stock && stock.Exchange
            }]`}</div>
            <hr />
            <div className="ticker__name">
              {`${stock && stock.Sector} | ${stock && stock.Industry} | ${
                stock && stock.Currency
              }`}
            </div>
            <hr />
            <div className="ticker__history">
              {stock && stock.Description === 'None'
                ? ''
                : stock && stock.Description}
            </div>
          </div>

          <div className="ticker__diagramm">
            {/* <ul>
          {monthlyData && monthlyData.map((item, index) => <li key={index}>{item["2. high"]}</li>).slice(0, 12)}
        </ul> */}
            <div className="container"></div>
            <div className="chart">
              <ChartLine monthlyData={data} monthlyName={name} />
            </div>
            <div className="technical">Технические показатели</div>
            <input
              className="ticker__input"
              list="ticker"
              type="range"
              onChange={(e) => fetchData(e)}
              min={1}
              max={3}
              defaultValue={1}
            />
            <datalist
              style={{ display: 'flex', justifyContent: 'space-between' }}
              id="ticker"
            >
              <option value={1} label={'За год'}></option>
              <option value={2} label={'За текущий месяц'}></option>
              <option value={3} label={'За текущий день'}></option>
            </datalist>
          </div>
        </div>
      </div>

      <h2 className="container2__title">Financial Statements</h2>
      <div className="container container2">
        <table>
          <tr>
            <th>FiscalYearEnd</th>
            <td> {stock && stock.FiscalYearEnd.slice(0, 3)}</td>
            <th>BookValue</th>
            <td>{stock && stock.BookValue}</td>
            <th>ProfitMarg</th>
            <td>{stock && stock.ProfitMargin}</td>
            <th>GrossProf TTM</th>
            <td>{`${
              stock &&
              stock.GrossProfitTTM.substr(0, stock.GrossProfitTTM.length - 6)
            },${
              stock &&
              stock.GrossProfitTTM.substr(stock.GrossProfitTTM.length - 6, 2)
            }M`}</td>
            <th>Beta</th>
            <td> {stock && stock.Beta}</td>
          </tr>

          <tr>
            <th>MarketCap</th>
            <td>
              {' '}
              {`${
                stock &&
                stock.MarketCapitalization.substr(
                  0,
                  stock.MarketCapitalization.length - 6
                )
              },${
                stock &&
                stock.MarketCapitalization.substr(
                  stock.MarketCapitalization.length - 6,
                  2
                )
              }M`}
            </td>
            <th>DivPerShare</th>
            <td>{stock && stock.DividendPerShare}</td>
            <th>OperMarg TTM</th>
            <td> {stock && stock.OperatingMarginTTM}</td>
            <th>DilutedEPS TTM</th>
            <td>{stock && stock.DilutedEPSTTM}</td>
            <th>52W High</th>
            <td>{stock && stock['52WeekHigh']}</td>
          </tr>

          <tr>
            <th>EBITDA</th>
            <td>{`${stock && stock.EBITDA.substr(0, stock.EBITDA.length - 6)},${
              stock && stock.EBITDA.substr(stock.EBITDA.length - 6, 2)
            }M`}</td>
            <th>DivYield</th>
            <td>{stock && stock.DividendYield}</td>
            <th>RetnOnAst TTM</th>
            <td> {stock && stock.ReturnOnAssetsTTM}</td>
            <th>P/S TTM</th>
            <td>{stock && stock.PriceToSalesRatioTTM}</td>
            <th>52W Low</th>
            <td>{stock && stock['52WeekLow']}</td>
          </tr>

          <tr>
            <th>PERatio</th>
            <td>{stock && stock.PERatio}</td>
            <th>EPS</th>
            <td>{stock && stock.EPS}</td>
            <th>RetnOnEqty TTM</th>
            <td>{stock && stock.ReturnOnEquityTTM}</td>
            <th>AnalystTrgtPrice</th>
            <td> {stock && stock.AnalystTargetPrice}</td>
            <th>SharesOutstd</th>
            <td>{`${
              stock &&
              stock.SharesOutstanding.substr(
                0,
                stock.SharesOutstanding.length - 6
              )
            },${
              stock &&
              stock.SharesOutstanding.substr(
                stock.SharesOutstanding.length - 6,
                2
              )
            }M`}</td>
          </tr>

          <tr>
            <th>PEGRatio</th>
            <td>{stock && stock.PEGRatio}</td>
            <th>RevPerShare TTM</th>
            <td> {stock && stock.RevenuePerShareTTM}</td>
            <th>Revenue TTM</th>
            <td>{`${
              stock && stock.RevenueTTM.substr(0, stock.RevenueTTM.length - 6)
            },${
              stock && stock.RevenueTTM.substr(stock.RevenueTTM.length - 6, 2)
            }M`}</td>
            <th>P/B</th>
            <td>{stock && stock.PriceToBookRatio}</td>
            <th>DividendDate</th>
            <td>{stock && stock.DividendDate}</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default ItemDescription;
