/* global triggerLightbox */

// DOM
const body = document.getElementById("body"); // eslint-disable-line no-unused-vars
const modal = document.getElementById("contact_modal"); // eslint-disable-line no-unused-vars
const main = document.getElementById("main"); // eslint-disable-line no-unused-vars
const modalCloseBtn = document.getElementById("modalCloseBtn"); // eslint-disable-line no-unused-vars
const modalOpenBtn = document.getElementById("modalOpenBtn"); // eslint-disable-line no-unused-vars
const contactForm = document.getElementById("contact_form"); // eslint-disable-line no-unused-vars
const first = document.getElementById("first-name"); // eslint-disable-line no-unused-vars
const last = document.getElementById("last-name"); // eslint-disable-line no-unused-vars
const email = document.getElementById("email"); // eslint-disable-line no-unused-vars
const message = document.getElementById("message"); // eslint-disable-line no-unused-vars
const portfolioGrid = document.querySelector(".portfolio-grid"); // eslint-disable-line no-unused-vars
const lightboxMedia = document.getElementById("lightbox_media"); // eslint-disable-line no-unused-vars
const lightboxModal = document.getElementById("lightbox_modal"); // eslint-disable-line no-unused-vars

/**
 * Creates a new DOM element with specified tag, attributes, and text content.
 * 
 * @param {string} tag - The type of element to create (e.g., 'div', 'img').
 * @param {Object} attributes - An object containing attribute-value pairs to set on the element.
 * @param {string} [textContent] - Optional text content for the element.
 * @returns {HTMLElement} The newly created DOM element.
 */
function createDOMElement(tag, attributes = {}, textContent) { // eslint-disable-line no-unused-vars
	// Tag
	const element = document.createElement(tag);
	// Attributes
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}
	// Text
	if (textContent) {
		element.textContent = textContent;
	}

	return element;
}

// Store initial tabindex values
const initialTabIndexes = new Map();
/**
 * Disables the tabindex for all elements outside the modal (sets tabindex to -1).
 * This is useful for controlling keyboard navigation when a modal is open.
 */
function disableTabindexForPage() { // eslint-disable-line no-unused-vars
	const pageElements = document.querySelectorAll("body > *:not(#lightbox_modal):not(#contact_modal) *");
	pageElements.forEach(element => {
		// Store the initial tabindex value if not already stored
		if (!initialTabIndexes.has(element)) {
			initialTabIndexes.set(element, element.getAttribute("tabindex"));
		}
		// Set tabindex to -1
		element.setAttribute("tabindex", -1);
	});
}

/**
 * Restores the original tabindex values for elements outside the modal.
 * This function is called when a modal is closed to re-enable normal page navigation.
 */
function enableTabindexForPage() { // eslint-disable-line no-unused-vars
	// Iterate through stored entries and check if elements still exist
	initialTabIndexes.forEach((initialTabIndex, element) => {
		if (document.contains(element)) {
			// Restore initial tabindex value
			element.setAttribute("tabindex", initialTabIndex);
		} else {
			// Remove entry for elements that no longer exist
			initialTabIndexes.delete(element);
		}
	});
}
	
let mediasList = {};
/**
 * Updates the global 'mediasList' with the current media elements in the document.
 * Iterates through media sources and titles, adding them to 'mediasList'.
 */
function updateMediasList() { // eslint-disable-line no-unused-vars
	const mediasSrcList = document.getElementsByClassName("media-element");
	const mediasTitlesList = document.getElementsByClassName("portfolio-item__title");
	// Clear previous values
	mediasList = {};
    
	// Iterate through the collection and add properties to the mediasList object
	for (let i = 0; i < mediasSrcList.length; i++) {
		mediasList[i] = {
			src: mediasSrcList[i].src,
			title: mediasTitlesList[i].innerText
		};
	}
	triggerLightbox();
}
