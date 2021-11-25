import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm({searchMovie, toggle}) {
  const [value, setValue] = React.useState('');
  


  function handleChange(evt) {
      setValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    searchMovie(value.toString().toLowerCase());
  }
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} name="search-form">
        <div className="search-form__input-wrapper">
          <input
            className="search-form__input"
            value={value || ''}
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
      <FilterCheckbox toggle={toggle} />
      <div className="search-form__decor-line"></div>
    </section>
  );
}

export default SearchForm;
