import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from '../Header/Header';
import Footer from "./../Footer/Footer";

export default function SavedMovies({ isLoggedIn }) {
  return (
    <section className="saved-movies">
      <Header isLoggedIn={ isLoggedIn }/>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  );
}
