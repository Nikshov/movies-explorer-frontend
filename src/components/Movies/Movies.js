import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "./../Footer/Footer";
import Header from '../Header/Header';

export default function Movies({ isLoggedIn }) {
  return (
    <main className='movies'>
      <Header isLoggedIn={ isLoggedIn }/>
        <SearchForm />
        <MoviesCardList />
        <Footer />
      </main>
  );
}
