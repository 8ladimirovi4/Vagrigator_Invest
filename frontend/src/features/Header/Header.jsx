import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RunString from '../RunString/RunString';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logout = async () => {
    const response = await fetch('/api/auth/logout');
    const data = await response.json();
    if (data.message) {
      dispatch({ type: 'DelUser' });
    }
  };

  return (
    <div className="header">
      <div className="header__title">
        <Link to="/cabinet" className="header__nav__list__item__link">
          Vagrigator
        </Link>
      </div>
      <div className="header__nav">
        {user.user && user.user.id ? (
          <ul className="header__nav__list">
            <li className="header__nav__list__item">
              <Link to="/cabinet" className="header__nav__list__item__link">
                Личный кабинет
              </Link>
            </li>
            <li className="header__nav__list__item">
              <Link to="/list" className="header__nav__list__item__link">
                Активы
              </Link>
            </li>
            <li className="header__nav__list__item">
  <Link to="/news" className="header__nav__list__item__link">
                Новости
              </Link>
              <Link
                onClick={logout}
                to="/"
                className="header__nav__list__item__link"
              >
                Выйти
              </Link>
            </li>
          </ul>
        ) : null}
        {user.user && user.user.id ? <RunString /> : null}
      </div>
    </div>
  );
}

export default Header;
