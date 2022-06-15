import './css/styles.css';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";


const form = document.querySelector('#search-form');
const galleryImg = document.querySelector('.gallery')

form.addEventListener('submit', onSerch);

let searchQuery = '';

async function onSerch(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value;
    const response = await getImages(searchQuery);
    renderGallery(response.data.hits);
    // let gallery = new SimpleLightbox('.gallery a');
}

async function getImages(query) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=28062260-bbfec586ef8cfde1ee2834ccc&q=${query}&
        page=2&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`);
        return response;    
    } catch (error) {
    console.error(error);
    }
}

function renderGallery(images) {
    console.log(images);
    const markapUl = images
        .map((image) => {
    return `
    <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
galleryImg.innerHTML = markapUl
}

// function renderGallery(images) {
//     console.log(images);
//     const markapUl = images
//         .map((image) => {
//     return `
//     <div class="gallery__item">
//         <a class="gallery__link" href="${image.largeImageURL}">
//             <img
//                 class="gallery__image"
//                 src="${image.webformatURL}"
//                 data-source="${image.largeImageURL}"
//                 alt="${image.tags}"
//                 loading="lazy"
//             />
//         </a>        
//         <div class="info">
//         <p class="info-item">
//             <b>Likes: ${image.likes}</b>
//         </p>
//         <p class="info-item">
//             <b>Views: ${image.views}</b>
//         </p>
//         <p class="info-item">
//             <b>Comments: ${image.comments}</b>
//         </p>
//         <p class="info-item">
//             <b>Downloads: ${image.downloads}</b>
//         </p>
//         </div>
//     </div>`;
//     }).join("");
//     galleryImg.innerHTML = markapUl    
// }




