import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__info">
        <div className="footer__middle">
          <div className="footer__middle__address">
            <div className="footer__middle__address__logo1"></div>
            <div className="footer__middle__address__text">
              Saint-Petersburg
            </div>
          </div>
          <div className="footer__middle__phone">
            <div className="footer__middle__address__logo2"></div>
            <div className="footer__middle__address__text">+7 888 45 77 22</div>
          </div>
          <div className="footer__middle__email">
            <div className="footer__middle__address__logo3"></div>
            <div className="footer__middle__address__text">some@gmail.com</div>
          </div>
        </div>
        <div className="footer__left">
          <div className="footer__left__logo"></div>
          <div className="footer__left__social">
            <a href="https://github.com/SAMorozov22/Vagrigator">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111612.png"
                alt="github"
                className="footer__icons__logo"
              />
            </a>
            <a href="https://github.com/SAMorozov22/Vagrigator">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384030.png"
                alt="github"
                className="footer__icons__logo"
              />
            </a>
            <a href="https://github.com/SAMorozov22/Vagrigator">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111708.png"
                alt="github"
                className="footer__icons__logo"
              />
            </a>
          </div>
        </div>
        <div className="footer__right">
          <div className="footer__right__about">
            <div className="footer__right__about__title">About company</div>
            <div className="footer__right__about__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem asperiores est molestiae odio sed facilis!
            </div>
          </div>
        </div>
      </div>
      <div className="footer__reserved">
        © 2022 Vagrigator. Все права защищены
      </div>
    </div>
  );
}

export default Footer;
