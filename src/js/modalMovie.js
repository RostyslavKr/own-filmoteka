import MovieApi from './fetchApi';
import { checkGenreByIdForModal } from './checkGenres';
const movieImage = document.querySelector('.list-movies');
const backdropMovie = document.querySelector('.backdrop-movie');
const closeModalMovieBtn = document.querySelector('.btnCloseModalMovie');
const movieWrapper = document.querySelector('.movie-wrapper');
const movieApi = new MovieApi();
console.log(movieImage);
movieImage.addEventListener('click', openModalMovie);

function openModalMovie(e) {
  closeModalMovieBtn.addEventListener('click', closeModalMovie);
  if (e.target.classList.value === 'img-movie') {
    backdropMovie.classList.toggle('is-hidden');
    const movieId = e.target.id;
    console.log(movieId);
    movieApi.getIdMovie(movieId);
    movieApi.fetchMovieById().then(data => {
      createModalMovieMarkup(data);
    });
  }
}

function closeModalMovie(e) {
  backdropMovie.classList.toggle('is-hidden');
  clearPage();
  closeModalMovieBtn.removeEventListener('click', closeModalMovie);
}

function createModalMovieMarkup(results) {
  const markup = obj => {
    checkGenreByIdForModal(obj);
    const movieId = obj.id;
    const movieTitle = obj.title;
    const vote = obj.vote_average;
    const votes = obj.vote_count;
    const popularity = obj.popularity;
    const originalTitle = obj.original_title;
    const describe = obj.overview;
    const backdropPath = obj.backdrop_path;
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    const urlBackdrop = `https://image.tmdb.org/t/p/original/${backdropPath}`;
    backdropMovie.style.backgroundImage = `url(${urlBackdrop})`;
    let imageSrc = '';
    if (obj.poster_path) {
      imageSrc = `${imageUrl}${obj.poster_path}`;
    } else {
      imageSrc = 'no_image';
    }
    return `<img
        id="${movieId}"
        class="image-modal-movie"
        src="${imageSrc}"
        alt="${movieTitle}"
      />
      <div class="container-movie-content">
      <h2 class="name-movie">${movieTitle}</h2>
      <table>
        <tr>
          <td class="table-title">Vote / Votes</td>
          <td class="table-text">${vote.toFixed(1)} / ${votes}</td>
        </tr>
        <tr>
          <td class="table-title">Popularity</td>
          <td class="table-text">${popularity.toFixed(1)}</td>
        </tr>
        <tr>
          <td class="table-title">Original Title</td>
          <td class="table-text">${originalTitle}</td>
        </tr>
        <tr>
          <td class="table-title">Genre</td>
          <td class="table-text">${checkGenreByIdForModal(obj)}</td>
        </tr>
      </table>
      <h3 class="about">About</h3>
      <p class="desribe-movie">
       ${describe}
      </p>
      <div>
        <button class="btnAddWatched">Add Watched</button>
        <button class="btnAddQueue">Add Queue</button>
      </div>
      <button class="btnTrailer">Trailer</button>
      </div>`;
  };
  console.log(results);
  //   const markups = results.map(markup).join('');
  movieWrapper.insertAdjacentHTML('beforeend', markup(results));
}

function clearPage() {
  movieWrapper.innerHTML = '';
}
