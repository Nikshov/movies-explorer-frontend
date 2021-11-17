import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import NavTab from "../NavTab/NavTab";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main({isLoggedIn}) {
  return (
    <main className='landing'>
      <Header isLoggedIn={ isLoggedIn }/>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default Main;
