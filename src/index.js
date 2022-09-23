// import './sass/common.scss';
import { galleryMarkup } from './js/galleryMarkup';
import NewsApiService from './js/news-service';
import { searchForm, galleryContainer, loadMoreBtn } from './js/refs';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = {};

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   hidden: true,
// });
const newsApiService = new NewsApiService();

// loadMoreBtn.show();
// loadMoreBtn.disable();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  newsApiService.resetPage();
  clearArticlesContainer();
  loadMoreBtn.classList.add('is-hidden');
  newsApiService.searchQuery = e.currentTarget.elements.query.value.trim();

  if (!newsApiService.searchQuery) {
    Notiflix.Notify.warning('please write smth');
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  const backEndFiles = await newsApiService.fetchArticles();

  galleryMarkup(backEndFiles.data.hits);
  onSearchControl(backEndFiles);
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  searchForm.reset();
}

function clearArticlesContainer() {
  galleryContainer.innerHTML = '';
}
async function onLoadMore() {
  const backEndFiles = await newsApiService.fetchArticles();
  galleryMarkup(backEndFiles.data.hits);
  if (newsApiService.page === 13) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  } else if (
    backEndFiles.data.hits.length >= 0 &&
    backEndFiles.data.hits.length < 40
  ) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
  lightbox.refresh();
}

function onSearchControl(dataFromBack) {
  if (dataFromBack.data.totalHits === 0) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (
    dataFromBack.data.totalHits > 0 &&
    dataFromBack.data.totalHits <= 40
  ) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.success(
      `Hooray! We found ${dataFromBack.data.totalHits} images.`
    );
  } else if (
    dataFromBack.data.totalHits > 40 &&
    dataFromBack.data.totalHits <= 500
  ) {
    loadMoreBtn.classList.remove('is-hidden');
    Notiflix.Notify.success(
      `Hooray! We found ${dataFromBack.data.totalHits} images.`
    );
  }
}
