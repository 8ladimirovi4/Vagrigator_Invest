import { useState } from 'react';
import Button from '../Auth/Button/Button';
import Input from '../Auth/Input/Input';
import './Modal.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Modal({ setClose }) {
  const [errorMessage, setErrorMessage] = useState('success');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { name, email, password, checkPassword } = form;
    console.log(form);
    const response = await fetch('/api/auth/reg', {
      method: 'post',
      body: JSON.stringify({
        login: name.value,
        email: email.value,
        password: password.value,
        checkPassword: checkPassword.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.message !== 'success') {
      setErrorMessage(data.message);
    } else {
      console.log(data);
      setErrorMessage('success');
      setClose((prev) => !prev);
      dispatch({ type: 'AddUser', payload: data.user });
      navigate('/cabinet');
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal" onSubmit={registration}>
        <form>
          <h1 className="modal__title">Регистрация</h1>
          <Input
            name={'name'}
            type={'text'}
            placeholder={'Введите логин'}
            color={'black'}
          />
          <Input
            name={'email'}
            type={'email'}
            placeholder={'Введите почту'}
            color={'black'}
          />
          <Input
            name={'password'}
            type={'password'}
            placeholder={'Введите пароль'}
            color={'black'}
          />
          <Input
            name={'checkPassword'}
            type={'password'}
            placeholder={'Повторите пароль'}
            color={'black'}
          />
          {errorMessage !== 'success' ? <div>{errorMessage}</div> : null}
          <Button setClose={setClose} title={'Зарегистрироваться'} />
        </form>
        <span
          className="modal__close"
          onClick={() => setClose((prev) => !prev)}
        >
          ❌
        </span>
      </div>
    </div>
  );
}

export default Modal;
