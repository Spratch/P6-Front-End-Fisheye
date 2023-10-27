async function getPhotographers() {
    // Recuperation du JSON
    const reponse = await fetch("./data/photographers.json");
    const photographers = await reponse.json();
    console.log(photographers);
    return photographers;
}

function getUrlId() {
    // Recuperation de l'id du photographe
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlId = urlParams.get('id');
    console.log(urlId);
    return urlId
}

function findPhotographer(photographers, urlId) {
    // Selection du photographe a partir de son id
    const photographer = photographers.find(item => item.id == urlId);
    console.log(photographer);
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
    console.log(medias);
    return medias;
}

function displayMedias(medias) {
    // Recuperation des elements du DOM
    const portfolioGrid = document.querySelector(".portfolio-grid");
    console.log(portfolioGrid);

    // Construction de la grille
    medias.forEach((media) => {
        const gridModel = photographerTemplate(media);
        const mediasGrid = gridModel.getPortfolioDOM();
        portfolioGrid.appendChild(mediasGrid);
    });
}

function displayValue(photographer) {
    const valueDiv = document.querySelector(".photographer-value");
    const valueContent = photographerTemplate(photographer).getValueDOM();
    valueDiv.appendChild(valueContent);
}

async function init() {
    const { photographers, media } = await getPhotographers();
    const urlId = getUrlId();
    const photographer = findPhotographer(photographers, urlId);
    displayHeader(photographer);
    const medias = filterMedias(media, urlId);
    displayMedias(medias);
    displayValue(photographer);
}

init();

