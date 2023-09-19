import React from 'react';
import './sellModal.css';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../Auth/Input/Input';
import Button from '../Auth/Button/Button';

function SellModal({ dataUpdateID, modaUpdateID, title }) {
  const updateReit = useSelector((state) => state.updateReit);
  const updateAuto = useSelector((state) => state.updateAuto);
  const dispatch = useDispatch();

  async function updateReitFunc(event) {
    event.preventDefault();

    if (modaUpdateID === 3) {
      const body = JSON.stringify({
        quantity: Number(event.target.update_asset.value),
      });
      await fetch(`api/reit/${dataUpdateID}`, {
        method: 'PUT',
        body,
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch({ type: 'DELETE_REIT', payload: Number(dataUpdateID) });
      dispatch({ type: 'SELL_MODAL' });
    } else if (modaUpdateID === 4) {
      const body = JSON.stringify({
        quantity: Number(event.target.update_asset.value),
      });
      await fetch(`api/auto/${dataUpdateID}`, {
        method: 'PUT',
        body,
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch({ type: 'DELETE_AUTO', payload: Number(dataUpdateID) });
      dispatch({ type: 'SELL_MODAL' });
    }
    event.target.reset();
  }

  return (
    <div className="modal__overlay">
      <div className="modal modal__sell">
        <h2 style={{ textAlign: 'center', padding: '5px 0' }}>{title}</h2>
        <form onSubmit={updateReitFunc}>
          <Input
            name={'update_asset'}
            type={'text'}
            color={'black'}
            placeholder={'Введите стоимость'}
          />
          <Button title={'Применить'} />
        </form>
        <span
          className="modal__close2"
          onClick={(event) => dispatch({ type: 'SELL_MODAL' })}
        >
          ❌
        </span>
      </div>
    </div>
  );
}

export default SellModal;
