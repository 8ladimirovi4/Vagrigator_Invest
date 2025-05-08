import './RunString.css';
import mock from './mock';

function RunString() {
  return (
    <div className="wrapper">
      {mock.map((el, idx) => (
        <div className="mover" key={idx}>
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
