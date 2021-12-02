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

export async function signup({name, email, password}) {
  const res = await fetch(`${mainApiBaseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password, name: name }),
    credentials: 'include',
  });
  return checkResponse(res);
};

export async function signin({email, password}) {
  const res = await fetch(`${mainApiBaseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  return checkResponse(res);
};

export async function signout() {
  const res = await fetch(`${mainApiBaseUrl}/signout`, {
    method: 'POST',
    credentials: 'include',
  });
  return checkResponse(res);
}

export async function getUser() {
  const res = await fetch(`${mainApiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(res);
};

export async function updateUser(email, name) {
  const res = await fetch(`${mainApiBaseUrl}/users/me`, {
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
  });
  return checkResponse(res);
};

export async function getMovies() {
  const res = await fetch(`${mainApiBaseUrl}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(res);
};

export async function addMovie({
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
  const res = await fetch(`${mainApiBaseUrl}/movies`, {
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
      image: image.url,
      trailer: trailerLink,
      thumbnail: image.formats.thumbnail.url,
      movieId: id,
      nameRU: nameRU,
      nameEN: nameEN,
    }),
    credentials: 'include',
  });
  return checkResponse(res);
};

export async function removeMovie(id) {
  const res = await fetch(`${mainApiBaseUrl}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return checkResponse(res);
};

export async function checkAuth() {
  const res = await fetch(`${mainApiBaseUrl}/users/me`, {
    method: 'POST',
    credentials: 'include',
  });
  return checkResponse(res);
}
