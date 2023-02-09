import MovieApi from './fetchApi';

const listMovies = document.querySelector('.js-home-main');
const movieApi = new MovieApi();

movieApi.fetchMoviesWeek().then(data => createMarkup(data.results));
movieApi.fetchGeners().then(data => {
  console.log(data);
  genresMovies(data.genres);
});
function createMarkup(results) {
  console.log(results);

  const markup = results
    .map(
      ({
        id,
        poster_path,
        title,
        release_date,
        genre_ids,
      }) => `<li class="item-movies" id="${id}">
        <img class="img-movie" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />

        <h2 class="title-movie">${title}</h2>
        <p class="genre-movie">${genre_ids} | ${release_date}</p>
      </li>`
    )
    .join('');
  listMovies.insertAdjacentHTML('beforeend', markup);
}

function genresMovies(genres) {
  localStorage.setItem('GENRES-MOVIES', JSON.stringify(genres));
}
