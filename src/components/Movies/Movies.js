import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from './../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

export default function Movies({ searchMovie, toggle, cards, isLoading, onCardDelete, onCardLike, notFound }) {
  return (
    <main className='movies'>
      <Header />
      <SearchForm searchMovie={searchMovie} toggle={toggle} />
      {isLoading ? <Preloader /> : notFound ? <span>Ничего не найдено</span> : <MoviesCardList cards={cards} onCardLike={onCardLike}
            onCardDelete={onCardDelete}/>}
      <Footer />
    </main>
  );
}
