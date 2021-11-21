import './Register.css';
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';

function Register() {

  return (
    <section className="register">
      <div className="register__head">
        <Logo />
        <h1 className="register__greeting">Добро пожаловать!</h1>
      </div>

      <form className="register__form">
        <span className="register__input-span">Имя</span>
        <input
          className="register__input"
          name="name"
          type="text"
          required
          autoComplete="off"
        ></input>

        <span className="register__input-span">E-mail</span>
        <input
          className="register__input"
          name="email"
          type="email"
          required
          autoComplete="off"
        ></input>

        <span className="register__input-span">Пароль</span>
        <input
          className="register__input register__input_error"
          name="password"
          type="password"
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
