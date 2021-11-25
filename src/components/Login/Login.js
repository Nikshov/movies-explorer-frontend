import './Login.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login({ signin }) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    signin({ password: password , email: email });
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
          onChange={handleEmailChange}
          autoComplete='off'></input>

        <span className='login__input-span'>Пароль</span>
        <input
          className='login__input login__input_error'
          name='password'
          type='password'
          value={password || ''}
          onChange={handlePasswordChange}
          required
          autoComplete='off'></input>

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
