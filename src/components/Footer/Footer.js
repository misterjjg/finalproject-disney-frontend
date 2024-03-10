import "./Footer.css";
import fbimage from "../../images/Facebook.svg";
import githubimage from "../../images/Github.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <p className="footer__copyright">
          © 2020 Supersite, Powered by News API
        </p>
        <div className="footer__content">
          <div className="footer__names">
            <Link to="/" className="footer__link">
              <p className="footer__name">Home</p>
            </Link>
            <a
              href="https://tripleten.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__name footer__link"
            >
              TripleTen
            </a>
          </div>
          <ul className="footer__icons">
            <li className="footer__icon-item">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="footer__icon"
                  src={githubimage}
                  alt="github icon"
                />
              </a>
            </li>
            <li className="footer__icon-item">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="footer__icon"
                  src={fbimage}
                  alt="facebook icon"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
