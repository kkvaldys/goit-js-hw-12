// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
//імпорт функці з другого файлу
import { imageSearch } from './pixabay-api';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#form');
const loader = document.querySelector('div');
const gallery = document.querySelector('.gallery');
const btnMoreImages = document.querySelector('.load-more');
const btnMoreImages_loader = document.querySelector('span.load');

let pageNum;
let currentQuery;
let renderCount = 0;

//використовую бібліотеку
const lightbox = new SimpleLightbox('.gallery>.item-gallery a', {
  //* options */
  backgroundColor: '#EF4040',
  captionsData: `alt`,
  captionDelay: 250,
});

//навішую подію
form.addEventListener('submit', searchImages);

//функція яка відмальовує сторінку
function addImagesMarcup(
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads
) {
  let markupItem = `
  <li class="item-gallery">
    <a class="load-link" href="${largeImageURL}">
      <img class="load-image" src="${webformatURL}" width="360" alt="${tags}" title="${tags}">
    </a>
    <ul class="load-list">
      <li>
        <h2>Likes</h2>
        <p>${likes}</p>
      </li>
      <li>
        <h2>Views</h2>
        <p>${views}</p>
      </li>
      <li>
        <h2>Comments</h2>
        <p>${comments}</p>
      </li>
      <li>
        <h2>Downloads</h2>
        <p>${downloads}</p>
      </li>
    </ul>
  </li>
`;
  gallery.insertAdjacentHTML('beforeend', markupItem);

  //scrolling
  if (renderCount >= 1) {
    // get height of 1 card
    const galleryItemHeight = document
      .querySelector('.item-gallery')
      .getBoundingClientRect().height;
    // smooth scrolling on height*2
    window.scrollBy({ top: galleryItemHeight * 2, behavior: 'smooth' });
  }
}

//обробка кліка
function searchImages(event) {
  event.preventDefault();
  //тут очищаю перед заповненням
  gallery.innerHTML = '';
  //обнулення на новий запит
  renderCount = 0;

  //зберігаю значення інпута
  currentQuery = form.elements.input.value.trim();

  //очистка інпута
  form.elements.input.value = '';

  //перевірка інпута
  if (currentQuery === '') {
    iziToast.error({
      title: 'Error',
      message: `Please enter a search query.`,
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      titleColor: '#fff',
      progressBarColor: '#B51B1B',
      position: 'topRight',
    });
    //якщо пусте значення
    btnMoreImages.classList.add('is-hidden');

    return;
  }

  //якщо повторний запит після помилки - закрив кнопку
  btnMoreImages.classList.add('is-hidden');

  //включаю лоадер
  loader.classList.add('spinner');
  //тут перша сторінка
  pageNum = 1;
  //пішла обробка
  imageSearch(currentQuery, pageNum)
    .then(response => {
      if (response.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        throw new Error('No images found');
      }
      //відмальовую
      response.hits.map(item =>
        addImagesMarcup(
          item.largeImageURL,
          item.webformatURL,
          item.tags,
          item.likes,
          item.views,
          item.comments,
          item.downloads
        )
      );
      //включаю кнопку
      btnMoreImages.classList.remove('is-hidden');
      //метод рефреш
      lightbox.refresh();
      //коли пошук був успішним
      renderCount++;
    })
    .catch(error => console.log(error))
    .finally(() => {
      loader.classList.remove('spinner');
    });
}

btnMoreImages.addEventListener('click', addMoreImages);

async function addMoreImages() {
  //збільшую сторінку
  pageNum++;

  try {
    btnMoreImages_loader.classList.remove('is-hidden');
    const response = await imageSearch(currentQuery, pageNum);
    //відмальовую
    response.hits.map(item =>
      addImagesMarcup(
        item.largeImageURL,
        item.webformatURL,
        item.tags,
        item.likes,
        item.views,
        item.comments,
        item.downloads
      )
    );
    //метод рефреш
    lightbox.refresh();

    //рахую тотал
    const totalHits = response.totalHits || 0;
    const totalPages = Math.ceil(totalHits / 15); // Розраховуємо загальну кількість сторінок

    //виключаю лоадер
    btnMoreImages_loader.classList.add('is-hidden');
    if (pageNum >= totalPages) {
      btnMoreImages.classList.add('is-hidden'); // Ховаємо кнопку "Load More", якщо це остання сторінка
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#4CAF50',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#4CAF50',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `${error.message || 'Something went wrong'}`,
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      titleColor: '#fff',
      progressBarColor: '#B51B1B',
      position: 'topRight',
    });
  }
}
