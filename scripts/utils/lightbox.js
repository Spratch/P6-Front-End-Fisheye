function displayLightbox() {
    console.log("Window loaded");

    // DOM
    const portfolioItems = document.querySelectorAll('.media-article'); 
    console.log("liste des medias :", portfolioItems);
    const lightboxModal = document.getElementById('lightbox_modal');
    const lightboxMedia = document.getElementById('lightbox_media');
    
    portfolioItems.forEach(portfolioItem => {
        portfolioItem.addEventListener('click', () => {
            console.log("Média cliqué :", portfolioItem);

            main.setAttribute("aria-hidden", "true"); // Hide main content for Assistive Technologies
            lightboxModal.setAttribute("aria-hidden", "false"); // Show modal for AT
            body.style.overflow = "hidden"; // Prevent scrolling
            lightboxModal.style.display = "flex"; // Show modal

            let mediaId = portfolioItem.getAttribute("image-id"); 
            console.log("ID du média :", mediaId);

        })
    })
}
window.addEventListener('load', function () {displayLightbox()});

