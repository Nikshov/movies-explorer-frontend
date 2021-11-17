import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__list-item">
          <a href="#about-project" className="navtab__list-link">
            О проекте
          </a>
        </li>
        <li className="navtab__list-item">
          <a href="#techs" className="navtab__list-link">
            Технологии
          </a>
        </li>
        <li className="navtab__list-item">
          <a href="#about-me" className="navtab__list-link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
