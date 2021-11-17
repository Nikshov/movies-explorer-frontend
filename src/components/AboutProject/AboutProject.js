import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__title-container">
        <h2 className="about-project__title">О проекте</h2>
      </div>
      <div className="about-project__info-container">
        <h3 className="about-project__subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="about-project__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__term">
          <p className="about-project__term-text">1 неделя</p>
        </div>
        <div className="about-project__term">
          <p className="about-project__term-text">4 недели</p>
        </div>
        <p className="about-project__term-description">Back-end</p>
        <p className="about-project__term-description">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
