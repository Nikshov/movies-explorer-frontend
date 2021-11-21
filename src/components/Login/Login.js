import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login() {
  return (
    <section className='login'>
      <div className='login__head'>
        <Logo />
        <h1 className='login__greeting'>Добро пожаловать!</h1>
      </div>
      
      <form className='login__form'>
        <span className='login__input-span'>E-mail</span>
        <input
          className='login__input'
          name='email'
          type='email'
          required
          autoComplete='off'></input>

        <span className='login__input-span'>Пароль</span>
        <input
          className='login__input login__input_error'
          name='password'
          type='password'
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
