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
    const medias = media.filter(item => item.photographerId == urlId);
    return medias;
}

function displayMedias(medias) {
    // Recuperation des elements du DOM
    const portfolioGrid = document.querySelector(".portfolio-grid");

    // Construction de la grille
    medias.forEach((media, i) => {
        const gridModel = photographerTemplate(media);
        const mediasGrid = gridModel.getPortfolioDOM();
        mediasGrid.dataset.index = i;
        portfolioGrid.appendChild(mediasGrid);

        mediasGrid.addEventListener('click', () => {
            displayLightbox(media, i, medias);
        })
    });
}

function displayLightbox(media, i, medias){
    // DOM
    const lightboxModal = document.getElementById('lightbox_modal');
    const lightboxMedia = document.getElementById('lightbox_media');

    main.setAttribute("aria-hidden", "true"); // Hide main content for Assistive Technologies
    lightboxModal.setAttribute("aria-hidden", "false"); // Show modal for AT
    body.style.overflow = "hidden"; // Prevent scrolling
    lightboxModal.style.display = "flex"; // Show modal

    const lightboxModel = photographerTemplate(media);
    const mediaLightbox = lightboxModel.getLightboxDOM(i);
    lightboxMedia.appendChild(mediaLightbox);

    // Buttons
    const arrowPrev = document.querySelector(".lightbox-prev");
    const arrowNext = document.querySelector(".lightbox-next");

    arrowPrev.addEventListener("click", () => {
        console.log("button pressed");
        lightboxPrev(i, medias);
    }, { once: true });

    arrowNext.addEventListener("click", () => {
        console.log("button pressed");
        lightboxNext(i, medias);
    }, { once: true });

    // Keyboard
    function keydownHandler(e) {
        switch (e.key){
            case 'Escape':
            case 'Esc':
                closeLightbox();
                break;
            case 'ArrowLeft':
                console.log("key pressed");
                lightboxPrev(i, medias);
                break;
            case 'ArrowRight':
                console.log("key pressed");
                lightboxNext(i, medias);
                break;
        }
    }
    document.addEventListener('keydown', keydownHandler, { once: true});
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

function resetLightboxMedia() {
    const lightboxMedia = document.getElementById('lightbox_media');
    lightboxMedia.innerHTML = '';
}


function lightboxPrev(currentIndex, medias){
    // Subtract 1 to get the index of the previous media
    const prevIndex = (currentIndex - 1 + medias.length) % medias.length;
        
    // Reset lightbox content
    resetLightboxMedia();

    // Display previous media
    displayLightbox(medias[prevIndex], prevIndex, medias);    
}

function lightboxNext(currentIndex, medias){
    // Add 1 to get the index of the next media
    const nextIndex = (currentIndex + 1 + medias.length) % medias.length;

    // Reset lightbox content
    resetLightboxMedia();

    // Display next media
    displayLightbox(medias[nextIndex], nextIndex, medias);
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
    const medias = filterMedias(media, urlId);
    displayMedias(medias);
    const sumLikes = getPhotographerLikes(medias);
    displayValue(photographer, sumLikes);
}

init();

