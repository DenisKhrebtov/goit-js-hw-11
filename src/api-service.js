import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '29746791-dee289e667fd9f2b2347eb443';
const PARAMS =
  'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const url = `/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${PARAMS}`;
      const response = await axios.get(url);
      this.incrementPage();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

export { ApiService };
