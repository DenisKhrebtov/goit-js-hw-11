import indexJS from '../index.js';

function galleryMarkup(arr, gallery) {
  const markup = arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a class="gallery-item" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" 
    />
    </a>
    <div class="info">
    <p class="info-item">
        <b>Likes: </b></br>${likes}
    </p>
    <p class="info-item">
        <b>Views: </b></br>${views}
    </p>
    <p class="info-item">
        <b>Comments: </b></br>${comments}
    </p>
    <p class="info-item">
        <b>Downloads: </b></br>${downloads}
    </p>
    </div></div></li>`;
      }
    )
    .join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}
