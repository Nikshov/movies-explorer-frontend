import React from 'react';
import './BurgerButton.css'

function BurgerButton({ burgerToggle, isBurgerOpen }) {
  return (
    <button
      className={isBurgerOpen ? 'burger-button_close' : 'burger-button_open'}
      type="button"
      aria-label="кнопка открытия/закрытия меню"
      onClick={burgerToggle}>
    </button>
  );
}

export default BurgerButton;
