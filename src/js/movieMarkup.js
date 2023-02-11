import MovieApi from './fetchApi';
import { checkGenreByID } from './checkGenres';

const listMovies = document.querySelector('.js-home-main');
const searchMovie = document.querySelector('.js-search-form');
const movieApi = new MovieApi();
searchMovie.addEventListener('submit', searchMovieForQuery);
movieApi.fetchMoviesWeek().then(data => createMarkup(data.results));
movieApi.fetchGeners().then(data => {
  console.log(data);
  genresMovies(data.genres);
});

function searchMovieForQuery(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements.query.value);
  movieApi.query = e.currentTarget.elements.query.value;
  movieApi.resetPage();
  clearPage();
  movieApi.fetchMoviesForQuery().then(data => {
    console.log(data.results);
    createMarkup(data.results);
  });
}
function createMarkup(results) {
  const markup = obj => {
    checkGenreByID(obj);
    const movieId = obj.id;
    const movieTitle = obj.title;
    const year = obj.release_date || '';
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';

    let imageSrc = '';
    if (obj.poster_path) {
      imageSrc = `${imageUrl}${obj.poster_path}`;
    } else {
      imageSrc = 'no_image';
    }

    return `<li class="item-movies">
        <img id="${movieId}" class="img-movie" src="${imageSrc}" alt="${movieTitle}" />

        <h2 class="title-movie">${movieTitle}</h2>
        <p class="genre-movie">${checkGenreByID(obj)} | ${year.slice(0, 4)}</p>
      </li>`;
  };

  const markups = results.map(markup).join('');
  listMovies.insertAdjacentHTML('beforeend', markups);
}
function genresMovies(genres) {
  localStorage.setItem('GENRES-MOVIES', JSON.stringify(genres));
}
function clearPage() {
  listMovies.innerHTML = '';
}
