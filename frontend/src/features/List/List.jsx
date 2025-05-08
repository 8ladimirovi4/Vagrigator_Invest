import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './List.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataModal from './DataModal';
import SellModal from './SellModal';

function List() {
  const assets = useSelector((state) => state.assets);
  const reit = useSelector((state) => state.reit);
  const auto = useSelector((state) => state.auto);
  const dataModal = useSelector((state) => state.dataModal);
  const sellModal = useSelector((state) => state.sellModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //id для модалки на добавление
  const [dataReitID, setDataReitID] = useState();
  //id для модалки на изменение cash и удаление недвижки и авто
  const [dataUpdateID, setDataUpdateID] = useState();
  //id для вызова модалки и отправки фетча на авто и недкигу
  const [modaUpdateID, setModalUpdateID] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/list/assets`)
        .then((result) => result.json())
        .then((data) => dispatch({ type: 'ASSETS', payload: data }));
    }, 3500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    fetch(`/api/list/assets`)
      .then((result) => result.json())
      .then((data) => dispatch({ type: 'ASSETS', payload: data }));
  }, [dispatch]);

  useEffect(() => {
    fetch(`/api/reit`)
      .then((result) => result.json())
      .then((data) => dispatch({ type: 'REIT', payload: data }));
  }, [dispatch]);

  useEffect(() => {
    fetch(`/api/auto`)
      .then((result) => result.json())
      .then((data) => dispatch({ type: 'AUTO', payload: data }));
  }, [dispatch]);
  function getTicker(event) {
    assets.assets.map((el) => el.figi);
    navigate(
      `/list/${
        event.target.parentNode.querySelector('.ticker_td').textContent
      }/${event.target.parentNode.id}`
    );
  }

  //передаем id ссылки на добавление в модалку
  function addReit(event) {
    setDataReitID(Number(event.target.id));
  }

  function updateFunc(event) {
    setDataUpdateID(Number(event.target.id));
    setModalUpdateID(Number(event.target.closest('.reit_table').id));
  }

  const calculate = (price1, price2) => {
    if ((price1 - price2) / price2 === 0) {
      return null;
    } else if ((price1 - price2) / price2 > 0) {
      return <div className="tringle__up"></div>;
    } else {
      return <div className="tringle__down"></div>;
    }
  };

  return (
    <>
      <div className="list__container">
        <table className="container">
          <caption>Активы на Бирже</caption>
          <thead>
            <tr cols>
              <th>
                <h3>Актив</h3>
              </th>
              <th>
                <h3>Тикер</h3>
              </th>
              <th>
                <h3>Стоимость покупки</h3>
              </th>
              <th>
                <h3>Текущая стоимость</h3>
              </th>
              <th>
                <h3>Прибыль</h3>
              </th>
              {/* <th>
                <h3>Валюта</h3>
              </th> */}
            </tr>
          </thead>

          <tbody>
            {assets.assets.map((el, idx) => (
              <tr onClick={getTicker} id={el.figi} key={idx}>
                <td>
                  <div className="td__name">
                    <div className="table__ticker__name">{el.name}</div>
                    <div className="table__figi__name">{el.figi}</div>
                  </div>
                </td>
                <td className="ticker_td">{el.ticker}</td>
                <td>
                  {Number(el.price).toFixed(2)} {el.currency}
                </td>
                <td>
                  {Number(el.currentPrice).toFixed(2)} {el.currency}
                </td>
                <td>
                  <div className="table__percent">
                    <div className="table__percent__tringle">
                      {el.percent > 0 ? (
                        <div className="tringle__up"></div>
                      ) : (
                        <div className="tringle__down"></div>
                      )}
                    </div>
                    <div
                      style={
                        el.percent > 0 ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {el.percent ? <>{`${el.percent.toFixed(2)}%`}</> : <></>}
                    </div>
                  </div>
                </td>

                {/* <td>{el.currency}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <div id={3} className="reit_table">
          <table className="container">
            <div
              id={1}
              name="add_reit"
              className="container__button"
              onClick={(event) => {
                dispatch({ type: 'DATA_MODAL' });
                addReit(event);
              }}
            >
              Добавить актив
            </div>
            {dataModal.dataModal && dataReitID === 1 ? (
              <DataModal
                dataReitID={dataReitID}
                title={'Добавить объект недвижимости'}
              />
            ) : null}
            <caption>Недвижимость</caption>
            <thead>
              <tr cols>
                <th>
                  <h3>Актив</h3>
                </th>
                <th>
                  <h3>Стоимость покупки</h3>
                </th>
                <th>
                  <h3>Текущая стоимость</h3>
                </th>
                <th>
                  <h3>Прибыль</h3>
                </th>
                {/* <th>
                  <h3>Валюта</h3>
                </th> */}
                <th>
                  <h3>Управление</h3>
                </th>
              </tr>
            </thead>

            <tbody>
              {reit.reit.map((el, i) => (
                <tr key={el.id} id={el.id} data-id={el.id}>
                  <td>{el.name}</td>
                  <td>
                    {el.purchase_price} {el.currency}
                  </td>
                  <td>
                    {el.current_price} {el.currency}
                  </td>

                  <td>
                    <div className="table__percent">
                      <div className="table__percent__tringle">
                        {calculate(el.current_price, el.purchase_price)}
                      </div>
                      <div
                        style={
                          (el.current_price - el.purchase_price) /
                            el.purchase_price >
                          0
                            ? { color: 'green' }
                            : (el.current_price - el.purchase_price) /
                                el.purchase_price <
                              0
                            ? { color: 'red' }
                            : { color: '#A7A1AE' }
                        }
                      >
                        {(
                          ((el.current_price - el.purchase_price) /
                            el.purchase_price) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                  </td>
                  {/* <td>{el.currency}</td> */}
                  <td>
                    <div className="table__edit__delete">
                      {/* <div className="table__btn__edit"></div> */}
                      <div
                        id={el.id}
                        onClick={(event) => {
                          dispatch({ type: 'SELL_MODAL' });
                          updateFunc(event);
                        }}
                        className="table__btn__sell"
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {sellModal.sellModal && modaUpdateID === 3 ? (
              <SellModal
                dataUpdateID={dataUpdateID}
                modaUpdateID={modaUpdateID}
                title={'Продать'}
              />
            ) : null}
          </table>
        </div>

        <div id={4} className="reit_table">
          <table className="container">
            <div
              id={2}
              name="add_reit"
              className="container__button"
              onClick={(event) => {
                dispatch({ type: 'DATA_MODAL' });
                addReit(event);
              }}
            >
              Добавить актив
            </div>
            {dataModal.dataModal && dataReitID === 2 ? (
              <DataModal dataReitID={dataReitID} title={'Добавить актив'} />
            ) : null}

            <caption>Прочие активы</caption>
            <thead>
              <tr cols>
                <th>
                  <h3>Актив</h3>
                </th>
                <th>
                  <h3>Стоимость покупки</h3>
                </th>
                <th>
                  <h3>Текущая стоимость</h3>
                </th>
                <th>
                  <h3>Прибыль</h3>
                </th>
                {/* <th>
                  <h3>Валюта</h3>
                </th> */}
                <th>
                  <h3>Управление</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {auto.auto.map((el, i) => (
                <tr key={el.id} id={el.id}>
                  <td>{el.name}</td>
                  <td>
                    {el.purchase_price} {el.currency}
                  </td>
                  <td>
                    {el.current_price} {el.currency}
                  </td>
                  <td>
                    <div className="table__percent">
                      <div className="table__percent__tringle">
                        {calculate(el.current_price, el.purchase_price)}
                      </div>
                      <div
                        style={
                          (el.current_price - el.purchase_price) /
                            el.purchase_price >
                          0
                            ? { color: 'green' }
                            : (el.current_price - el.purchase_price) /
                                el.purchase_price <
                              0
                            ? { color: 'red' }
                            : { color: '#A7A1AE' }
                        }
                      >
                        {(
                          ((el.current_price - el.purchase_price) /
                            el.purchase_price) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                  </td>
                  {/* <td>{el.currency}</td> */}
                  <td>
                    <div className="table__edit__delete">
                      {/* <div className="table__btn__edit"></div> */}
                      <div
                        id={el.id}
                        onClick={(event) => {
                          dispatch({ type: 'SELL_MODAL' });
                          updateFunc(event);
                        }}
                        className="table__btn__sell"
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {sellModal.sellModal && modaUpdateID === 4 ? (
              <SellModal
                dataUpdateID={dataUpdateID}
                modaUpdateID={modaUpdateID}
                title={'Продать'}
              />
            ) : null}
          </table>
        </div>
      </div>
    </>
  );
}
export default List;
