function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Creation de l'article
        const article = document.createElement( 'article' );
        article.setAttribute('id', `photographer-${id}`);
        // Lien
        const link = document.createElement( 'a' );
        link.setAttribute('id', `link-${id}`);
        link.setAttribute('href', './photographer.html');
        link.setAttribute('aria-label', `${name} profile`);
        // Image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute('alt', name)
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
    return { name, picture, getUserCardDOM }
}