import './Login.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useValidation } from '../../utils/useValidation';

function Login({ signin, isDisabledForm, setAuthErr, authErr }) {
  const { values, handleChange, isValid, resetForm } = useValidation();
  const { email, password } = values;

  React.useEffect(() => {
    return () => {
      setAuthErr(false);
    };
  }, [setAuthErr]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    isValid && signin({ password: password, email: email });
    resetForm();
  }

  return (
    <section className='login'>
      <div className='login__head'>
        <Logo />
        <h1 className='login__greeting'>Добро пожаловать!</h1>
      </div>

      <form className='login__form' onSubmit={handleSubmit}>
        <span className='login__input-span'>E-mail</span>
        <input
          className='login__input'
          name='email'
          type='email'
          value={email || ''}
          required
          onChange={handleChange}
          autoComplete='off'
          disabled={isDisabledForm}></input>

        <span className='login__input-span'>Пароль</span>
        <input
          className='login__input login__input_error'
          name='password'
          type='password'
          value={password || ''}
          onChange={handleChange}
          required
          autoComplete='off'
          disabled={isDisabledForm}></input>
        <span className='login__error-msg'>{authErr ? 'Что-то пошло не так...' : ''}</span>

        <button className='login__submit-button' type='submit'>
          Войти
        </button>
        <div className='login__foot'>
          <p className='login__foot_title'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login__foot_link'>
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
