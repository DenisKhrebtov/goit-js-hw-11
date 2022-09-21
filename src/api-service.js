import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '30053223-4606077d2ff36cbc858d0fd80';
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
