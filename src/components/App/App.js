import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';


function App() {
  

  return (
    <Routes>
      <Route exact path='/' element={<Main />}></Route>
      <Route exact path='/movies' element={<Movies />}></Route>
      <Route exact path='/saved-movies' element={<SavedMovies />}></Route>
      <Route exact path='/profile' element={<Profile />}></Route>
      <Route exact path='/signup' element={<Register />}></Route>
      <Route exact path='/signin' element={<Login />}></Route>
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
