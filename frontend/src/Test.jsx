import "./Test.css";
import { useState } from "react";

const Test = () => {
  const [show1, setShow1] = useState(false);
  return (
    <>
      <div className="dropdown">
        <div className="dropdown__main">
          <div className="dropdown__main__title">Недвижимость</div>
          <div className="dropdown__main__price">1000000</div>
        </div>
        <div className="dropdown-content">
          <div className="house">
            <div className="house__desc">Квартира 1</div>
            <div className="house__price">1000000</div>
            <div className="house__controls">
              {show1 ? (
                <div className="change__controls">
                  <input type="text" className="change" />
                  <button>Подтвердить</button>
                </div>
              ) : null}
              <button onClick={() => setShow1((prev) => !prev)}>
                Редактировать
              </button>
              <button>Продать</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
