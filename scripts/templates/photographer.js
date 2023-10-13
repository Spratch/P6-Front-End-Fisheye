function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement( 'p' );
        taglineElement.textContent = tagline;

        const pricing = document.createElement( 'p' );
        pricing.textContent = `${price}/jour`;

        article.setAttribute('id', `photographer-${id}`);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(pricing);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}