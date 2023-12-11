function photographerTemplate(data) {
	let { name, portrait, id, city, country, tagline, price, title, image, video, likes } = data;

	const picture = `assets/photographers/${portrait}`;

	// Homepage photographers cards DOM
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

	// Photographer page infos DOM
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

	// Photographer page picture DOM
	function getProfilePic() {
		const img = createDOMElement("img", { src: picture, alt: name, class: "profile-picture" });
		return (img);
	}

	// Photographer page media generation function
	function getMediaDOM(image, fromLightbox){
		// Handle differently media if image or video
		const file = !image ? video : image;
		const element = !image ? "video" : "img";
		const attribut = !image ? "muted" : "alt";
		const value = !image ? "true" : title;

		// DOM Generation
		const mediaElement = createDOMElement(element, { src: `assets/images/${file}`, [attribut]: value });
		if (!image && fromLightbox) {
			mediaElement.setAttribute("controls", "true");
			mediaElement.setAttribute("autoplay", "true");
		}

		return mediaElement;
	}
	
	// Photographer page media gallery DOM
	function getPortfolioDOM(tabindex) {
		// DOM Elements creation
		const itemArticle = createDOMElement("article", { class: "media-article", "aria-label": "Vue détaillée"});
		const mediaElement = getMediaDOM(image);
		mediaElement.tabIndex = tabindex + 4;
		const infos = createDOMElement("div", { class: "portfolio-item__infos" });
		const titleElement = createDOMElement("p", {}, title);
		const likesContainer = createDOMElement("div", { class: "portfolio-item__likes", "tabindex": tabindex + 4 + "." + 1 });
		const likesNumber = createDOMElement("p", {}, likes);
		const likesHeart = createDOMElement("i", { class: "fa-regular fa-heart", style: "color: #901C1C" });

		function likeMedia(){
			// Get DOM Element
			const totalLikesElement = document.getElementsByClassName("value-likes");
			totalLikes = parseInt(totalLikesElement[0].innerText);

			if (!likesHeart.classList.contains("fa-solid")) {
				likes++;
				totalLikes++;
				totalLikesElement[0].innerText = totalLikes;
			} else {
				likes--;
				totalLikes--;
				totalLikesElement[0].innerText = totalLikes;
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
		infos.append(titleElement, likesContainer);
		likesContainer.append(likesNumber, likesHeart);
	
		return itemArticle;
	}

	function getValueDOM(sumLikes) {
		// DOM Elements creation
		const valueDiv = createDOMElement("div", { class: "value-container" });
		const likesContainer = createDOMElement("div", {class: "likes-container"});
		const likesNumber = createDOMElement("p", { class: "value-likes" }, sumLikes);
		const likesHeart = createDOMElement("i", { class: "fa-solid fa-heart", style: "color: black" });
		const dailyPrice = createDOMElement("p", {}, `${price}€ / jour`);

		// DOM Generation
		valueDiv.append(likesContainer, dailyPrice);
		likesContainer.append(likesNumber, likesHeart);

		return valueDiv;
	}

	function getLightboxDOM(i, mediaElement) {
		// DOM Elements creation
		const mediaParent = createDOMElement("div", { class: "lightbox-media-container"});
		const mediaTitle = createDOMElement("p", {}, title);

		// DOM Generation
		mediaParent.append(mediaElement, mediaTitle);

		return mediaParent;
	}

	return { name, picture, getUserCardDOM, getProfileDOM, getProfilePic, getMediaDOM, getPortfolioDOM, getValueDOM, getLightboxDOM };
}