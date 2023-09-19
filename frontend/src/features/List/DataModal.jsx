import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Auth/Button/Button';
import Input from '../Auth/Input/Input';
import './dataModal.css';

function DataModal({ dataReitID, title }) {
  const dataModal = useSelector((state) => state.dataModal);
  const reitUpdate = useSelector((state) => state.reitUpdate);
  const autoUpdate = useSelector((state) => state.autoUpdate);
  const dispatch = useDispatch();

  async function postFunc(event) {
    event.preventDefault();
    if (dataReitID === 1) {
      const body = JSON.stringify({
        name: event.target.name.value,
        purchase_price: event.target.purchase_price.value,
        currency: event.target.currency.value,
      });
      const response = await fetch('api/reit', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      dispatch({ type: 'POST_REIT', payload: data.newReit });
      dispatch({ type: 'DATA_MODAL' });
    } else if (dataReitID === 2) {
      const body = JSON.stringify({
        name: event.target.name.value,
        purchase_price: event.target.purchase_price.value,
        currency: event.target.currency.value,
      });
      const response = await fetch('api/auto', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data);
      dispatch({ type: 'POST_AUTO', payload: data.newAuto });
      dispatch({ type: 'DATA_MODAL' });
    }
    event.target.reset();
  }

  return (
    <div className="modal__overlay">
      <div className="data-modal">
        <h2 style={{ textAlign: 'center', padding: '5px 0' }}>{title}</h2>
        <form onSubmit={postFunc} className="data-modal_from">
          <Input
            type={'text'}
            name={'name'}
            placeholder={'Введите название'}
            color={'black'}
          />
          <Input
            type={'number'}
            name={'purchase_price'}
            placeholder={'Введите стоимость'}
            color={'black'}
          />
          <select name="currency" className="select">
            <option>rub</option>
            <option>usd</option>
            <option>eur</option>
          </select>
          <Button title={'Применить'} />
          <span
            className="modal__close2"
            onClick={(event) => dispatch({ type: 'DATA_MODAL' })}
          >
            ❌
          </span>
        </form>
      </div>
    </div>
  );
}

export default DataModal;
