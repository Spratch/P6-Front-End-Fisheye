function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price, title, image, video, likes } = data;

    const picture = `assets/photographers/${portrait}`;

    // DOM de la carte photographe
    function getUserCardDOM() {
        // Creation de l'article
        const article = document.createElement( 'article' );
        article.setAttribute('id', `photographer-${id}`);
        // Lien
        const link = document.createElement( 'a' );
        link.setAttribute('id', `link-${id}`);
        link.setAttribute('href', `./photographer.html?id=${id}`);
        link.setAttribute('aria-label', `${name}`);
        // Image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute('alt', `photo of ${name}`)
        // Nom
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        // Lieu
        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;
        location.classList.add('photographer-location');
        // Tagline
        const taglineElement = document.createElement( 'p' );
        taglineElement.textContent = tagline;
        taglineElement.classList.add('photographer-tagline');
        // Prix
        const pricing = document.createElement( 'p' );
        pricing.textContent = `${price}€/jour`;
        pricing.classList.add('photographer-pricing');

        // DOM
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(pricing);

        return (article);
    }

    // DOM infos profil
    function getProfileDOM() {
        const profile = document.createElement('div')
        profile.classList.add('photographer-profile');
        // H1
        const h1 = document.createElement('h1');
        h1.textContent = name;
        // Lieu
        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;
        location.classList.add('photographer-location');
        // Tagline
        const taglineElement = document.createElement( 'p' );
        taglineElement.textContent = tagline;
        taglineElement.classList.add('photographer-tagline');
        
        // DOM
        profile.appendChild(h1);
        profile.appendChild(location);
        profile.appendChild(taglineElement);
        return (profile);
    }

    // Profile picture
    function getProfilePic() {
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute('alt', name);
        img.classList.add('profile-picture')
        return (img);
    }

    function getMediaDOM(media){
        const file = !media ? video : image;
        const element = !media ? 'video' : 'img';
        const attribut = !media ? 'muted' : 'alt';
        const value = !media ? 'true' : title;

        const mediaElement = document.createElement(element);
        mediaElement.setAttribute('src', `assets/images/${file}`);
        mediaElement.setAttribute(attribut, value);
        return mediaElement;
    }
    
    // Portfolio content
    function getPortfolioDOM() {
        const itemArticle = document.createElement('article');
        itemArticle.classList.add('media-article');
        // Media
        const mediaElement = getMediaDOM(image);        

        // Infos
        const infos = document.createElement("div");
        infos.classList.add("portoflio-item__infos");
        // Image title
        const titleElement = document.createElement("p");
        titleElement.textContent = title;
        // Likes
        const likesElement = document.createElement("p");
        likesElement.classList.add("portofolio-item__likes");
        likesElement.textContent = likes;
        const likesHeart = document.createElement("i");
        likesHeart.classList.add("fa-solid", "fa-heart");
        likesHeart.setAttribute('style', 'color: #901C1C');

        // DOM
        itemArticle.appendChild(mediaElement);
        itemArticle.appendChild(infos);
        infos.appendChild(titleElement);
        infos.appendChild(likesElement);
        likesElement.appendChild(likesHeart);
        return itemArticle;
    }

    function getValueDOM(sumLikes) {
        const valueDiv = document.createElement('div');
        valueDiv.classList.add("value-container");
        // Likes
        const likesElement = document.createElement("p");
        likesElement.classList.add("value-likes");
        likesElement.textContent = sumLikes;
        const likesHeart = document.createElement("i");
        likesHeart.classList.add("fa-solid", "fa-heart");
        likesHeart.setAttribute('style', 'color: black');
        // Price
        const dailyPrice = document.createElement('p');
        dailyPrice.textContent = `${price}€ / jour`;

        // DOM
        valueDiv.appendChild(likesElement);
        likesElement.appendChild(likesHeart);
        valueDiv.appendChild(dailyPrice);
        return valueDiv;
    }

    return { name, picture, getUserCardDOM, getProfileDOM, getProfilePic, getPortfolioDOM, getValueDOM }
}