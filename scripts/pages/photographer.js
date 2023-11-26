async function getPhotographers() {
    // Recuperation du JSON
    const reponse = await fetch("./data/photographers.json");
    const photographers = await reponse.json();
    return photographers;
}

function getUrlId() {
    // Recuperation de l'id du photographe
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlId = urlParams.get('id');
    return urlId
}

function findPhotographer(photographers, urlId) {
    // Selection du photographe a partir de son id
    const photographer = photographers.find(item => item.id == urlId);
    return photographer;
}

function displayHeader(photographer) {
    // Recuperation des elements du DOM
    const photographHeader = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");

    // Construction du header
    const photographerModel = photographerTemplate(photographer);
    const profile = photographerModel.getProfileDOM();
    photographHeader.insertBefore(profile, contactButton);

    const profilePic = photographerModel.getProfilePic();
    photographHeader.appendChild(profilePic);
}

function filterMedias(media, urlId) {
    // Selection des photos a partir de l'id du photographe
    const photographerMedias = media.filter(item => item.photographerId == urlId);
    return photographerMedias;
}

function displayMedias(medias) {
    // Recuperation des elements du DOM
    const portfolioGrid = document.querySelector(".portfolio-grid");

    // Construction de la grille
    medias.forEach((media, i) => {
        const gridModel = photographerTemplate(media);
        const mediasGrid = gridModel.getPortfolioDOM();
        portfolioGrid.appendChild(mediasGrid);

        mediasGrid.addEventListener('click', () => {
            displayLightbox(media, i, medias);
        })
    });
}

function getPhotographerLikes(medias){
    const totalLikes = medias.map(media => media.likes);
    const sumLikes = totalLikes.reduce((a,b) => a + b, 0);
    return sumLikes;
}

function displayValue(photographer, sumLikes) {
    const photographerValue = document.querySelector(".photographer-value");
    const valueContent = photographerTemplate(photographer).getValueDOM(sumLikes);
    photographerValue.appendChild(valueContent);
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

function setLightboxMedia(mediaToDisplay, mediaIndex, medias) {
    const image = medias[mediaIndex].image;

    const fromLightbox = true;
    const lightboxModel = photographerTemplate(mediaToDisplay);
    const mediaElement = lightboxModel.getMediaDOM(image, fromLightbox);

    return mediaElement;
}

function displayLightbox(media, i, medias) {
    const lightboxModal = document.getElementById('lightbox_modal');
    const lightboxMedia = document.getElementById('lightbox_media');

    main.setAttribute("aria-hidden", "true");
    lightboxModal.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
    lightboxModal.style.display = "flex";

    const mediaElement = setLightboxMedia(media, i, medias);
    const lightboxModel = photographerTemplate(media);
    const mediaLightbox = lightboxModel.getLightboxDOM(i, mediaElement);
    lightboxMedia.appendChild(mediaLightbox);

    currentIndex = i;  // Set currentIndex when opening the lightbox

    const arrowPrev = document.querySelector(".lightbox-prev");
    const arrowNext = document.querySelector(".lightbox-next");

    arrowPrev.addEventListener("click", () => {
        console.log("button pressed");
        lightboxPrev(medias);
    });
    arrowNext.addEventListener("click", () => {
        console.log("button pressed");
        lightboxNext(medias);
    });

    function keydownHandler(e) {
        switch (e.key) {
            case 'Escape':
            case 'Esc':
                closeLightbox();
                break;
            case 'ArrowLeft':
                console.log("left key pressed");
                lightboxPrev(medias);
                break;
            case 'ArrowRight':
                console.log("right key pressed");
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

// https://www.figma.com/file/liUwMx1Nqqcl8BgUqE5j9W/P6?type=whiteboard&node-id=0%3A1&t=irGpXMaSoR9OPbnQ-1