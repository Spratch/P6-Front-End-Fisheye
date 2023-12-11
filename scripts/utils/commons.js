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