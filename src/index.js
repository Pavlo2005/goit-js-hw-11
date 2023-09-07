import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

axios.defaults.headers.common["x-api-key"] = "live_sD0BZJV6dCuhWiJggYljYuKDqdstJKqoRhboF4tDcrKwkPUiateuE1o0gLHL6XWl";

const element = {
    form: document.querySelector('.js-form'),
    gallery: document.querySelector('.js-gallery'),
    guard: document.querySelector('.js-gward')
}

let currentPage = 1;
let currentRequest = null;


const options = {
    rootMargin: "300px",
}

const observer = new IntersectionObserver(payload => {
    if (payload[0].isIntersecting) {
        if (currentRequest)
            intersectPictures();
    }
}, options);

let gallerySimpleLightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, });


element.form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(evt) {
    evt.preventDefault();

    if (!evt.currentTarget.elements.searchQuery.value) {
        window.alert("you must write a request");
        return;
    }

    currentPage = 1;
    currentRequest = evt.currentTarget.elements.searchQuery.value;
    element.gallery.innerHTML = "";

    observer.observe(element.guard);
}

async function intersectPictures() {

    try {
        const data = await servicesSearch(currentRequest);

        if (data.total < (currentPage - 1) * 40) {
            window.alert("you have reached the last page");
            return;
        }

        console.log(currentPage);
        console.log(data);
        currentPage += 1;

        const page = await createPictures(data, currentRequest);

        element.gallery.insertAdjacentHTML('beforeend', page);

        gallerySimpleLightbox.refresh();
    } catch (err) {
        console.log(err);
    }
}


async function servicesSearch(value) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '39285173-ea4da0ae6bb26a8edf50191ae';
    const params = new URLSearchParams({
        key: API_KEY,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40
    })

    const resp = await fetch(`${BASE_URL}?${params}`);

    if (!resp.ok) {
        throw new Error(resp.statusText);
    }

    return resp.json();
}

function createPictures(data, currentValue) {
    return data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<li class="gallery__item photo-card">
      <a class="gallery__link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" width="250" height="250" loading="lazy" />
        <div class="info">
          <div class="info-item">
            <p>likes</p>
            <p>${likes}</p>
          </div>
          <div class="info-item">
            <p>views</p>
            <p>${views}</p>
          </div>
          <div class="info-item">
            <p>comments</p>
            <p>${comments}</p>
          </div>
          <div class="info-item">
            <p>downloads</p>
            <p>${downloads}</p>
          </div>
        </div>
    </a>
    </li>`;
    }).join("");
}