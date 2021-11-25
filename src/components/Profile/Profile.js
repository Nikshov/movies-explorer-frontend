import React from 'react';
import './Profile.css'
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/UserContext';

function Profile({ handleUpdateUser, onSignOut }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(email, name);
  }

  function handleLogout(evt) {
    evt.preventDefault();
    onSignOut();
  }

  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit} name="profile-form">
          <fieldset className="profile__input-container">
            <label className="profile__input-label" htmlFor="name-user">
              Имя
            </label>
            <input
              className="profile__input"
              onChange={handleChangeName}
              value={name || currentUser.name}
              placeholder="Имя"
              type="text"
              name="name-user"
              minLength="1"
              maxLength="100"
              required
            />
          </fieldset>
          <fieldset className="profile__input-container">
            <label className="profile__input-label" htmlFor="name-user">
              E-mail
            </label>
            <input
              className="profile__input"
              onChange={handleChangeEmail}
              value={email || currentUser.email}
              placeholder="E-mail"
              type="email"
              name="name-user"
              minLength="1"
              maxLength="100"
              required
            />
          </fieldset>
        </form>
        <button className="profile__edit-button" type="submit">
          Редактировать
        </button>
        <button className="profile__signout-button" onClick={handleLogout} type="button">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
