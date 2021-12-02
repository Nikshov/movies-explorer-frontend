import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from '../Header/Header';
import Footer from "./../Footer/Footer";
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';
import  AppContext from '../../contexts/AppContext';

export default function SavedMovies({ searchMovie, toggle, onCardDelete, onCardLike, }) {
  const { searchSavedResult, isLoading, notFoundSavedMovies } = React.useContext(AppContext);
  return (
    <section className="saved-movies">
      <Header />
      <SearchForm searchMovie={searchMovie} toggle={toggle} />
      {isLoading ? <Preloader /> : notFoundSavedMovies ? <span>Ничего не найдено</span> : <MoviesCardList cards={searchSavedResult} onCardLike={onCardLike}
            onCardDelete={onCardDelete}/>}
      <Footer />
    </section>
  );
}
