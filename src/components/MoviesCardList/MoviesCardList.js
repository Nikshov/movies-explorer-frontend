import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList() {
  return (
    <section className="cardList">
      <div className="cardList__container">
        <MoviesCard />
        <MoviesCard isSaved={true}/>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard isSaved={true}/>
        <MoviesCard />
        <MoviesCard />
      </div>
      <button className="cardList__moar-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
