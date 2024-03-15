import "./Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2024 Joshua Gonzalez, Powered by News API
      </p>
      <div className="footer__socials">
        <NavLink exact to="/" className="footer__link" id="home">
          <p className="footer__home">Home</p>
        </NavLink>
        <a
          href="https://www.tripleten.com"
          rel="noreferrer"
          target="_blank"
          className="footer__link"
          id="tripleten"
        >
          <p className="footer__tripleten">TripleTen</p>
        </a>
        <a
          href="https://github.com/misterjjg"
          rel="noreferrer"
          target="_blank"
          className="footer__link"
          id="github"
        >
          <div className="footer__github"></div>
        </a>
        <a
          href="https://www.facebook.com"
          rel="noreferrer"
          target="_blank"
          className="footer__link"
          id="facebook"
        >
          <div className="footer__facebook"></div>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
