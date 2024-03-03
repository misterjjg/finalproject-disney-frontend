import "./Footer.css";
import fbimage from "../../images/Facebook.svg";
import githubimage from "../../images/Github.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__trademark">© 2024 Supersite, Powered by News API</p>
      <div className="footer__icons-links">
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            className="footer__link"
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__icons">
          <a
            className="footer__icons-links"
            href="https://github.com/misterjjg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubimage} alt="github link" />
          </a>
          <a
            className="footer__icons-links"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fbimage} alt="facebook link" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
