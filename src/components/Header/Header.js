import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import { useLocation, Link } from 'react-router-dom';
import BurgerButton from '../BurgerButton/BurgerButton';
import AppContext from '../../contexts/AppContext';

function Header() {
const { loggedIn } = React.useContext(AppContext);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  function burgerToggle() {
    setIsBurgerOpen(!isBurgerOpen);
  }
  const location = useLocation();
  return (
    <header className={`header ${location.pathname === '/' ? 'header_landing' : ''}`}>
      <Logo />
      {!loggedIn ? (
        <nav className='header__auth'>
          <Link to='/signup' className='header__signup'>
            Регистрация
          </Link>
          <Link to='/signin' className='header__signin'>
            <div className='header__signin-button'>Войти</div>
          </Link>
        </nav>
      ) : (
        <>
          <Navigation isBurgerOpen={isBurgerOpen} />
          <BurgerButton isBurgerOpen={isBurgerOpen} burgerToggle={burgerToggle} />
        </>
      )}
    </header>
  );
}

export default Header;
