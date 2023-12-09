async function getPhotographers() {
    // JSON Fetch
    const response = await fetch("./data/photographers.json");
    return response.json();
}

function getUrlId() {
    // Retrieving the photographer's ID
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

function findPhotographer(photographers, urlId) {
    // Selection of the photographer based on his ID
    return photographers.find(item => item.id == urlId);
}

function displayHeader(photographer) {
    // DOM elements
    const photographHeader = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");

    // Header construction
    const { getProfileDOM, getProfilePic } = photographerTemplate(photographer);
    photographHeader.insertBefore(getProfileDOM(), contactButton);
    photographHeader.appendChild(getProfilePic());
}

function filterMedias(media, urlId) {
    // Selection of medias based on the photographer's ID
    return media.filter(item => item.photographerId == urlId);
}

function displayMedias(photographerMedias) {
    // DOM elements
    const portfolioGrid = document.querySelector(".portfolio-grid");
    portfolioGrid.innerHTML = "";

    // Grid construction
    photographerMedias.forEach((media, i) => {
        const { getPortfolioDOM } = photographerTemplate(media);
        const mediasGrid = getPortfolioDOM(i);
        portfolioGrid.appendChild(mediasGrid);

        mediasGrid.firstChild.addEventListener('click', () => {
            displayLightbox(media, i, photographerMedias);
        })
        mediasGrid.firstChild.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                displayLightbox(media, i, photographerMedias);
            }
        });
        
    });
}

function getPhotographerLikes(medias){
    // Calculate total number of photographer's likes
    const totalLikes = medias.map(media => media.likes);
    return totalLikes.reduce((a,b) => a + b, 0);
}

function displayValue(photographer, sumLikes) {
    // DOM Element
    const photographerValue = document.querySelector(".photographer-value");

    // Value content construction
    const { getValueDOM } = photographerTemplate(photographer);
    photographerValue.appendChild(getValueDOM(sumLikes));
}

// Lightbox
function setLightboxMedia(mediaToDisplay, mediaIndex, medias) {
    const image = medias[mediaIndex].image;

    const fromLightbox = true;
    const lightboxModel = photographerTemplate(mediaToDisplay);
    const mediaElement = lightboxModel.getMediaDOM(image, fromLightbox);

    return mediaElement;
}

function displayLightbox(media, i, medias) {
    resetLightboxMedia();
    const lightboxModal = document.getElementById('lightbox_modal');
    const lightboxMedia = document.getElementById('lightbox_media');
    
    // Get the focus in the lightbox
    // const closeIcon = document.querySelector('.lightbox__buttons--close');
    // closeIcon.focus();

    main.setAttribute("aria-hidden", "true");
    lightboxModal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
    lightboxModal.style.display = "flex";

    const mediaElement = setLightboxMedia(media, i, medias);
    const lightboxModel = photographerTemplate(media);
    const mediaLightbox = lightboxModel.getLightboxDOM(i, mediaElement);
    lightboxMedia.appendChild(mediaLightbox);

    currentIndex = i;  // Set currentIndex when opening the lightbox

    const arrowPrev = document.querySelector(".lightbox__buttons--prev");
    const arrowNext = document.querySelector(".lightbox__buttons--next");

    arrowPrev.addEventListener("click", () => {
        lightboxPrev(medias);
    });
    arrowNext.addEventListener("click", () => {
        lightboxNext(medias);
    });

    function keydownHandler(e) {
        switch (e.key) {
            case 'Escape':
            case 'Esc':
                closeLightbox();
                break;
            case 'ArrowLeft':
                lightboxPrev(medias);
                break;
            case 'ArrowRight':
                lightboxNext(medias);
                break;
        }
    }
    document.addEventListener('keydown', keydownHandler);
}

function resetLightboxMedia() {
    const lightboxMedia = document.getElementById('lightbox_media');
    lightboxMedia.innerHTML = '';
}

function closeLightbox(){
    // DOM
    const lightboxModal = document.getElementById('lightbox_modal');

    main.setAttribute("aria-hidden", "false"); // reveal main content for Assistive Technologies
    lightboxModal.setAttribute("aria-hidden", "true"); // hide modal for AT
    body.style.overflow = "auto"; // Allow scrolling
    lightboxModal.style.display = "none"; // Hide modal
    
    resetLightboxMedia();
}

function lightboxPrev(medias) {
    const lightboxMedia = document.getElementById('lightbox_media');
    resetLightboxMedia();
    currentIndex = (currentIndex - 1 + medias.length) % medias.length;
    const mediaElement = setLightboxMedia(medias[currentIndex], currentIndex, medias);
    const lightboxModel = photographerTemplate(medias[currentIndex]);
    const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
    lightboxMedia.appendChild(mediaLightbox);
}

function lightboxNext(medias) {
    const lightboxMedia = document.getElementById('lightbox_media');
    resetLightboxMedia();
    currentIndex = (currentIndex + 1 + medias.length) % medias.length;
    const mediaElement = setLightboxMedia(medias[currentIndex], currentIndex, medias);
    const lightboxModel = photographerTemplate(medias[currentIndex]);
    const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
    lightboxMedia.appendChild(mediaLightbox);
}

// Dropdown and sort
function toggleDropdown(){
    const dropdown = document.querySelector(".sorting-dropdown");
    dropdown.classList.toggle("unrolled");

}

function hideButton(button){
    displayButton();
    button.classList.add("hidden");
    button.setAttribute("aria-hidden", "true");

    // Then close dropdown
    toggleDropdown();

}

function changeDropdownTitle(button){
    const dropdownTitleElement = document.querySelector(".dropdown-title");
    dropdownTitleElement.textContent = button.textContent;

    // Then hide button
    hideButton(button);

}

function displayButton(){
    const hiddenButton = document.querySelector(".hidden");
    hiddenButton.removeAttribute("aria-hidden");
    hiddenButton.classList.remove("hidden");
}

async function sortByPopularity(){
    const button = document.getElementById("sort-popularity");
    changeDropdownTitle(button);

    const urlId = getUrlId();
    const { media } = await getPhotographers();
    const photographerMedias = filterMedias(media, urlId);
    const sortedMedias = photographerMedias.sort((a, b) => b.likes - a.likes);
    displayMedias(sortedMedias);
}    

async function sortByName(){
    const button = document.getElementById("sort-name");
    changeDropdownTitle(button);

    const urlId = getUrlId();
    const { media } = await getPhotographers();
    const photographerMedias = filterMedias(media, urlId);
    const sortedMedias = photographerMedias.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });
    displayMedias(sortedMedias);
}

async function sortByDate(){
    const button = document.getElementById("sort-date");
    changeDropdownTitle(button);

    const urlId = getUrlId();
    const { media } = await getPhotographers();
    const photographerMedias = filterMedias(media, urlId);
    const sortedMedias = photographerMedias.sort((a, b) => b.date - a.date).reverse();
    console.log(sortedMedias)
    displayMedias(sortedMedias);
}    

async function init() {
    const { photographers, media } = await getPhotographers();
    const urlId = getUrlId();
    const photographer = findPhotographer(photographers, urlId);

    displayHeader(photographer);

    const photographerMedias = filterMedias(media, urlId);
    displayMedias(photographerMedias);

    const sumLikes = getPhotographerLikes(photographerMedias);
    displayValue(photographer, sumLikes);
}

init();