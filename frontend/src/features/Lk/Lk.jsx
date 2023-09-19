import { React, useState, useEffect } from 'react';
import './Lk.css';
import ChartLine from '../Chart/Chart.jsx';
import ChartDoughnut from '../Chart/ChartDoughnut.jsx';
import { Chart as ChartJS,  } from 'chart.js/auto';

function Lk() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [prevTotalAmount, setPrevTotalAmount] = useState(0);

  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyName, setMonthlyName] = useState([]);

  const [realEstate, setRealEstate] = useState(0);
  const [auto, setAuto] = useState(0);
  const [cash, setCash] = useState(0);
  const [stock, setStock] = useState(0);

  // Все активы + исторические данные
  useEffect(() => {
    fetch(`/api/lk`)
      .then((result) => result.json())
      .then((data) => {
        console.log('console.log(data.stock)', data);
        setRealEstate(data.realEstate);
        setAuto(data.auto);
        setCash(data.cash);
        setStock(data.stock);
        if(data.total.length > 1){
          setMonthlyName(data.total.map((el) => el.data));
          setMonthlyData(data.total.map((el) => el.amount));
        }
      });

      // fetch(`/api/line`)
      // .then((result) => result.json())
      // .then((data) => {console.log('console.log(data.stock)', data)});
  }, []);

  // При изменении цены состовляющих
  useEffect(() => {
    // Суммарная текущая стоимость:

    const totalValue =
      realEstate.currentPrice + auto.currentPrice + cash + stock.currentPrice;
    setTotalAmount(totalValue);

    const prevTotalValue =
      realEstate.purchasePrice +
      auto.purchasePrice +
      cash +
      stock.purchasePrice;
    setPrevTotalAmount(prevTotalValue);
  }, [realEstate, auto, cash, stock]);

  return (
    <div className="cabinet">
      <div>
        <div className="cabinet__balance">
          <div className="cabinet__balance__title">
            Текущая стоимость активов:
          </div>

          <div className="cabinet__balance__total">
            {totalAmount? <>{totalAmount.toFixed(0)}</> : <></>} руб
          </div>
          {(((totalAmount - prevTotalAmount) * 100) / prevTotalAmount).toFixed(
            2
          ) > 0 ? (
            <div className="cabinet__balance__total__green">
              {(
                ((totalAmount - prevTotalAmount) * 100) /
                prevTotalAmount
              ).toFixed(2) + ' %'}
            </div>
          ) : (
            <red className="cabinet__balance__total__red">
              {(totalAmount)?<>{(
                ((totalAmount - prevTotalAmount) * 100) /
                prevTotalAmount
              ).toFixed(2) + ' %'}</> : <></>}
            </red>
          )}
        </div>
      </div>

      <div className="cabinet__assets">
        <div className="cabinet__chart_container"> 
        <div className="cabinet__assests__realEstate">
          <div className="cabinet__assests__realEstate__info">
            <div className="cabinet__assests__realEstate__title">
              Недвижимость:
            </div>
            <div className="cabinet__assests__realEstate__price">
              {realEstate.currentPrice}
              <div>
                <div className="cabinet__assests__realEstate__price__currect">
                  Изменение
                  {(realEstate)? <>{(realEstate.currentPrice - realEstate.purchasePrice) /
                    realEstate.purchasePrice >
                  0 ? (
                    <div className="tringle__up"></div>
                  ) : (
                    <div className="tringle__down"></div>
                  )}</>
                  : <></>}
                  <div
                    style={
                      (realEstate.currentPrice - realEstate.purchasePrice) /
                        realEstate.purchasePrice >
                      0
                        ? { color: 'green' }
                        : { color: 'red' }
                    }
                  >
                    {(realEstate && realEstate.purchasePrice > 0)? <>{(
                      ((realEstate.currentPrice - realEstate.purchasePrice) *
                        100) /
                      realEstate.purchasePrice
                    ).toFixed(2) + '%'}</>
                  : <>0.00%</>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cabinet__assests__realEstate__controls"></div>
        </div>

        <div className="cabinet__assests__auto">
          <div className="cabinet__assests__auto__info">
            <div className="cabinet__assests__auto__title">Прочие активы: </div>
            <div className="cabinet__assests__auto__price">
              {auto.currentPrice}
              <div className="cabinet__assests__realEstate__price__currect">
                Изменение
                {(auto)? <>{(auto.currentPrice - auto.purchasePrice) /
                    auto.purchasePrice >
                  0 ? (
                    <div className="tringle__up"></div>
                  ) : (
                    <div className="tringle__down"></div>
                  )}</>
                  : <></>}
                <div
                  style={
                    (auto.currentPrice - auto.purchasePrice) /
                      auto.purchasePrice >
                    0
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                    {(auto && auto.purchasePrice)? <>{(
                      ((auto.currentPrice - auto.purchasePrice) *
                        100) /
                        auto.purchasePrice
                    ).toFixed(2) + '%'}</>
                  : <>0.00%</>}
                </div>
              </div>
            </div>
          </div>

          <div className="cabinet__assests__auto__controls"></div>
        </div>
        <div className="cabinet__assests__stock">
          <div className="cabinet__assests__stock__info">
            <div className="cabinet__assests__stock__title">Биржа: </div>
            <div className="cabinet__assests__stock__price">
              { stock.currentPrice? <> {stock.currentPrice.toFixed(0)}</> : <></>}
              <div className="cabinet__assests__realEstate__price__currect">
                Изменение
                {(stock)? <>{(stock.currentPrice - stock.purchasePrice) /
                    stock.purchasePrice >
                  0 ? (
                    <div className="tringle__up"></div>
                  ) : (
                    <div className="tringle__down"></div>
                  )}</>
                  : <></>}
                <div
                  style={
                    (stock.currentPrice - stock.purchasePrice) /
                      stock.purchasePrice >
                    0
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                    {(stock)? <>{(
                      ((stock.currentPrice - stock.purchasePrice) *
                        100) /
                        stock.purchasePrice
                    ).toFixed(2) + '%'}</>
                  : <></>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cabinet__assests__cash">
          <div className="cabinet__assests__cash__info">
            <div className="cabinet__assests__cash__title">Валюта: </div>
            <div className="cabinet__assests__cash__price">{cash}</div>
          </div>

          <div className="cabinet__assests__cash__controls"></div>
        </div>
          <div className="cabinet__chartline_container">
            <ChartLine monthlyData={monthlyData} monthlyName={monthlyName} />
          </div>
        </div>
          <div className="cabinet__chartdoughnut_container">
            <ChartDoughnut
              realEstate={realEstate}
              auto={auto}
              cash={cash}
              stock={stock}
            />
          </div>
      </div>
    </div>
  );
}

export default Lk;
