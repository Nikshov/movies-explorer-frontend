import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';
import AppContext from '../../contexts/AppContext';

function MoviesCardList({ cards, onCardDelete, onCardLike, }) {

  const { onMoarButton, numberShowCards, } = React.useContext(AppContext);

  

  function handleMoarButton(evt) {
    evt.preventDefault();
    onMoarButton();
  }

  return (
    <section className='cardList'>
      <div className='cardList__container'>
        {cards?.length > 0 ? (
          <>
            {cards.slice(0, numberShowCards).map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}{' '}
          </>
        ) : null}
      </div>
      {numberShowCards >= cards?.length ? null : (
        <button className='cardList__moar-button' onClick={handleMoarButton} type='button'>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
