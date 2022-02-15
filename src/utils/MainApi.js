import { mainApiBaseUrl } from './const';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(identifyError(res.status));
}

function identifyError(status) {
  switch (status) {
    case 400:
      return 'Некорректные данные.';
    case 404:
      return 'страница не найдена';
    case 409:
      return 'Такой пользователь уже существует.';
    case 401:
      return 'Не удалось авторизоваться. Попробуйте залогиниться заново.';
    case 403:
      return 'Нет доступа';
    default:
      return `Ошибка: ${status}`;
  }
};

export function signup({name, email, password}) {
  return fetch(`${mainApiBaseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password, name: name }),
    credentials: 'include',
  }).then(res => checkResponse(res));
};

export function signin({email, password}) {
  return fetch(`${mainApiBaseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(res => checkResponse(res));
};

export function signout() {
  return fetch(`${mainApiBaseUrl}/signout`, {
    method: 'POST',
    credentials: 'include',
  }).then(res => checkResponse(res));
}

export function getUser() {
  return fetch(`${mainApiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => checkResponse(res));
};

export function updateUser(email, name) {
  return fetch(`${mainApiBaseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: name,
    }),
    credentials: 'include',
  }).then(res => checkResponse(res));
};

export function getMovies() {
  return fetch(`${mainApiBaseUrl}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => checkResponse(res));
};

export function addMovie({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  id,
  nameRU, nameEN
}) {
  return fetch(`${mainApiBaseUrl}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: `https://api.nomoreparties.co${image.url}`,
      trailer: trailerLink,
      thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
      movieId: id,
      nameRU: nameRU,
      nameEN: nameEN,
    }),
    credentials: 'include',
  }).then(res => checkResponse(res));
};

export function removeMovie(id) {
  return fetch(`${mainApiBaseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => checkResponse(res));
};

export function checkAuth() {
  return fetch(`${mainApiBaseUrl}/users/me`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
    return true;
    }
    if (res.status === 401) {
      return false;
    }
  return Promise.reject(identifyError(res.status));
  });
}
