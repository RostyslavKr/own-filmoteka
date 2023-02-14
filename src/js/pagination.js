import MovieApi from './fetchApi';
import { createMarkup, clearPage } from './movieMarkup';
const paginationLists = document.querySelector('.pagination-list');
const maxPageBtnEl = document.querySelector('.max-page-btn');
const arrowLeftEl = document.querySelector('.item-arrow-left');
const pointsEl = document.querySelector('.points');
const endPoints = document.querySelector('.end-points');
const arrofRightEl = document.querySelector('.next-btn');

const refs = {
  firstBtn: document.querySelector('.first-btn'),
  secondBtn: document.querySelector('.second-btn'),
  thirdBtn: document.querySelector('.third-btn'),
  currentBtn: document.querySelector('.js-current-btn'),
  fifthBtn: document.querySelector('.fifth-btn'),
  sixthBtn: document.querySelector('.sixth-btn'),
};
console.log(refs.firstBtn);
const movieApi = new MovieApi();

paginationLists.addEventListener('click', onClickPagination);
checkNunberPage();
checkCurrentPage();
movieApi.fetchMoviesWeek().then(data => {
  maxPageBtnEl.textContent = data.total_pages;
  console.log(maxPageBtnEl.textContent);
});

function onClickPagination(e) {
  console.log(e.target.classList);

  if (e.target.classList.contains('first-btn')) {
    movieApi.resetPage();
    checkNunberPage();
    checkCurrentPage();
    clearPage();
    movieApi.fetchMoviesWeek().then(data => {
      createMarkup(data.results);
    });
    endPoints.style.display = 'inline';
    arrofRightEl.style.display = 'block';
    maxPageBtnEl.classList.remove('currentBtnColor');
    buttonMarkup(4);
  }
  if (e.target.classList.contains('max-page-btn')) {
    movieApi.currentPage(maxPageBtnEl.textContent);
    clearPage();
    checkNunberPage();
    checkCurrentPage();
    console.log(movieApi.maxPages);
    movieApi.fetchMoviesWeek().then(data => {
      createMarkup(data.results);
    });
    buttonMarkup(e.target.textContent);
    refs.currentBtn.classList.remove('currentBtnColor');
    maxPageBtnEl.classList.add('currentBtnColor');
    endPoints.style.display = 'none';
    arrofRightEl.style.display = 'none';
  }
  if (e.target.classList.contains('next-btn')) {
    movieApi.incrementPage();
    clearPage();
    checkNunberPage();
    checkCurrentPage();
    movieApi.fetchMoviesWeek().then(data => {
      console.log(data);
      createMarkup(data.results);
    });
    buttonMarkup(movieApi.page);
  }
  if (e.target.classList.contains('per-btn')) {
    movieApi.reductPage();
    clearPage();
    checkNunberPage();
    checkCurrentPage();
    movieApi.fetchMoviesWeek().then(data => {
      console.log(data);
      createMarkup(data.results);
    });
    maxPageBtnEl.classList.remove('currentBtnColor');
    buttonMarkup(movieApi.page);
  }
  if (e.target.classList.contains('main-btn')) {
    movieApi.currentPage(Number(e.target.textContent));
    clearPage();
    movieApi.fetchMoviesWeek().then(data => {
      createMarkup(data.results);
    });
    checkCurrentPage();
    checkNunberPage();
    maxPageBtnEl.classList.remove('currentBtnColor');
    buttonMarkup(e.target.textContent);
  }
}
function checkNunberPage() {
  if (Number(movieApi.page) > 4) {
    arrowLeftEl.style.display = 'block';
    pointsEl.style.display = 'inline';
  }

  if (Number(movieApi.page) <= 4) {
    arrowLeftEl.style.display = 'none';
    pointsEl.style.display = 'none';
  }
  if (Number(movieApi.page) <= 995) {
    endPoints.style.display = 'inline';
    arrofRightEl.style.display = 'block';
  }
  if (Number(movieApi.page) > 995) {
    endPoints.style.display = 'none';
    arrofRightEl.style.display = 'none';
  }
}

function buttonMarkup(currentNumber) {
  const mainNumber = Number(currentNumber);
  const differenceMaxPages = Number(movieApi.maxPages) - 4;
  console.log(differenceMaxPages);
  if (currentNumber < 3) {
    return;
  }
  if (mainNumber >= differenceMaxPages) {
    maxPageBtnEl.textContent = movieApi.maxPages;
    refs.sixthBtn.textContent = Number(movieApi.maxPages) - 1;
    refs.fifthBtn.textContent = Number(movieApi.maxPages) - 2;
    refs.currentBtn.textContent = Number(movieApi.maxPages) - 3;
    refs.thirdBtn.textContent = Number(movieApi.maxPages) - 4;
    refs.secondBtn.textContent = Number(movieApi.maxPages) - 5;
    return;
  }
  if (currentNumber == 3) {
    refs.currentBtn.textContent = 4;
    refs.secondBtn.textContent = 2;
    refs.thirdBtn.textContent = 3;
    refs.fifthBtn.textContent = 5;
    refs.sixthBtn.textContent = 6;
    return;
  }
  if (currentNumber == movieApi.maxPages) {
    maxPageBtnEl.textContent = mainNumber;
    refs.sixthBtn.textContent = Number(mainNumber) - 1;
    refs.fifthBtn.textContent = Number(mainNumber) - 2;
    refs.currentBtn.textContent = Number(mainNumber) - 3;
    refs.thirdBtn.textContent = Number(mainNumber) - 4;
    refs.secondBtn.textContent = Number(mainNumber) - 5;
    return;
  }

  console.log(currentNumber);

  refs.currentBtn.textContent = mainNumber;
  refs.secondBtn.textContent = Number(mainNumber) - 2;
  refs.thirdBtn.textContent = Number(mainNumber) - 1;
  refs.fifthBtn.textContent = Number(mainNumber) + 1;
  refs.sixthBtn.textContent = Number(mainNumber) + 2;
}

function checkCurrentPage() {
  if (movieApi.page == 1) {
    refs.firstBtn.classList.add('currentBtnColor');
  }
  if (movieApi.page != 1) {
    refs.firstBtn.classList.remove('currentBtnColor');
  }
  if (movieApi.page == 2) {
    refs.secondBtn.classList.add('currentBtnColor');
  }
  if (movieApi.page != 2) {
    refs.secondBtn.classList.remove('currentBtnColor');
  }
  if (movieApi.page == 3) {
    return refs.thirdBtn.classList.add('currentBtnColor');
  }
  if (movieApi.page != 3) {
    refs.thirdBtn.classList.remove('currentBtnColor');
  }

  if (movieApi.page < 4) {
    refs.currentBtn.classList.remove('currentBtnColor');
  }
  if (movieApi.page == movieApi.maxPages - 1) {
    refs.sixthBtn.classList.add('currentBtnColor');
  }
  if (movieApi.page != movieApi.maxPages - 1) {
    refs.sixthBtn.classList.remove('currentBtnColor');
  }
  if (movieApi.page == movieApi.maxPages - 2) {
    refs.fifthBtn.classList.add('currentBtnColor');
  }
  if (movieApi.page != movieApi.maxPages - 2) {
    refs.fifthBtn.classList.remove('currentBtnColor');
  }
  if (movieApi.page == movieApi.maxPages - 3) {
    refs.currentBtn.classList.add('currentBtnColor');
  }
  if (movieApi.page != movieApi.maxPages - 3) {
    refs.currentBtn.classList.remove('currentBtnColor');
  }
  if (movieApi.page == movieApi.maxPages - 5) {
    refs.currentBtn.classList.add('currentBtnColor');
  }

  if (movieApi.page == movieApi.maxPages - 4) {
    refs.thirdBtn.classList.add('currentBtnColor');
  }

  if (movieApi.page != movieApi.maxPages - 4) {
    refs.thirdBtn.classList.remove('currentBtnColor');
  }
  if (movieApi.page >= 4 && movieApi.page <= 994) {
    refs.currentBtn.classList.add('currentBtnColor');
  }
}
