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
  const [fullList, setFullList] = React.useState([]);
  const [favList, setFavList] = React.useState([]);
  const [filterResult, setFilterResult] = React.useState([]);
  const [filterSavedResult, setFilterSavedResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isDisabledForm, setIsDisabledForm] = React.useState(false);

  const [isShort, setIsShort] = React.useState(false);
  const [authErr, setAuthErr] = React.useState(false);
  const [updMessage, setUpdMessage] = React.useState(false);
  const [updErr, setUpdErr] = React.useState(false);
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [notFoundSavedMovies, setNotFoundSavedMovies] = React.useState(false);

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

  React.useEffect(() => {
    getMovies()
      .then((movies) => {
        setFavList(movies);
        console.log(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    getMoviesList()
      .then((movies) => {
        setFullList(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    localStorage.setItem('fullMovieList', JSON.stringify(fullList));
  }, [fullList]);

  React.useEffect(() => {
    localStorage.setItem('favMovieList', JSON.stringify(favList));
  }, [favList]);


  async function handleSearchMovie(userRequest) {
    setIsLoading(true);
    const moviesList = JSON.parse(localStorage.getItem('fullMovieList'));
    if (moviesList?.length === 0) {
      setFilterResult([]);
      setIsLoading(false);
      setNotFoundMovies(true);
      return console.log('список пуст', filterResult, filterResult.length);
    }
    const result = await filter(moviesList, userRequest);
    console.log(result);
    setFilterResult(result);
    setIsLoading(false);
    setNotFoundMovies(false);
    if (result?.length === 0) {
      setNotFoundMovies(true);
    }
  }

  async function handleSearchSavedMovie(userRequest) {
    setIsLoading(true);
    const moviesList = JSON.parse(localStorage.getItem('favMovieList'));
    if (moviesList.length === 0) {
      setFilterSavedResult([]);
      setIsLoading(false);
      setNotFoundSavedMovies(true);
      return console.log('список пуст');
    }
    const result = await filter(moviesList, userRequest);
    setFilterSavedResult(result);
    setIsLoading(false);
    setNotFoundSavedMovies(false);
    if (result.length === 0) {
      setNotFoundMovies(true);
    }
  }

  function filter(moviesList, userRequest) {
    if (!moviesList?.length) return console.log('список пуст', moviesList);
    const result = moviesList.filter((movie) => {
      const nameRU = movie.nameRU === null ? '' : movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN === null ? '' : movie.nameEN.toLowerCase();
      const description = movie.description === null ? '' : movie.description.toLowerCase();
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
      .then((res) => {
        setFavList([...favList, res]);
      })
      .catch((err) => console.log(err));
  }

  function removeFav(card) {
    removeMovie(card._id)
      .then(() => {
        setFavList(favList.filter((favCard) => favCard._id !== card._id));
        setFilterSavedResult(favList.filter((favCard) => favCard._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('DELETED!');
  }

  function toggle() {
    setIsShort(!isShort);
  }

  function onSignIn({ email, password }) {
    setIsDisabledForm(true);
    signin({ email, password })
      .then((user) => {
        setCurrentUser({ email: user.email, name: user.name });
        setLoggedIn(true);
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
      .then(() => {
        setCurrentUser({ email: email, name: name });
        setLoggedIn(true);
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
          filterResult: filterResult,
          filterSavedResult: filterSavedResult,
          isLoading: isLoading,
          isDisabledForm: isDisabledForm,
          authErr: authErr,
          updMessage: updMessage,
          updErr: updErr,
          notFoundMovies: notFoundMovies,
          notFoundSavedMovies: notFoundSavedMovies,
          favList: favList,
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
                  cards={filterResult}
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
                  cards={filterSavedResult}
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
