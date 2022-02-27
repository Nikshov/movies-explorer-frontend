import './Register.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useValidation } from '../../utils/useValidation';
import AppContext from '../../contexts/AppContext';

function Register({ signup, setAuthErr, setIsDisabledForm }) {
  const { values, handleChange, isValid, resetForm } = useValidation();
  const { name, email, password } = values;
  const { isDisabledForm, authErr } = React.useContext(AppContext);

  React.useEffect(() => {
    return () => {
      setAuthErr(false);
      setIsDisabledForm(false);
    };
  }, [setAuthErr, setIsDisabledForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password || !name) {
      return;
    }
    isValid && signup({ password: password, email: email, name: name });
    resetForm();
  }

  return (
    <section className='register'>
      <div className='register__head'>
        <Logo />
        <h1 className='register__greeting'>Добро пожаловать!</h1>
      </div>

      <form className='register__form' onSubmit={handleSubmit}>
        <span className='register__input-span'>Имя</span>
        <input
          className='register__input'
          name='name'
          type='text'
          value={name || ''}
          onChange={handleChange}
          required
          autoComplete='off'
          disabled={isDisabledForm}></input>

        <span className='register__input-span'>E-mail</span>
        <input
          className='register__input'
          name='email'
          type='email'
          value={email || ''}
          onChange={handleChange}
          required
          autoComplete='off'
          disabled={isDisabledForm}></input>

        <span className='register__input-span'>Пароль</span>
        <input
          className='register__input register__input_error'
          name='password'
          type='password'
          value={password || ''}
          onChange={handleChange}
          required
          autoComplete='off'
          disabled={isDisabledForm}></input>
        <span className='register__error-msg'>{authErr ? 'Что-то пошло не так...' : ''}</span>

        <button className='register__submit-button' type='submit'>
          Зарегистрироваться
        </button>
        <div className='register__foot'>
          <p className='register__foot_title'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__foot_link'>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
