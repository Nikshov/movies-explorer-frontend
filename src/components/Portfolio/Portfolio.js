import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/Nikshov/how-to-learn" className="portfolio__link" target="_blank" rel="noopener noreferrer">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-text">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/Nikshov/russian-travel" className="portfolio__link" target="_blank" rel="noopener noreferrer">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-text">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/Nikshov/Mesto" className="portfolio__link" target="_blank" rel="noopener noreferrer">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-text">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
