const axios = require('axios').default;

export default class FetchMovies {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.idMovie = '';
  }

  async fetchMoviesWeek() {
    const url =
      'https://api.themoviedb.org/3/trending/movie/week?api_key=7c6a11c2d8e8524ccfd41d8aedf2bd73';

    try {
      const response = await axios.get(url);

      const data = response.data;

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

  incrementPage(page) {
    this.page = page;
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
