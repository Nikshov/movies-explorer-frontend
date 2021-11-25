import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from '../Header/Header';
import Footer from "./../Footer/Footer";
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

export default function SavedMovies({ searchMovie, toggle, cards, isLoading, onCardDelete, onCardLike }) {
  return (
    <section className="saved-movies">
      <Header />
      <SearchForm searchMovie={searchMovie} toggle={toggle} />
      {isLoading ? <Preloader /> : <MoviesCardList cards={cards} onCardLike={onCardLike}
            onCardDelete={onCardDelete}/>}
      <Footer />
    </section>
  );
}
