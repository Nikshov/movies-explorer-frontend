import React from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ isBurgerOpen }) {
  const location = useLocation();

  return (
    <nav
      className={ `navigation__container ${isBurgerOpen ? 'navigation_burger_opened' : 'navigation_burger_closed'
        }` }>
      <div className='navigation__menu'>
        <div className='navigation__flexdiv'></div>
        <div className='navigation__main-links'>
          <Link to='/' className='navigation__landing navigation__link'>
            Главная
          </Link>
          <Link
            to='/movies'
            className={ `navigation__movies navigation__link ${location.pathname === '/movies' && 'navigation__link_active'
              } ` }>
            Фильмы
          </Link>
          <Link
            to='/saved-movies'
            className={ `navigation__saved-movies navigation__link ${location.pathname === '/saved-movies' && 'navigation__link_active'
              }` }>
            Сохранённые фильмы
          </Link>
        </div>
        <Link
          to='/profile'
          className={ `navigation__profile navigation__link ${location.pathname === '/profile' && 'navigation__link_active'
            }` }><p className='navigation__profile_text'>Аккаунт</p><div className='navigation__profile_icon'></div>
          
        </Link>
      </div>
    </nav>
  );
}
export default Navigation;
