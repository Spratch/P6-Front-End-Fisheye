// DOM
const body = document.getElementById("body");
const modal = document.getElementById("contact_modal");
const main = document.getElementById("main");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalOpenBtn = document.getElementById("modalOpenBtn");
const contactForm = document.getElementById("contact_form");
const first = document.getElementById("first-name");
const last = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const portfolioGrid = document.querySelector(".portfolio-grid");
const lightboxMedia = document.getElementById("lightbox_media");
const lightboxModal = document.getElementById("lightbox_modal");


// DOM elements creation with type of tag, table of attributes, and textContent
function createDOMElement(tag, attributes = {}, textContent) {
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
// Set tabindex to -1 for elements not in modal
function disableTabindexForPage() {
    const pageElements = document.querySelectorAll('body > *:not(#lightbox_modal):not(#contact_modal) *');
    pageElements.forEach(element => {
        // Store the initial tabindex value if not already stored
        if (!initialTabIndexes.has(element)) {
            initialTabIndexes.set(element, element.getAttribute('tabindex'));
        }
        // Set tabindex to -1
        element.setAttribute('tabindex', -1);
    });
}
// Restore tabindex for elements not in modal
function enableTabindexForPage() {
    // Iterate through stored entries and check if elements still exist
    initialTabIndexes.forEach((initialTabIndex, element) => {
        if (document.contains(element)) {
            // Restore initial tabindex value
            element.setAttribute('tabindex', initialTabIndex);
        } else {
            // Remove entry for elements that no longer exist
            initialTabIndexes.delete(element);
        }
    });
}
	
// Function to extract values from elements and update mediasList
let mediasList = {};
function updateMediasList() {
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
