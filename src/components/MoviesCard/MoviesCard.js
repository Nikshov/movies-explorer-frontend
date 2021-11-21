import React from 'react';
import './MoviesCard.css';
import img from '../../images/imgCARD.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard({ isSaved }) {
  const location = useLocation();

  return (
    <div className='card'>
      <div className='card__head-container'>
        <div className='card__info'>
        <h2 className='card__title'>33 слова о дизайне</h2>
        <p className='card__duration'>1ч 47м</p>
        </div>
      {location.pathname === '/movies' ? (
          <button className={`card__button card__fav-button ${isSaved && 'card__fav-button_active'}`} />
        ) : (
          <button className='card__delete-button card__button' />
        )}
      
        </div>
        <img className='card__img' src={ img } alt='обложка фильма' />
      
    </div>
  );
}

export default MoviesCard;
