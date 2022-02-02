import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';

function MoviesCard({ card, onCardLike, onCardDelete }) {
  const location = useLocation();

  const [isSaved, setIsSaved] = React.useState(false);

  const { favList } = React.useContext(AppContext);

  const time = `${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`;

  const source = card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image;
  const id = card.id;

  function handleLikeClick() {
    onCardLike(card);
    toggle();
  }

  function handleDelClick() {
    onCardDelete(card);
    toggle();
  }

  function toggle() {
    setIsSaved(!isSaved);
  }

  React.useEffect(() => {
    if (favList.some((favCard) => favCard.movieId === id)) setIsSaved(true);
  }, [favList, id]);

  return (
    <div className='card'>
      <div className='card__head-container'>
        <div className='card__info'>
          <h2 className='card__title'>{card.nameRU ? card.nameRU : card.nameEN}</h2>
          <p className='card__duration'>Длительность: {time}</p>
        </div>
        {location.pathname === '/movies' ? (
          isSaved ? (
            <button
              onClick={handleDelClick}
              className='card__button card__fav-button card__fav-button_active'
            />
          ) : (
            <button onClick={handleLikeClick} className='card__button card__fav-button' />
          )
        ) : (
          <button onClick={handleDelClick} className='card__delete-button card__button' />
        )}
      </div>
      <img className='card__img' src={source} alt='обложка фильма' />
    </div>
  );
}

export default MoviesCard;
