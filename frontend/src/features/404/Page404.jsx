import './Page404.css';
import man404 from '../../../src/img/man404.png';

function Page404() {
  return (
    <div className="error__page">
      <div className="page404">
        <h2 className="page404__title">Ooops...</h2>
        <div className="page404__error__code">Error 404</div>
        <div className="page__message">
          <h2>Page not found</h2>
        </div>
      </div>
      <div className="error__man">
        <img src={man404} alt="man404" />
      </div>
    </div>
  );
}

export default Page404;
