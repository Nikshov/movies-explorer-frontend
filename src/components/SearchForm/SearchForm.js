import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm() {

  function handleChange(evt) {
    evt.preventDefault();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} name="search-form">
        <div className="search-form__input-wrapper">
          <input
            className="search-form__input"
            value=''
            type="text"
            placeholder="Фильм"
            name="movieName"
            minLength="1"
            maxLength="100"
            required
            onChange={handleChange}
          />
        </div>
        <button className="search-form__btn" type="submit"></button>
      </form>
      <FilterCheckbox />
      <div className="search-form__decor-line"></div>
    </section>
  );
}

export default SearchForm;
