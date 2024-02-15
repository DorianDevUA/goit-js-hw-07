import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryList = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join('');
}

function renderGallery(gallery) {
  const markup = createGalleryMarkup(galleryItems);
  gallery.insertAdjacentHTML('beforeend', markup);
}

renderGallery(galleryList);

galleryList.addEventListener('click', onGalleryItemClick);

let instance;

function onGalleryItemClick(evt) {
  evt.preventDefault();
  const { target } = evt;

  if (!target.classList.contains('gallery__image')) {
    return;
  }

  const largeImageURL = target.dataset.source;
  openLightbox(largeImageURL);
}

function onEscapeKeyPress(evt) {
  const isLightboxVisible = instance.visible();
  if (evt.code === 'Escape' && isLightboxVisible) {
    closeLightbox();
  }
}

function openLightbox(ImageURL) {
  instance = basicLightbox.create(`
    <img src="${ImageURL}" width="800" height="600">
  `);
  instance.show();

  document.addEventListener('keydown', onEscapeKeyPress);
}

function closeLightbox() {
  instance.close();

  document.removeEventListener('keydown', onEscapeKeyPress);
}
