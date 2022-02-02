import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from './../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import AppContext from '../../contexts/AppContext';

export default function Movies({
  searchMovie,
  toggle,
  onCardDelete,
  onCardLike,
}) {
  const { filterResult, isLoading, notFoundMovies, favList } = React.useContext(AppContext);
  return (
    <main className='movies'>
      <Header />
      <SearchForm searchMovie={searchMovie} toggle={toggle} />
      {isLoading ? (
        <Preloader />
      ) : notFoundMovies ? (
        <span>Ничего не найдено</span>
      ) : (
        <MoviesCardList cards={filterResult} onCardLike={onCardLike} onCardDelete={onCardDelete} favList={favList} />
      )}
      <Footer />
    </main>
  );
}
