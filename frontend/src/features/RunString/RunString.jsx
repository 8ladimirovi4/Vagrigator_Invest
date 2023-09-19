import './RunString.css';
import mock from './mock';

function RunString() {
  return (
    <div class="wrapper">
      {mock.map((el) => (
        <div class="mover">
          {el.price > 100 ? (
            <div className="greenTRingle"></div>
          ) : (
            <div className="redTRingle"></div>
          )}
          <div className="wrapper__info">
            <div className="ticker__title">{el.ticker}:</div>
            <div className="ticker__price">{el.price}$</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RunString;
