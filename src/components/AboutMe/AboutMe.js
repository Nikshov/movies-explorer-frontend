import photo from '../../images/photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <div className='about-me__title-container'>
        <h2 className='about-me__title'>Студент</h2>
      </div>
      <div className='about-me__info-container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Никита</h3>
          <h4 className='about-me__profession'>Фронтенд-разработчик, 28 лет</h4>
          <p className='about-me__text'>
            %SAMPLE_TEXT%
          </p>
          <ul className='about-me__links'>
            <li className='about-me__links-item'>
              <a
                href='https://facebook.com/'
                className='about-me__link'
                target='_blank'
                rel='noopener noreferrer'>
                Facebook
              </a>
            </li>
            <li className='about-me__links-item'>
              <a
                href='https://github.com/Nikshov'
                className='about-me__link'
                target='_blank'
                rel='noopener noreferrer'>
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <img className='about-me__photo' src={photo} alt='Фотография меня' />
      </div>
    </section>
  );
}

export default AboutMe;
