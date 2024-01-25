function setLightboxMedia(mediaToDisplay, mediaIndex, mediasList) {
	const media = mediasList[mediaIndex].src;
	// const title = mediasList[mediaIndex].
	console.log(mediaToDisplay, mediaIndex, mediasList[mediaIndex].title)

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

	function resetLightboxEventListeners() {
		document.removeEventListener("keydown", keydownHandler);
		lighboxButtons.removeEventListener("click", lighboxButtonsClick);
	}
	  
	const lighboxButtons = document.querySelector(".lightbox__buttons");

	function lighboxButtonsClick(event) {
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
	lighboxButtons.addEventListener("click", lighboxButtonsClick);

	function keydownHandler(e) {
		switch (e.key) {
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

function triggerLightbox() {
	const articlesList = document.getElementsByClassName("media-article");

	articlesListArray = Array.from(articlesList);

	articlesListArray.forEach((article, i) => {
		// Getting the media index
		const index = article.dataset.index;

		// Display lightbox
		article.firstChild.addEventListener("click", () => {
			displayLightbox(mediasList[index], index, mediasList);
		});
		article.firstChild.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				displayLightbox(mediasList[index], index, mediasList);
			}
		});

	});
}