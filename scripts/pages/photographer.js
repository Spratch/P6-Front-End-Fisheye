/* global photographerTemplate, portfolioGrid, updateMediasList */

/**
 * Fetches photographers data from the JSON file.
 * 
 * @returns {Promise<Object>} A promise that resolves to the JSON data of photographers.
 */
async function getPhotographers() {
	const response = await fetch("./data/photographers.json");
	return response.json();
}

/**
 * Retrieves the photographer's ID from the URL query string.
 * 
 * @returns {string|null} The photographer's ID if present in the URL, otherwise null.
 */
function getUrlId() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get("id");
}

/**
 * Finds a photographer from the list based on the provided ID.
 * 
 * @param {Array} photographers - The array of photographers.
 * @param {string} urlId - The ID of the photographer to find.
 * @returns {Object|null} The photographer object if found, otherwise null.
 */
function findPhotographer(photographers, urlId) {
	return photographers.find(photographer => photographer.id == urlId);
}

/**
 * Displays the header section for a photographer's profile.
 * 
 * @param {Object} photographer - The photographer's data used to generate the header.
 */
function displayHeader(photographer) {
	// DOM elements
	const photographHeader = document.querySelector(".photograph-header");
	const contactButton = document.querySelector(".contact_button");

	// Header construction
	const { getProfileDOM, getProfilePic } = photographerTemplate(photographer);
	photographHeader.insertBefore(getProfileDOM(), contactButton);
	photographHeader.appendChild(getProfilePic());
}

/**
 * Filters media items based on the photographer's ID.
 * 
 * @param {Array} media - The array of all media items from the JSON file.
 * @param {string} urlId - The ID of the photographer to filter media for.
 * @returns {Array} An array of media items for the specified photographer.
 */
function filterMedias(media, urlId) {
	return media.filter(item => item.photographerId == urlId);
}

/**
 * Displays filtered media items on the photographer's page.
 * 
 * @param {Array} photographerMedias - An array of media items to be displayed.
 */
function displayMedias(photographerMedias) {
	// Grid construction
	photographerMedias.forEach((media, i) => {
		const { getPortfolioDOM } = photographerTemplate(media);
		const mediasGrid = getPortfolioDOM(i);
		portfolioGrid.appendChild(mediasGrid);		
	});
	updateMediasList();
}

/**
 * Calculates the total number of likes written in the JSON file for a photographer.
 * 
 * @param {Array} medias - An array of media items belonging to the photographer.
 * @returns {number} The total number of likes across all photographer's media items.
 */
function getPhotographerLikes(medias){
	const totalLikes = medias.map(media => media.likes);
	return totalLikes.reduce((a,b) => a + b, 0);
}

/**
 * Displays the value element for a photographer"s profile using his total number of likes.
 * 
 * @param {Object} photographer - The photographer's data used to generate the value element.
 * @param {number} sumLikes - The total number of likes across all photographer's media items.
 */
function displayValue(photographer, sumLikes) {
	// DOM Element
	const photographerValue = document.querySelector(".photographer-value");

	// Value content construction
	const { getValueDOM } = photographerTemplate(photographer);
	photographerValue.appendChild(getValueDOM(sumLikes));
}

/**
 * Toggles the visibility of the sorting dropdown element.
 * This function is called by the HTML button '.dropdown-toggle'.
 * It adds or removes a class to show or hide the dropdown content.
 */
function toggleDropdown(){
	const dropdown = document.querySelector(".sorting-dropdown");
	dropdown.classList.toggle("unrolled");
}

/**
 * Displays the currently hidden button when the user changes sorting criterion.
 */
function displayButton(){
	const hiddenButton = document.querySelector(".hidden");
	hiddenButton.removeAttribute("aria-hidden");
	hiddenButton.classList.remove("hidden");
}

/**
 * Hides the current sorting criterion in the dropdown content.
 * 
 * @param {HTMLElement} button - The button HTML element that was triggered by the user.
 */
function hideButton(button){
	// Display hidden button
	displayButton();

	// Hide current sorting criterion
	button.classList.add("hidden");
	button.setAttribute("aria-hidden", "true");

	// Then close dropdown
	toggleDropdown();
}

/**
 * Finds the sorting dropdown element's title and replace its text content by the triggered button's text content.
 * 
 * @param {HTMLElement} button - The button HTML element that was triggered by the user.
 */
function changeDropdownTitle(button){
	const dropdownTitleElement = document.querySelector(".dropdown-title");
	dropdownTitleElement.textContent = button.textContent;

	// Then hide button
	hideButton(button);
}

/**
 * Sorts media items based on the specified criteria.
 * 
 * @param {string} sortType - The sorting criterion, ('sort-popularity', 'sort-name', 'sort-date').
 */
function sortMedias(sortType) { // eslint-disable-line no-unused-vars
	const button = document.getElementById(sortType);
	changeDropdownTitle(button);

	const articlesList = document.getElementsByClassName("media-article");
	const articlesListArray = Array.from(articlesList);
	let sortedMedias = [];

	switch (sortType) {
	case "sort-popularity":
		sortedMedias = articlesListArray.sort((a,b) => b.dataset.likes - a.dataset.likes);
		break;
	case "sort-name":
		sortedMedias = articlesListArray.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
		break;
	case "sort-date":
		sortedMedias = articlesListArray.sort((a, b) => b.dataset.date - a.dataset.date).reverse();
		break;
	default:
		// Default case: no sorting
		sortedMedias = articlesListArray;
	}

	// Empties the portfolio grid before updating it
	portfolioGrid.innerHTML = "";

	// Gives new attributes ('data-index' and 'tabindex' to each media, then appends it to the portfolio grid
	sortedMedias.forEach((element, i) => {
		element.dataset.index = i;
		element.getElementsByClassName("media-element")[0].tabIndex = i + 4;
		element.getElementsByClassName("portfolio-item__likes")[0].tabIndex = i + 4 + "." + 1;
		portfolioGrid.appendChild(element);
	});
	updateMediasList();
}

/**
 * Initializes the page by fetching photographers' data, setting up the UI, and handling event listeners.
 */
async function init() {
	const { photographers, media } = await getPhotographers();
	const urlId = getUrlId();
	const photographer = findPhotographer(photographers, urlId);

	displayHeader(photographer);

	const photographerMedias = filterMedias(media, urlId);
	displayMedias(photographerMedias);

	const sumLikes = getPhotographerLikes(photographerMedias);
	displayValue(photographer, sumLikes);
}

init();