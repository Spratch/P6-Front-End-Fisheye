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
            displayLightbox(media);
        })
    });
}

function displayLightbox(media){
    // DOM
    const lightboxModal = document.getElementById('lightbox_modal');
    const lightboxMedia = document.getElementById('lightbox_media');

    main.setAttribute("aria-hidden", "true"); // Hide main content for Assistive Technologies
    lightboxModal.setAttribute("aria-hidden", "false"); // Show modal for AT
    body.style.overflow = "hidden"; // Prevent scrolling
    lightboxModal.style.display = "flex"; // Show modal

    const lightboxModel = photographerTemplate(media);
    const mediaLightbox = lightboxModel.getLightboxDOM();
    lightboxMedia.appendChild(mediaLightbox);

    document.addEventListener('keydown', e => {
        if (e.key === "Escape" || e.code === 27){
            console.log("escape pressed")
            closeLightbox();
        }
    });
}

function closeLightbox(){
    // DOM
    const lightboxModal = document.getElementById('lightbox_modal');
    const lightboxMedia = document.getElementById('lightbox_media');

    main.setAttribute("aria-hidden", "false"); // reveal main content for Assistive Technologies
    lightboxModal.setAttribute("aria-hidden", "true"); // hide modal for AT
    body.style.overflow = "auto"; // Allow scrolling
    lightboxModal.style.display = "none"; // Hide modal
    
    lightboxMedia.innerHTML = ''; // Resetting the lightbox content
}

function lightboxPrev(){
    
}

function getPhotographerLikes(medias){
    const totalLikes = medias.map(medias => medias.likes);
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

