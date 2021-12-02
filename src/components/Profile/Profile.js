import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/UserContext';
import { useValidation } from '../../utils/useValidation';

function Profile({
  handleUpdateUser,
  onSignOut,
  setUpdMessage,
  setUpdErr,
  isDisabledForm,
  updErr,
  updMessage,
}) {
  const { values, handleChange, isValid, setValues, resetForm } = useValidation();
  const { name, email } = values;
  const [isButtonActive, setIsButtonActive] = React.useState(true);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid &&
      handleUpdateUser(name, email).then(() => {
        setValues({});
      });
  }

  React.useEffect(() => {
    if (isValid && (name !== currentUser.name || email !== currentUser.email)) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [currentUser.email, currentUser.name, email, isValid, name, values]);

  React.useEffect(() => {
    return () => {
      setUpdMessage(null);
      setUpdErr(null);
    };
  }, [setUpdErr, setUpdMessage]);

  function handleLogout(evt) {
    onSignOut();
  }

  return (
    <>
      <Header />
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className='profile__form' onSubmit={handleSubmit} name='profile-form'>
          <fieldset className='profile__input-container'>
            <label className='profile__input-label' htmlFor='name-user'>
              Имя
            </label>
            <input
              className='profile__input'
              onChange={handleChange}
              value={name || currentUser.name}
              placeholder='Имя'
              type='text'
              name='name-user'
              minLength='1'
              maxLength='100'
              required
              disabled={isDisabledForm}
            />
          </fieldset>
          <fieldset className='profile__input-container'>
            <label className='profile__input-label' htmlFor='name-user'>
              E-mail
            </label>
            <input
              className='profile__input'
              onChange={handleChange}
              value={email || currentUser.email}
              placeholder='E-mail'
              type='email'
              name='name-user'
              minLength='1'
              maxLength='100'
              required
              disabled={isDisabledForm}
            />
            <span className={`${updErr ? 'profile__error-msg' : 'profile__upd-msg'}`}>
              {updMessage ? `${updMessage}` : `Что пошло не так... `}
            </span>
          </fieldset>
        </form>
        <button
          onClick={handleSubmit}
          className={`profile__edit-button ${
            isButtonActive ? '' : 'profile__edit-button_inactive'
          }`}
          type='submit'>
          Редактировать
        </button>
        <button className='profile__signout-button' onClick={handleLogout} type='button'>
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
