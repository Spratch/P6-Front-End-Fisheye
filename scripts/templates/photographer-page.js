function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price, title, image, likes } = data;

    const picture = `assets/photographers/${portrait}`;
    const mediaUrl = `assets/images/${image}`;

    // Profile infos
    function getProfileDom() {
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

    // Portfolio content
    function portfolioItem() {
        const itemArticle = document.createElement('article');
        itemArticle.classList.add('media-article');
        // Image
        const img = document.createElement("img");
        img.setAttribute('src', mediaUrl);

        // DOM
        itemArticle.appendChild(img);
        return itemArticle;
    }


    return { name, picture, profileInfos: getProfileDom, profilePic: getProfilePic, portfolioItem }
}