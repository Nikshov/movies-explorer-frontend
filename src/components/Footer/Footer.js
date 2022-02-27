import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer-block">
        <h3 className="footer-block__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
      </div>

      <div className="footer__block-content">
        <p className="footer__copyright">&copy; 2022</p>
        <nav className="footer-links">
          <li className="footer-links__item">
            <a
              className="footer-links__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer-links__item">
            <a
              className="footer-links__link"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer-links__item">
            <a
              className="footer-links__link"
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        </nav>
      </div>
    </section>
  );
}
