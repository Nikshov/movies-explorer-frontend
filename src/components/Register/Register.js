import './Register.css';
import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';

function Register({signup}) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    signup({ password: password , email: email, name: name });
  }

  return (
    <section className="register">
      <div className="register__head">
        <Logo />
        <h1 className="register__greeting">Добро пожаловать!</h1>
      </div>

      <form className="register__form" onSubmit={handleSubmit}>
        <span className="register__input-span">Имя</span>
        <input
          className="register__input"
          name="name"
          type="text"
          value={name || ''}
          onChange={handleNameChange}
          required
          autoComplete="off"
        ></input>

        <span className="register__input-span">E-mail</span>
        <input
          className="register__input"
          name="email"
          type="email"
          value={ email || '' }
          onChange={handleEmailChange}
          required
          autoComplete="off"
        ></input>

        <span className="register__input-span">Пароль</span>
        <input
          className="register__input register__input_error"
          name="password"
          type="password"
          value={password || ''}
          onChange={handlePasswordChange}
          required
          autoComplete="off"
        ></input>
        <span className="register__error-msg">Что-то пошло не так...</span>

        <button className="register__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <div className="register__foot">
          <p className="register__foot_title">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__foot_link">
            Войти
          </Link>
        </div>
      </form>
    </section>
)
}

export default Register;
