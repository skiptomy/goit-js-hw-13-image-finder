import './styles.css';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import apiService from './js/apiService.js';
import layoutImageTemplate from './template/imageCards.hbs';
import '../node_modules/pnotify/src/PNotifyBrightTheme.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify';
import * as basicLightbox from 'basiclightbox';

const searchInput = document.querySelector('input[name=query]');
const searchForm = document.querySelector('#search-form');
const loadMore = document.querySelector('button[data-action=load-more]');
const gallery = document.querySelector('.gallery');

let page;

searchForm.addEventListener('submit', searchImages);

function searchImages(e) {
  e.preventDefault();
  cleanDisplay();
  page = 1;
  const name = searchInput.value;
  if (name.length > 2) {
    apiService.searchByName(name, page).then(data => {
      if (data.hits.length >= 1) {
        addImages(data.hits);
        loadMore.classList.remove('is-hidden');
      } else {
        PNotify.alert(`Seems we don\'t know word ${name}`);
      }
    });
  } else {
    PNotify.error(
      'Sorry, but your word is very short and result will be unpredictable',
    );
  }
}

loadMore.addEventListener('click', loadMoreImages);

function loadMoreImages() {
  page++;
  const name = searchInput.value;
  apiService.searchByName(name, page).then(data => {
    addImages(data.hits);
    window.scrollTo({
      top: gallery.scrollHeight,
      behavior: 'smooth',
    });
  });
}

function cleanDisplay() {
  gallery.innerHTML = '';
  loadMore.classList.add('is-hidden');
}

function addImages(images) {
  const markup = layoutImageTemplate(images);
  return gallery.insertAdjacentHTML('beforeend', markup);
}

document.querySelector('.gallery').onclick = e => {

  if (e.target.dataset.src != null) {
    basicLightbox
    .create(
      `
		<img src="${e.target.dataset.src}">
	`,
    )
    .show();
  }
};
