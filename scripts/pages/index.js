/* global photographerTemplate */
/**
 * Fetches photographers data from the JSON file.
 * 
 * @returns {Promise<Object>} A promise that resolves to the JSON data of photographers.
 */

async function getPhotographers() {
	const reponse = await fetch("./data/photographers.json");
	const photographers = await reponse.json();
	return photographers;
}

/**
 * Displays photographers' data on the page.
 * 
 * @param {Array} photographers - The list of photographers to be displayed.
 */
function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");

	photographers.forEach((photographer) => {
		const photographerModel = photographerTemplate(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

/**
 * Initializes the application by fetching and displaying photographers' data.
 */
async function init() {
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();