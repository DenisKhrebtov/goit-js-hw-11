import axios from 'axios';

const KEY = '30053223-4606077d2ff36cbc858d0fd80';
const URL = 'https://pixabay.com/api';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchArticles() {
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    try {
      const response = await axios.get(
        `?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      this.incrementPage();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
