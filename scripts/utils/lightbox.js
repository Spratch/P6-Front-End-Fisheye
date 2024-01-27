/* global photographerTemplate, lightboxMedia, disableTabindexForPage, main, lightboxModal, body, enableTabindexForPage, mediasList */

function setLightboxMedia(mediaToDisplay, mediaIndex, mediasList) {
	const media = mediasList[mediaIndex].src;
	const mediaElement = photographerTemplate(mediaToDisplay).getLightboxMediaDOM(media);
	resetLightboxMedia();
	return mediaElement;
}

function resetLightboxMedia() {
	lightboxMedia.innerHTML = "";
}

let currentIndex = 0;

/**
 * Displays the lightbox for a selected media item.
 * 
 * @param {Object} media - The media item data to be displayed in the lightbox.
 * @param {number} i - The index of the media item in the media list.
 * @param {Array} mediasList - The array of all media items.
 */
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

	function resetLightboxEventListeners() {
		document.removeEventListener("keydown", keydownHandler);
		lightboxButtons.removeEventListener("click", clickHandler);
	}

	const lightboxButtons = document.querySelector(".lightbox__buttons");

	function clickHandler(event) {
		const target = event.target.classList;

		switch (true) {
		case target.contains("fa-xmark"):
			closeLightbox();
			resetLightboxEventListeners();
			break;
		case target.contains("fa-chevron-left"):
			lightboxPrev(mediasList);
			break;
		case target.contains("fa-chevron-right"):
			lightboxNext(mediasList);
			break;
		}
	}
	lightboxButtons.addEventListener("click", clickHandler);

	function keydownHandler(event) {
		switch (event.key) {
		case "Escape":
		case "Esc":
			closeLightbox();
			resetLightboxEventListeners();
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
	currentIndex = (currentIndex - 1 + Object.keys(mediasList).length) % Object.keys(mediasList).length;
	const mediaElement = setLightboxMedia(mediasList[currentIndex], currentIndex, mediasList);
	const lightboxModel = photographerTemplate(mediasList[currentIndex]);
	const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);
}

function lightboxNext(mediasList) {
	currentIndex = (currentIndex + 1 + Object.keys(mediasList).length) % Object.keys(mediasList).length;
	const mediaElement = setLightboxMedia(mediasList[currentIndex], currentIndex, mediasList);
	const lightboxModel = photographerTemplate(mediasList[currentIndex]);
	const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);
}

function triggerLightbox() { // eslint-disable-line no-unused-vars
	console.log("triggerLightbox");
	const articlesList = document.getElementsByClassName("media-article");
	const articlesListArray = Array.from(articlesList);

	articlesListArray.forEach((article, index) => {
		const mediaElement = article.firstChild;

		// Ensure the dataset index is set correctly
		mediaElement.dataset.index = index;

		// Remove existing event handlers if present
		if (mediaElement._clickHandler) {
			mediaElement.removeEventListener("click", mediaElement._clickHandler);
		}
		if (mediaElement._keydownHandler) {
			mediaElement.removeEventListener("keydown", mediaElement._keydownHandler);
		}

		// Create new event handlers
		mediaElement._clickHandler = function() {
			const mediaIndex = this.dataset.index;
			displayLightbox(mediasList[mediaIndex], parseInt(mediaIndex), mediasList);

		};
		mediaElement._keydownHandler = function(event) {
			if (event.key === "Enter") {
				const mediaIndex = this.dataset.index;
				displayLightbox(mediasList[mediaIndex], parseInt(mediaIndex), mediasList);
			}
		};

		// Add event handlers
		mediaElement.addEventListener("click", mediaElement._clickHandler);
		mediaElement.addEventListener("keydown", mediaElement._keydownHandler);
	});
}