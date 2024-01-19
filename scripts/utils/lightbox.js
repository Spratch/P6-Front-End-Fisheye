function setLightboxMedia(mediaToDisplay, mediaIndex, mediasList) {
	const media = mediasList[mediaIndex].src;
	// const title = mediasList[mediaIndex].
	console.log(mediasList[mediaIndex])

	const mediaElement = photographerTemplate(mediaToDisplay).getLightboxMediaDOM(media);
    
	resetLightboxMedia();
	return mediaElement;
}

function resetLightboxMedia() {
	lightboxMedia.innerHTML = "";
}

function displayLightbox(media, i, mediasList) {
	disableTabindexForPage();

	main.setAttribute("aria-hidden", "true");
	lightboxModal.setAttribute("aria-hidden", "false");
	body.style.overflow = "hidden";
	lightboxModal.style.display = "flex";

	const mediaElement = setLightboxMedia(media, i, mediasList);
	const lightboxModel = photographerTemplate(media);
	const mediaLightbox = lightboxModel.getLightboxDOM(i, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);

	// Get the focus in the lightbox
	const closeIcon = document.querySelector(".lightbox__buttons--close");
	closeIcon.tabIndex = 0;
	window.setTimeout(() => closeIcon.focus(), 0);

	currentIndex = i;  // Set currentIndex when opening the lightbox

	const arrowPrev = document.querySelector(".lightbox__buttons--prev");
	const arrowNext = document.querySelector(".lightbox__buttons--next");

	arrowPrev.addEventListener("click", () => {
		lightboxPrev(mediasList);
	});
	arrowNext.addEventListener("click", () => {
		lightboxNext(mediasList);
	});

	function keydownHandler(e) {
		switch (e.key) {
		case "Escape":
		case "Esc":
			closeLightbox();
			break;
		case "ArrowLeft":
			lightboxPrev(mediasList);
			break;
		case "ArrowRight":
			lightboxNext(mediasList);
			break;
		}
	}
	document.addEventListener("keydown", keydownHandler);
}

function closeLightbox(){
	main.setAttribute("aria-hidden", "false"); // reveal main content for Assistive Technologies
	lightboxModal.setAttribute("aria-hidden", "true"); // hide modal for AT
	body.style.overflow = "auto"; // Allow scrolling
	lightboxModal.style.display = "none"; // Hide modal
	
	enableTabindexForPage();
}

function lightboxPrev(mediasList) {
	currentIndex = (currentIndex - 1 + mediasList.length) % mediasList.length;
	const mediaElement = setLightboxMedia(mediasList[currentIndex], currentIndex, mediasList);
	const lightboxModel = photographerTemplate(mediasList[currentIndex]);
	const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);
}

function lightboxNext(mediasList) {
	currentIndex = (currentIndex + 1 + mediasList.length) % mediasList.length;
	const mediaElement = setLightboxMedia(mediasList[currentIndex], currentIndex, mediasList);
	const lightboxModel = photographerTemplate(mediasList[currentIndex]);
	const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);
}