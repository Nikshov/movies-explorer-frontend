import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox({ toggle }) {
  
  return (
    <div className="short-film" >
      <input className="short-film__checkbox" id="filter-checkbox" type="checkbox" onClick={toggle}/>
      <label className="short-film__label" htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
