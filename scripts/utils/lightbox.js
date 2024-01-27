/* global photographerTemplate, lightboxMedia, disableTabindexForPage, main, lightboxModal, body, enableTabindexForPage, mediasList */

/**
 * Prepares and displays the selected media in the lightbox.
 * 
 * @param {Object} mediaToDisplay - The data (src, title) of the media to be displayed.
 * @param {number} mediaIndex - The index of the media in the media list.
 * @param {Array} mediasList - The list of all media items.
 * @returns {HTMLElement} The DOM element of the media ready to be displayed.
 */
function setLightboxMedia(mediaToDisplay, mediaIndex, mediasList) {
	const media = mediasList[mediaIndex].src;
	const mediaElement = photographerTemplate(mediaToDisplay).getLightboxMediaDOM(media);
	resetLightboxMedia();
	return mediaElement;
}

/**
 * Resets the content of the lightbox.
 */
function resetLightboxMedia() {
	lightboxMedia.innerHTML = "";
}

let currentIndex = 0;

/**
 * Displays the lightbox for a selected media item.
 * 
 * @param {Object} mediaToDisplay - The data (src, title) of the media to be displayed.
 * @param {number} mediaIndex - The index of the media item in the media list.
 * @param {Array} mediasList - The list of all media items.
 */
function displayLightbox(mediaToDisplay, mediaIndex, mediasList) {
	// Hides the page, displays lightbox
	disableTabindexForPage();
	main.setAttribute("aria-hidden", "true");
	lightboxModal.setAttribute("aria-hidden", "false");
	body.style.overflow = "hidden";
	lightboxModal.style.display = "flex";

	// Get the focus in the lightbox
	const closeIcon = document.querySelector(".lightbox__buttons--close");
	closeIcon.tabIndex = 0;
	window.setTimeout(() => closeIcon.focus(), 0);

	// Generates lightbox DOM
	const mediaElement = setLightboxMedia(mediaToDisplay, mediaIndex, mediasList);
	const lightboxModel = photographerTemplate(mediaToDisplay);
	const mediaLightbox = lightboxModel.getLightboxDOM(mediaIndex, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);

	// Handles the event listeners for the lightbox
	currentIndex = mediaIndex;  // Set currentIndex when opening the lightbox
	const lightboxButtons = document.querySelector(".lightbox__buttons");
	function resetLightboxEventListeners() {
		document.removeEventListener("keydown", keydownHandler);
		lightboxButtons.removeEventListener("click", clickHandler);
	}
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

/**
 * Closes the lightbox and restores accessibility to the main page.
 */
function closeLightbox(){
	main.setAttribute("aria-hidden", "false");
	lightboxModal.setAttribute("aria-hidden", "true");
	body.style.overflow = "auto";
	lightboxModal.style.display = "none";
	enableTabindexForPage();
}

/**
 * Displays the previous media in the lightbox.
 * 
 * @param {Array} mediasList - The list of all media items.
 */
function lightboxPrev(mediasList) {
	currentIndex = (currentIndex - 1 + Object.keys(mediasList).length) % Object.keys(mediasList).length;
	const mediaElement = setLightboxMedia(mediasList[currentIndex], currentIndex, mediasList);
	const lightboxModel = photographerTemplate(mediasList[currentIndex]);
	const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);
}

/**
 * Displays the next media in the lightbox.
 * 
 * @param {Array} mediasList - The list of all media items.
 */
function lightboxNext(mediasList) {
	currentIndex = (currentIndex + 1 + Object.keys(mediasList).length) % Object.keys(mediasList).length;
	const mediaElement = setLightboxMedia(mediasList[currentIndex], currentIndex, mediasList);
	const lightboxModel = photographerTemplate(mediasList[currentIndex]);
	const mediaLightbox = lightboxModel.getLightboxDOM(currentIndex, mediaElement);
	lightboxMedia.appendChild(mediaLightbox);
}

/**
 * Attaches event handlers to media elements to trigger the lightbox.
 * This function adds handlers for clicks and keyboard events.
 */
function triggerLightbox() { // eslint-disable-line no-unused-vars
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