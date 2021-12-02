import './App.css';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import AppContext from '../../contexts/AppContext';
import { Auth } from '../../utils/Auth';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isShort, setIsShort] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchSavedResult, setSearchSavedResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fullList, setFullList] = React.useState([]);
  const [shortList, setShortList] = React.useState([]);
  const [favList, setFavList] = React.useState([]);
  const [favShortList, setFavShortList] = React.useState([]);
  const [isDisabledForm, setIsDisabledForm] = React.useState(false);
  const [authErr, setAuthErr] = React.useState(false);
  const [updMessage, setUpdMessage] = React.useState(false);
  const [updErr, setUpdErr] = React.useState(false);
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [notFoundSavedMovies, setNotFoundSavedMovies] = React.useState(false);

  const location = window.location.pathname;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn)
      checkAuth()
        .then(() => {
          setLoggedIn(true);
          navigate('/movies');
          getUser()
            .then((user) => {
              setCurrentUser({ email: user.email, name: user.name });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
  }, [loggedIn, navigate]);


  async function initMoviesLists() {
    await getMoviesList()
      .then((movies) => {
        console.log('wtfINIT:', movies);
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
  }

  /*  async function handleSearchMovie(userRequest) {
    console.log(userRequest, location, 'handleSearchMovieSTART');
    setIsLoading(true);

    const moviesList = getList(location);
    if (moviesList.length === 0) {
      setSearchResult([]);
      setIsLoading(false);

      return console.log('список пуст', searchResult, searchResult.length);
    }
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
  } */

  async function handleSearchMovie(userRequest) {
    console.log(userRequest, location, 'handleSearchMovieSTART');
    setIsLoading(true);
    setFullList([JSON.parse(localStorage.getItem('fullMovieList'))]);
    setShortList(fullList.filter((movie) => movie.duration <= 40));
    console.log('wtf:', fullList, 'wtf2:', shortList, 'WUT:', JSON.parse(localStorage.getItem('fullMovieList')))
    const moviesList = isShort ? shortList : fullList;
    if (moviesList.length === 0) {
      setSearchResult([]);
      setIsLoading(false);
      setNotFoundMovies(true);
      return console.log('список пуст', searchResult, searchResult.length);
    }
    const result = await filter(moviesList, userRequest);
    console.log(result);
    setSearchResult(result);
    setIsLoading(false);
    setNotFoundMovies(false);
  }

  async function handleSearchSavedMovie(userRequest) {
    console.log(userRequest, location, 'handleSearchMovieSTART');
    setIsLoading(true);

    const moviesList = isShort ? favShortList : favList;
    if (moviesList.length === 0) {
      setSearchSavedResult([]);
      setIsLoading(false);
      setNotFoundSavedMovies(true);
      return console.log('список пуст', searchResult, searchResult.length);
    }
    const result = await filter(moviesList, userRequest);
    console.log(result);
    setSearchSavedResult(result);
    setIsLoading(false);
    setNotFoundSavedMovies(false);
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
      trailerLink,
      id,
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
      trailerLink,
      id,
      nameRU,
      nameEN,
    })
      .then(() => {
        getMovies()
          .then((favMovies) => {
            localStorage.setItem('favMovieList', JSON.stringify(favMovies));
            setFavList(JSON.parse(localStorage.getItem('favMovieList')));
            setFavShortList(favList.filter((movie) => movie.duration <= 40));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  }

  function removeFav(card) {
    removeMovie(card._id)
      .then((suc) => {
        getMovies()
          .then((favMovies) => {
            localStorage.setItem('favMovieList', JSON.stringify(favMovies));
            setFavList(JSON.parse(localStorage.getItem('favMovieList')));
            setFavShortList(favList.filter((movie) => movie.duration <= 40));
          })
          .catch((error) => {
            console.log(error);
          });
        console.log('DELETED!');
      })

      .catch((error) => {
        console.log(error);
      });
  }

  function toggle() {
    setIsShort(!isShort);
  }

  function onSignIn({ email, password }) {
    setIsDisabledForm(true);
    signin({ email, password })
      .then((user) => {
        console.log(user);
        setCurrentUser({ email: user.email, name: user.name });
        setLoggedIn(true);
        initMoviesLists();
        navigate('/movies');
      })
      .catch((err) => {
        setAuthErr(true);
        console.log(err);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function onSignUp({ name, email, password }) {
    setIsDisabledForm(true);
    signup({ name, email, password })
      .then((answer) => {
        setCurrentUser({ email: email, name: name });
        setLoggedIn(true);
        initMoviesLists();
        navigate('/movies');
      })
      .catch((err) => {
        setAuthErr(true);
        console.log(err);
      })
      .finally(() => setIsDisabledForm(false));
  }

  function onSignOut() {
    signout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(name, email) {
    setIsDisabledForm(true);
    updateUser(name, email)
      .then((res) => {
        setUpdMessage(res.message);
        getUser().then((user) => {
          setCurrentUser({ email: user.email, name: user.name }).catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        setUpdErr(err);
        console.log('ERORR:', err);
      })
      .finally(() => setIsDisabledForm(false));
  }

  return (
    <UserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          loggedIn: loggedIn,
          isShort: isShort,
          searchResult: searchResult,
          searchSavedResult: searchSavedResult,
          isLoading: isLoading,
          isDisabledForm: isDisabledForm,
          authErr: authErr,
          updMessage: updMessage,
          updErr: updErr,
          notFoundMovies: notFoundMovies,
          notFoundSavedMovies: notFoundSavedMovies,
        }}>
        <Routes>
          <Route exact path='/' element={<Main />}></Route>
          <Route
            exact
            path='/movies'
            element={
              <Auth redirectTo='/' loggedIn={loggedIn}>
                <Movies
                  isLoading={isLoading}
                  searchMovie={handleSearchMovie}
                  toggle={toggle}
                  cards={searchResult}
                  onCardDelete={removeFav}
                  onCardLike={addFav}
                  notFound={notFoundMovies}
                />
              </Auth>
            }></Route>
          <Route
            exact
            path='/profile'
            element={
              <Auth redirectTo='/' loggedIn={loggedIn}>
                <Profile
                  handleUpdateUser={handleUpdateUser}
                  onSignOut={onSignOut}
                  updMessage={updMessage}
                  updErr={updErr}
                  setUpdErr={setUpdErr}
                  setUpdMessage={setUpdMessage}
                  setIsDisabledForm={setIsDisabledForm}
                />
              </Auth>
            }></Route>
          <Route
            exact
            path='/saved-movies'
            element={
              <Auth redirectTo='/' loggedIn={loggedIn}>
                <SavedMovies
                  isLoading={isLoading}
                  searchMovie={handleSearchSavedMovie}
                  toggle={toggle}
                  cards={searchSavedResult}
                  onCardDelete={removeFav}
                  onCardLike={addFav}
                  notFound={notFoundSavedMovies}
                />
              </Auth>
            }></Route>
          <Route
            exact
            path='/signup'
            element={
              <Register
                signup={onSignUp}
                isDisabledForm={isDisabledForm}
                authErr={authErr}
                setAuthErr={setAuthErr}
                setIsDisabledForm={setIsDisabledForm}
              />
            }></Route>
          <Route
            exact
            path='/signin'
            element={
              <Login
                signin={onSignIn}
                isDisabledForm={isDisabledForm}
                authErr={authErr}
                setAuthErr={setAuthErr}
                setIsDisabledForm={setIsDisabledForm}
              />
            }></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </AppContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
