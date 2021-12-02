
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}. ${res.body}`);
}

export async function getMoviesList() {
    const res = await fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(res);
  }
