import { moviesList } from './delConst';
const movie = {
  id: 1,
  nameRU: '«Роллинг Стоунз» в изгнании',
  nameEN: 'Stones in Exile',
  director: 'Стивен Кайак ',
  year: '2010',
  duration: 61,
  description: 'g',
};
const userRequest = '';
localStorage.setItem('moviesList', JSON.stringify(moviesList));

const shortMovies = moviesList.filter(movie => movie.duration <= 40);
console.log(shortMovies);

const { nameRU, nameEN, year, description } = movie;
if (
  nameRU.includes(userRequest) ||
  nameEN.includes(userRequest) ||
  description.includes(userRequest) ||
  year === userRequest
)
  return true;
