import './Registration.css';
import '../Input/Input';
import '../Button/Button';
import Modal from '../../Modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Registration() {
  const [close, setClose] = useState(false);
  const [errorMessage, setErrorMessage] = useState('success');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { email, password } = form;
    console.log(form);
    const response = await fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
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

  const showModal = (e) => {
    e.preventDefault();
    setClose((prev) => !prev);
  };

  return (
    <>
      <div className="authauthentication">
        <div className="login__form">
          <h2 className="login__form__title">Здравствуйте!</h2>
          <form onSubmit={login}>
            <Input title={'email'} name={'email'} type={'email'} />
            <Input title={'Пароль'} name={'password'} type={'password'} />
            <Button title={'Логин'} />
          </form>
          {errorMessage !== 'success' ? <div>{errorMessage}</div> : null}
          <form onSubmit={showModal}>
            <Button title={'Регистрация'} />
          </form>
          <div className="login__form__checkbox">
            <div className="login__form__checkbox__check">
              <input type="checkbox" />
            </div>
            <div className="login__form__checkbox__title">
              <div>Запомнить меня</div>
              <a href="/" className="login__form__checkbox__forgot">
                Забыли пароль?
              </a>
            </div>
          </div>
        </div>
      </div>
      {!close ? null : <Modal setClose={setClose} />}
    </>
  );
}

export default Registration;
