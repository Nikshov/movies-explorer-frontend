import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ isSaved, card, onCardLike, onCardDel }) {
  const location = useLocation();


  function handleLikeClick() {
    console.log(card, "SUUUUUUC");
    /* onCardLike(card); */
  }

  function handleDelClick() {
    console.log(card);
    onCardDel(card);
  }

  return (
    <div className='card'>
      <div className='card__head-container'>
        <div className='card__info'>
          <h2 className='card__title'>{card.nameRU ? card.nameRU : card.nameEN }</h2>
        <p className='card__duration'>Длительность: {card.duration ? card.duration : '' } мин</p>
        </div>
      {location.pathname === '/movies' ? (
          <button onClick={handleLikeClick} className={`card__button card__fav-button ${isSaved && 'card__fav-button_active'}`} />
        ) : (
          <button onClick={handleDelClick} className='card__delete-button card__button' />
        )}
      
        </div>
        <img className='card__img' src={`https://api.nomoreparties.co${card.image.url}`} alt='обложка фильма' />
      
    </div>
  );
}

export default MoviesCard;
