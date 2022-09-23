// import './sass/common.scss';
import galleryMarkup from './js/galleryMarkup';
import NewsApiService from './js/news-service';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  // loadMoreBtn: document.querySelector('.load-more'),
  galleryContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const newsApiService = new NewsApiService();

loadMoreBtn.show();
// loadMoreBtn.disable();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('bred');
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    loadMoreBtn.enable();
    galleryMarkup();
  });
}

function clearArticlesContainer() {
  refs.galleryContainer.innerHTML = '';
}
