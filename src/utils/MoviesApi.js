
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}. ${res.body}`);
}

export function getMoviesList() {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      method: 'GET',
      headers: {
    'Content-Type': 'application/json',
  },
    }).then(res => checkResponse(res));
  }
