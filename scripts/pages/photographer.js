/* global photographerTemplate, main, body, currentIndex */

async function getPhotographers() {
	// JSON Fetch
	const response = await fetch("./data/photographers.json");
	return response.json();
}

function getUrlId() {
	// Retrieving the photographer's ID
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get("id");
}

function findPhotographer(photographers, urlId) {
	// Selection of the photographer based on his ID
	return photographers.find(item => item.id == urlId);
}

function displayHeader(photographer) {
	// DOM elements
	const photographHeader = document.querySelector(".photograph-header");
	const contactButton = document.querySelector(".contact_button");

	// Header construction
	const { getProfileDOM, getProfilePic } = photographerTemplate(photographer);
	photographHeader.insertBefore(getProfileDOM(), contactButton);
	photographHeader.appendChild(getProfilePic());
}

function filterMedias(media, urlId) {
	// Selection of medias based on the photographer's ID
	return media.filter(item => item.photographerId == urlId);
}

function displayMedias(photographerMedias) {
	// DOM elements
	const portfolioGrid = document.querySelector(".portfolio-grid");

	// Grid construction
	photographerMedias.forEach((media, i) => {
		const { getPortfolioDOM } = photographerTemplate(media);
		const mediasGrid = getPortfolioDOM(i);
		portfolioGrid.appendChild(mediasGrid);

		// Display lightbox
		mediasGrid.firstChild.addEventListener("click", () => {
			displayLightbox(media, i, mediasList);
		});
		mediasGrid.firstChild.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				displayLightbox(media, i, mediasList);
			}
		});
		
	});
	updateMediasList();
}

function getPhotographerLikes(medias){
	// Calculate total number of photographer's likes
	const totalLikes = medias.map(media => media.likes);
	return totalLikes.reduce((a,b) => a + b, 0);
}

function displayValue(photographer, sumLikes) {
	// DOM Element
	const photographerValue = document.querySelector(".photographer-value");

	// Value content construction
	const { getValueDOM } = photographerTemplate(photographer);
	photographerValue.appendChild(getValueDOM(sumLikes));
}

// Dropdown and sort
function toggleDropdown(){
	const dropdown = document.querySelector(".sorting-dropdown");
	dropdown.classList.toggle("unrolled");

}

function hideButton(button){
	displayButton();
	button.classList.add("hidden");
	button.setAttribute("aria-hidden", "true");

	// Then close dropdown
	toggleDropdown();

}

function changeDropdownTitle(button){
	const dropdownTitleElement = document.querySelector(".dropdown-title");
	dropdownTitleElement.textContent = button.textContent;

	// Then hide button
	hideButton(button);

}

function displayButton(){
	const hiddenButton = document.querySelector(".hidden");
	hiddenButton.removeAttribute("aria-hidden");
	hiddenButton.classList.remove("hidden");
}

function sortMedias(sortType) {
    const button = document.getElementById(sortType);
    changeDropdownTitle(button);

	const mediasList = document.getElementsByClassName("media-article");
	const portfolioGrid = document.querySelector(".portfolio-grid");

	mediasListArray = Array.from(mediasList);

	switch (sortType) {
		case "sort-popularity":
			sortedMedias = mediasListArray.sort((a,b) => b.dataset.likes - a.dataset.likes);
			console.log("popularity")
			break;
        case "sort-name":
            sortedMedias = mediasListArray.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
			console.log("name")
            break;
        case "sort-date":
            sortedMedias = mediasListArray.sort((a, b) => b.dataset.date - a.dataset.date).reverse();
			console.log("date")
            break;
        default:
            // Default case: no sorting
            sortedMedias = mediasListArray;
	}

	portfolioGrid.innerHTML = "";
	sortedMedias.forEach((element, i) => {
		element.getElementsByClassName("media-element")[0].tabIndex = i + 4
		element.getElementsByClassName("portfolio-item__likes")[0].tabIndex = i + 4 + "." + 1;
		portfolioGrid.appendChild(element)
	});
	updateMediasList();

}

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