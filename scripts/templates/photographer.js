/* global createDOMElement */

/**
 * Creates a template object for a photographer that includes methods to generate different DOM elements.
 * 
 * @param {Object} data - The data object containing photographer's details such as name, portrait, id, etc.
 * @returns {Object} An object containing methods to create various DOM elements like user card, profile, media items, etc.
 */
function photographerTemplate(data) { // eslint-disable-line no-unused-vars
	let { name, portrait, id, city, country, tagline, price, title, image, video, likes, date } = data;

	const picture = `assets/photographers/${portrait}`;

	/**
	 * Creates the DOM elements for the photographer's card on the homepage.
	 * This includes the photographer's image, name, location, tagline, and pricing.
	 * 
	 * @returns {HTMLElement} The article element containing the photographer's card.
	 */
	function getUserCardDOM() {
		// DOM Elements creation
		const article = createDOMElement("article", { id: `photographer-${id}` });
		const link = createDOMElement("a", { id: `link-${id}`, href: `./photographer.html?id=${id}`, "aria-label": `${name}` });
		const img = createDOMElement("img", { src: picture, alt: `photo of ${name}` });
		const h2 = createDOMElement("h2", {}, name);
		const location = createDOMElement("p", { class: "photographer-location" }, `${city}, ${country}`);
		const taglineElement = createDOMElement("p", { class: "photographer-tagline" }, tagline);
		const pricing = createDOMElement("p", { class: "photographer-pricing" }, `${price}€/jour`);

		// DOM Generation
		article.append(link, location, taglineElement, pricing);
		link.append(img, h2);

		return (article);
	}

	/**
	 * Creates the DOM elements for the photographer's profile header.
	 * This includes the photographer's name, location, and tagline.
	 * 
	 * @returns {HTMLElement} The div element containing the photographer's profile header.
	 */
	function getProfileDOM() {
		// DOM Elements creation
		const profile = createDOMElement("div", { class: "photographer-profile" });
		const h1 = createDOMElement("h1", {}, name);
		const location = createDOMElement("p", { class: "photographer-location" }, `${city}, ${country}`);
		const taglineElement = createDOMElement("p", { class: "photographer-tagline" }, tagline);

		// DOM Generation
		profile.append(h1, location, taglineElement);
		
		return (profile);
	}

	/**
	 * Creates the DOM element for the photographer's profile picture.
	 * 
	 * @returns {HTMLElement} The img element for the photographer's profile picture.
	 */
	function getProfilePic() {
		const img = createDOMElement("img", { src: picture, alt: name, class: "profile-picture" });
		return (img);
	}

	/**
	 * Creates the DOM element for a media item (image or video).
	 * Handles different media types appropriately.
	 * 
	 * @param {string} image - The image file name; if null, a video file is used.
	 * @returns {HTMLElement} The DOM element for the media item.
	 */
	function getMediaDOM(image){
		// Handle differently media if image or video
		const file = !image ? video : image;
		const element = !image ? "video" : "img";
		const attribut = !image ? "muted" : "alt";
		const value = !image ? "true" : title;

		// DOM Generation
		const mediaElement = createDOMElement(element, { src: `assets/images/${file}`, [attribut]: value, class: "media-element" });

		return mediaElement;
	}

	/**
	 * Creates the DOM elements for a media item in the photographer's portfolio.
	 * This includes the media itself, its title, and likes.
	 * 
	 * @param {number} index - The index of the media item in the portfolio.
	 * @returns {HTMLElement} The article element containing the media item.
	 */
	function getPortfolioDOM(index) {
		const tabindex = index + 4;
		// DOM Elements creation
		const itemArticle = createDOMElement("article", { class: "media-article", "aria-label": "Vue détaillée"});
		const mediaElement = getMediaDOM(image);
		mediaElement.tabIndex = tabindex;
		const infos = createDOMElement("div", { class: "portfolio-item__infos" });
		const titleElement = createDOMElement("p", { class: "portfolio-item__title" }, title);
		const likesContainer = createDOMElement("div", { "aria-label": `${likes} mentions j'aime`, class: "portfolio-item__likes", "tabindex": tabindex + "." + 1 });
		const likesNumber = createDOMElement("p", {}, likes);
		const likesHeart = createDOMElement("i", { class: "fa-regular fa-heart", style: "color: #901C1C" });

		function likeMedia(){
			// Get DOM Element
			const totalLikesElement = document.getElementsByClassName("value-likes");
			let totalLikes = parseInt(totalLikesElement[0].innerText);

			if (!likesHeart.classList.contains("fa-solid")) {
				likes++;
				totalLikes++;
				totalLikesElement[0].innerText = totalLikes;
				itemArticle.dataset.likes = likes;
			} else {
				likes--;
				totalLikes--;
				totalLikesElement[0].innerText = totalLikes;
				itemArticle.dataset.likes = likes;
			}

			likesHeart.classList.toggle("fa-regular");
			likesHeart.classList.toggle("fa-solid");
			likesNumber.textContent = likes;
		}

		likesContainer.addEventListener("click", () => { likeMedia(); });
		likesContainer.addEventListener("keydown", (event) => {
			if (event.key === "Enter"){
				likeMedia();
			}
		});

		// DOM Generation
		itemArticle.append(mediaElement, infos);
		itemArticle.dataset.title = title;
		itemArticle.dataset.likes = likes;
		itemArticle.dataset.date = date;
		infos.append(titleElement, likesContainer);
		likesContainer.append(likesNumber, likesHeart);
	
		return itemArticle;
	}

	/**
	 * Creates the DOM elements for displaying the total likes and daily price for the photographer.
	 * 
	 * @param {number} sumLikes - The total number of likes for the photographer's media.
	 * @returns {HTMLElement} The div element containing the likes and daily price.
	 */
	function getValueDOM(sumLikes) {
		// DOM Elements creation
		const valueDiv = createDOMElement("div", { class: "value-container", "aria-label": `${sumLikes} mentions j'aime, tarif de ${price}€ par jour` });
		const likesContainer = createDOMElement("div", {class: "likes-container" });
		const likesNumber = createDOMElement("p", { class: "value-likes" }, sumLikes);
		const likesHeart = createDOMElement("i", { class: "fa-solid fa-heart", style: "color: black" });
		const dailyPrice = createDOMElement("p", {}, `${price}€ / jour`);

		// DOM Generation
		valueDiv.append(likesContainer, dailyPrice);
		likesContainer.append(likesNumber, likesHeart);

		return valueDiv;
	}

	/**
	 * Creates the DOM element for a media item in the lightbox.
	 * Handles different media types (image or video) appropriately.
	 * 
	 * @param {string} media - The file path of the media item.
	 * @returns {HTMLElement} The DOM element for the lightbox media item.
	 */
	function getLightboxMediaDOM(media){
		// Get the media file extension
		const extension = media.substring(media.lastIndexOf(".") + 1, media.length);
		let image = false;
		if (extension == "webp") {
			image = true;
		}
		// Handle differently media if image or video
		const element = !image ? "video" : "img";
		const attribut = !image ? "muted" : "alt";
		const value = !image ? "true" : title;

		// DOM Generation
		const mediaElement = createDOMElement(element, { src: media, [attribut]: value, class: "lightbox-media-element" });
		if (!image) {
			mediaElement.setAttribute("controls", "true");
			mediaElement.setAttribute("autoplay", "true");
		}

		return mediaElement;
	}

	/**
	 * Creates the DOM elements for the lightbox display of a media item.
	 * This includes the media container and the media title.
	 * 
	 * @param {number} i - The index of the media item in the medias list.
	 * @param {HTMLElement} mediaElement - The DOM element for the media item to display.
	 * @returns {HTMLElement} The div element containing the lightbox media display.
	 */
	function getLightboxDOM(i, mediaElement) {
		// DOM Elements creation
		const mediaParent = createDOMElement("div", { class: "lightbox-media-container"});
		const mediaTitle = createDOMElement("p", {}, title);

		// DOM Generation
		mediaParent.append(mediaElement, mediaTitle);

		return mediaParent;
	}

	return { name, picture, getUserCardDOM, getProfileDOM, getProfilePic, getMediaDOM, getPortfolioDOM, getValueDOM, getLightboxDOM, getLightboxMediaDOM };
}