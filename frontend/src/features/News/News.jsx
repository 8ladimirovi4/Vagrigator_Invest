import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './News.css';
import Input from '../Auth/Input/Input';
import Button from '../Auth/Button/Button';

// const dataModal = useSelector((state) => state.dataModal);
// const dispatch = useDispatch();

function News() {
  const apiKey = '5MVXPAY7SIHWAHC1';
  const [stock, setStock] = useState('');
  const assets = useSelector((state) => state.assets);
  const dispatch = useDispatch();

  async function fetchTechnical() {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${
        assets.assets.map((el) => el.ticker)[2]
      }&time_from=20220101T0000&limit=50&apikey=${apiKey}`
    );
    let data = await response.json();
    setStock(data);
  }

  console.log(assets.assets.map((el) => el.ticker)[1]);
  useEffect(() => {
    fetch(`/api/list/assets`)
      .then((result) => result.json())
      .then((data) => dispatch({ type: 'ASSETS', payload: data }));
    fetchTechnical();
  }, [dispatch]);

  async function newsChange(e) {
    let ticker;
    if (e.target.inputTicker) {
      e.preventDefault();
      console.log('Privet');
      ticker = e.target.inputTicker.value;
      const response = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&time_from=20220101T0000&limit=50&apikey=${apiKey}`
      );
      let data = await response.json();
      setStock(data);
    } else {
      ticker = e.target.textContent;
      const response = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&time_from=20220101T0000&limit=50&apikey=${apiKey}`
      );
      let data = await response.json();
      setStock(data);
    }
  }

  return (
    <div className="news__page">
      <div className="tickerSearch">
        <div>
          <ul className="ourTicker">
            {assets.assets &&
              assets.assets.map((el) => (
                <li className='liTicker' onClick={(e) => newsChange(e)}>{el.ticker}</li>
              ))}
          </ul>
        </div>
        <div className="news__page__form">
          <form onSubmit={(e) => newsChange(e)}>
            <Input
              name={'inputTicker'}
              placeholder={'Введите тикер'}
              color={'black'}
              width={'400px'}
            />
            <Button title={'Найти'} />
          </form>
        </div>
      </div>

      <div className="news__page__main">
        {stock.feed &&
          stock.feed
            .map((el) => (
              <div className="news__card">
                <div
                  className="news__card__img"
                  style={{ backgroundImage: `url(${el['banner_image']})` }}
                ></div>
                <div className="news__card__content">
                  <div className="news__card__title">
                    <h2>{el.title}</h2>
                    <p className="news__card__text">
                      {el.summary.slice(0, 80)}...
                    </p>
                    <div className="news__button__link">
                      <a href={el.url} className="read__more">
                        Читать в источнике
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
            .slice(0, 11)}
      </div>
    </div>
  );
}

export default News;
