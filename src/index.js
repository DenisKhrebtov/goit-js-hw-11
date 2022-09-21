import { ApiService } from './api-service';
import { refs } from './refs';
import { LoadMoreBtn } from './loadMoreBtn';
import { galleryMarkup } from './galleryMarkup';
import jump from 'jump.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', () => {
  fetchImages();
  jump(900);
});

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.target.elements.searchQuery.value.trim();
  if (!apiService.query) {
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }

  loadMoreBtn.show();
  apiService.resetPage();
  clearImageContainer();
  fetchImages();
  e.target.reset();
}

function clearImageContainer() {
  refs.container.innerHTML = '';
}

function fetchImages() {
  loadMoreBtn.disabled();
  apiService
    .fetchImages()
    .then(({ data }) => {
      appendImagesMarkup(data);
      lightbox.refresh();
      notificationMode(data);
    })
    .catch(error => console.log('Error!'));
}

function appendImagesMarkup(data) {
  refs.container.insertAdjacentHTML('beforeend', galleryMarkup(data));
}

function notificationMode(data) {
  const countImages = data.hits.length;
  const maxImages = data.totalHits;
  if (refs.container.children.length > maxImages) {
    loadMoreBtn.hide();
    return Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  } else if (!data.total) {
    loadMoreBtn.hide();
    return Notify.failure(
      `Sorry, there are no images matching your search query: ${apiService.query}. Please try again.`
    );
  } else {
    loadMoreBtn.enable();
    return Notify.success(`Hooray! We found ${countImages} images.`);
  }
}
