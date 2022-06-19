import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('#search-form');
const galleryImg = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more')

form.addEventListener('submit', onSerch);
loadMore.addEventListener('click', onLoadMore)

let searchQuery = '';
let pageNumber = 1;
let totalPage = 1;
let perPage = 40;
let gallery = new SimpleLightbox('.gallery a');

async function onSerch(e) {
    e.preventDefault();
    galleryImg.innerHTML = "";
    pageNumber = 1;
    loadMore.style.display = "none";
    searchQuery = e.currentTarget.elements.searchQuery.value;
    const response = await getImages(searchQuery);
    totalPage = Math.ceil(response.data.totalHits / perPage);    
    if (response.data.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        renderGallery(response.data.hits);
        gallery.refresh()
    } else {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }    
    
}

async function getImages(query) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=28062260-bbfec586ef8cfde1ee2834ccc&q=${query}&page=${pageNumber}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`);
        pageNumber += 1;        
        return response;    
    } catch (error) {
    console.error(error);
    }
}

async function onLoadMore() {
    loadMore.style.display = "none";
    const response = await getImages(searchQuery);
    renderGallery(response.data.hits);
    gallery.refresh()
    if (pageNumber > totalPage) {
        loadMore.style.display = "none";
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
}

function renderGallery(images) {    
    loadMore.style.display = "block";
    const markapUl = images
        .map((image) => {
    return `
    <div class="photo-card">
        <a class="gallery__link" href="${image.largeImageURL}"><img class="gallery__image"  src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes: ${image.likes}</b>
        </p>
        <p class="info-item">
            <b>Views: ${image.views}</b>
        </p>
        <p class="info-item">
            <b>Comments: ${image.comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${image.downloads}</b>
        </p>
        </div>
    </div>`;
    }).join("");
    galleryImg.insertAdjacentHTML('beforeend', markapUl)    
}





