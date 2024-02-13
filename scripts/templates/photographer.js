// Affichage des photographes sur la page d'accueil
function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.src = picture;
        img.setAttribute("alt", `La photo de ${name}`);
        
        const h2 = document.createElement( 'h2' );
        h2.innerHTML += `<a href="photographer.html?id=${id}">${name}</a>`;
        //h2.textContent = name;

        const p_city_country = document.createElement('p');
        const p_tagline = document.createElement('p');
        const p_price = document.createElement('p');

        p_city_country.textContent = city + ", " + country;
        p_city_country.className = 'city_color';
        p_tagline.textContent = tagline;
        p_price.textContent = price + "€" + "/jour";
        p_price.className = 'price_color'
        
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p_city_country);
        article.appendChild(p_tagline);
        article.appendChild(p_price);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}