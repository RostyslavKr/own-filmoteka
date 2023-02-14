const axios = require('axios').default;

export default class FetchMovies {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.maxPages = '';
    this.idMovie = '';
  }

  async fetchMoviesWeek() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=7c6a11c2d8e8524ccfd41d8aedf2bd73&page=${this.page}`;

    try {
      const response = await axios.get(url);

      const data = response.data;
      this.maxPages = data.total_pages;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchGeners() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=7c6a11c2d8e8524ccfd41d8aedf2bd73&language=en-US'
    );
    return response.data;
  }
  async fetchMovieById() {
    try {
      const r = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.idMovie}?api_key=7c6a11c2d8e8524ccfd41d8aedf2bd73&language=en-US`
      );
      console.log(r);
      return r.data;
    } catch (error) {
      return console.log(error);
    }
  }
  async fetchMoviesForQuery() {
    try {
      const r = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7c6a11c2d8e8524ccfd41d8aedf2bd73&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`
      );
      return r.data;
    } catch (error) {
      console.log(error);
    }
  }

  currentPage(page) {
    this.page = page;
  }

  incrementPage() {
    this.page += 1;
  }
  reductPage() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
  }
  getIdMovie(id) {
    this.idMovie = id;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
