import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({cards, onCardDelete, onCardLike}) {
  const isSaved = false;
  return (
    <section className="cardList">
      <div className="cardList__container">
        { cards.length > 0 ? <>(
          {
            cards.map(card => (
          <MoviesCard
            card={card}
            key={ card.id }
            isSaved={ isSaved }
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
            )) }) </>
      : '' }
        
      </div>
      <button className="cardList__moar-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
