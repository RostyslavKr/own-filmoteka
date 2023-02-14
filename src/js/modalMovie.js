import MovieApi from './fetchApi';
import { checkGenreByIdForModal } from './checkGenres';

const movieImage = document.querySelector('.list-movies');
const backdropMovie = document.querySelector('.backdrop-movie');
const closeModalMovieBtn = document.querySelector('.btnCloseModalMovie');
const movieWrapper = document.querySelector('.movie-wrapper');

const movieApi = new MovieApi();

movieImage.addEventListener('click', openModalMovie);

function openModalMovie(e) {
  closeModalMovieBtn.addEventListener('click', closeModalMovie);
  if (e.target.classList.value === 'img-movie') {
    backdropMovie.classList.toggle('is-hidden');
    backdropMovie.addEventListener('click', closeBackdrop);
    document.addEventListener('keydown', closeEsc);
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
  backdropMovie.removeEventListener('click', closeBackdrop);
  document.removeEventListener('keydown', closeEsc);
  closeModalMovieBtn.removeEventListener('click', closeModalMovie);
}

function closeBackdrop(e) {
  if (e.target.classList.value !== 'backdrop-movie') {
    return;
  }

  closeModalMovie(e);
}

function closeEsc(e) {
  if (e.key !== 'Escape') {
    return;
  }
  e.stopPropagation();
  closeModalMovie(e);
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
    return `<div class="wrapper-image-movie">
       <img
        id="${movieId}"
        class="image-modal-movie"
        src="${imageSrc}"
        alt="${movieTitle}"
      />
      <button class="btnTrailer btnModal">Trailer</button>
      </div>
      <div class="container-movie-content">
      <h2 class="name-movie">${movieTitle}</h2>
      <table>
        <tr>
          <td class="table-title"><p class="table-titl">Vote / Votes</p></td>
          <td class="table-text"><p class="table-tex">${vote.toFixed(
            1
          )} / ${votes}</p></td>
        </tr>
        <tr>
          <td class="table-title"><p class="table-titl">Popularity</p></td>
          <td class="table-text"><p class="table-tex">${popularity.toFixed(
            1
          )}</p></td>
        </tr>
        <tr>
          <td class="table-title"><p class="table-titl">Original Title</p></td>
          <td class="table-text"><p class="table-tex">${originalTitle}</p></td>
        </tr>
        <tr>
          <td class="table-title"><p class="table-titl">Genre</p></td>
          <td class="table-text"><p class="table-tex">${checkGenreByIdForModal(
            obj
          )}</p></td>
        </tr>
      </table>
      <h3 class="about">About</h3>
      <p class="desribe-movie">
       ${describe}
      </p>
      <div class="wrapper-btn">
        <button class="btnAddWatched btnModal">Add To Watched</button>
        <button class="btnAddQueue btnModal">Add To Queue</button>
      </div>
      
      </div>`;
  };

  movieWrapper.insertAdjacentHTML('beforeend', markup(results));
}

function clearPage() {
  movieWrapper.innerHTML = '';
}
