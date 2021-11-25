import './App.css';
import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import {
  signin,
  signup,
  signout,
  getUser,
  getMovies,
  updateUser,
  addMovie,
  removeMovie,
  checkAuth,
} from '../../utils/MainApi';
import { getMoviesList } from '../../utils/MoviesApi';
import UserContext from '../../contexts/UserContext';
import { Auth } from '../../utils/Auth';

function App() {  
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(React.useContext(UserContext));
  const [isShort, setIsShort] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fullList, setFullList] = React.useState([]);
  const [shortList, setShortList] = React.useState([]);
  const [favList, setFavList] = React.useState([]);
  const [favShortList, setFavShortList] = React.useState([]);

  const location = window.location.pathname;
  const navigate = useNavigate();

  
  
  React.useEffect(() => {
    if (!loggedIn)
      checkAuth()
        .then(() => {
          setLoggedIn(true);
          navigate('/movies');
        })
        .catch((err) => console.log(err));
  }, [loggedIn, navigate]);

  React.useEffect(() => {
    console.log(isShort);
  }, [isShort]);



  async function initMoviesLists() {
    await getMoviesList()
      .then((movies) => {
        localStorage.setItem('fullMovieList', JSON.stringify(movies));
      })
      .catch((error) => {
        console.log(error);
      });

    setFullList(JSON.parse(localStorage.getItem('fullMovieList')));
    setShortList(fullList.filter((movie) => movie.duration <= 40));

    await getMovies()
      .then((favMovies) => {
        localStorage.setItem('favMovieList', JSON.stringify(favMovies));
      })
      .catch((error) => {
        console.log(error);
      });
    setFavList(JSON.parse(localStorage.getItem('favMovieList')));
    setFavShortList(favList.filter((movie) => movie.duration <= 40));
  };

  async function handleSearchMovie(userRequest) {
    console.log(userRequest, location, 'ДАСУКА');
    setIsLoading(true);

    const moviesList = getList(location);
    if (moviesList.length === 0) {
      setSearchResult([]);
      setIsLoading(false);
      
      return console.log('ОШИБКА НУЛЛЛЬ', searchResult, searchResult.length);
    }
    console.log(moviesList, 'ЧООООООООООООООО');
    const result = await filter(moviesList, userRequest);
    console.log(result);
    setSearchResult(result);
    setIsLoading(false);
  }

  function getList(location) {
    if (location === '/movies') {
      getMoviesList()
      .then((movies) => {
        localStorage.setItem('fullMovieList', JSON.stringify(movies));
      })
      .catch((error) => {
        console.log(error);
      });

    setFullList(JSON.parse(localStorage.getItem('fullMovieList')));
      setShortList(fullList.filter((movie) => movie.duration <= 40));
      
      const list = isShort ? shortList : fullList;
      console.log('nosav', list);
      return list;
    }
    if (location === '/saved-movies') {
      getMovies()
      .then((favMovies) => {
        localStorage.setItem('favMovieList', JSON.stringify(favMovies));
      })
      .catch((error) => {
        console.log(error);
      });
    setFavList(JSON.parse(localStorage.getItem('favMovieList')));
    setFavShortList(favList.filter((movie) => movie.duration <= 40));

      const list = isShort ? favShortList : favList;
      console.log('sav', list);
      return list;
    }
    return;
  }

  function filter(moviesList, userRequest) {
    if (!moviesList.length) return console.log('список пуст', moviesList);
    const result = moviesList.filter((movie) => {
      const nameRU = movie.nameRU === null ? '' : movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN === null ? '' : movie.nameEN.toLowerCase();
      const description = movie.description === null ? '' : movie.description.toLowerCase();
      console.log(movie.year, nameRU, nameEN, description);
      if (
        nameRU.includes(userRequest) ||
        nameEN.includes(userRequest) ||
        description.includes(userRequest) ||
        movie.year === userRequest
      )
        return true;
      return false;
    });
    return result;
  }

  function addFav(card) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
    } = card;
    addMovie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      movieId,
      nameRU,
      nameEN,
    })
      .then(() => {
        getMovies()
          .then((favMovies) => {
            localStorage.setItem('favMovieList', JSON.stringify(favMovies));
            setFavList(JSON.parse(localStorage.getItem('favMovieList')));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  }

  function removeFav(card) {
    removeMovie(id)ж
  }

  function toggle() {
    setIsShort(!isShort);
  }

  function onSignIn({ email, password }) {
    signin({ email, password })
      .then((user) => {
        console.log(user);
        setCurrentUser({ email: user.email, name: user.name });
        setLoggedIn(true);
        initMoviesLists();
        navigate('/movies');
      })
      .catch((err) => console.log(err));
  }

  function onSignUp({ name, email, password }) {
    signup({ name, email, password })
      .then((answer) => {
        setCurrentUser({ email: email, name: name });
        setLoggedIn(true);
        initMoviesLists();
        navigate('/movies');
      })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    signout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        navigate('/signin');
      })
      .catch((err) => console.log(err));
  }

  return (
    <UserContext.Provider value={currentUser}>
      <Routes>
        <Route exact path='/' element={<Main />}></Route>
        <Route
          exact
          path='/movies'
          element={
            <Auth redirectTo='/signin' loggedIn={loggedIn}>
              <Movies
                isLoading={isLoading}
                searchMovie={handleSearchMovie}
                toggle={toggle}
                cards={ searchResult }
                onCardDelete={ removeFav }
                onCardLike={ addFav}
              />
            </Auth>
          }></Route>
        <Route
          exact
          path='/profile'
          element={
            <Auth redirectTo='/signin' loggedIn={loggedIn}>
              <Profile />
            </Auth>
          }></Route>
        <Route
          exact
          path='/saved-movies'
          element={
            <Auth redirectTo='/signin' loggedIn={loggedIn}>
              <SavedMovies
                isLoading={isLoading}
                searchMovie={handleSearchMovie}
                toggle={toggle}
                cards={ searchResult }
                onCardDelete={ removeFav }
                onCardLike={ addFav}
              />
            </Auth>
          }></Route>
        <Route exact path='/signup' element={<Register signup={onSignUp} />}></Route>
        <Route exact path='/signin' element={<Login signin={onSignIn} />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
