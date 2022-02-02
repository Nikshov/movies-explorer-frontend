import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';

function MoviesCardList({ cards, onCardDelete, onCardLike }) {

  const [numberShowCards, setNumberShowCards] = React.useState(
    window.innerWidth > 945 ? 12 : window.innerWidth > 600 ? 8 : 5,
  );

  const [numberAddMoarCards, setNumberAddMoarCards] = React.useState(
    window.innerWidth > 945 ? 3 : 2,
  );

  window.onresize = () => {
    if (window.innerWidth > 945) {
      setNumberAddMoarCards(3);
    } else {
      setNumberAddMoarCards(2);
    }
  };

  function handleMoar() {
    setNumberShowCards(numberShowCards + numberAddMoarCards);
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
        <button className='cardList__moar-button' onClick={handleMoar} type='button'>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
