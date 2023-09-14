// Mettre le code JavaScript lié à la page photographer.html
// Récupère les données data (photographers + media) json
async function getPhotographers() {        
    let data = await fetch("/data/photographers.json")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data;
        })
    
    return data;
}







// Récupération de l'id et des infos qui lui sont liées (de son objet)

// ___________________________________________
// const { photographers, media } = data;
// console.log(photographers, media);

// const idUserObject = photographers.find((element) => element.id === _id);
// console.log(idUserObject);
// ____________________________________________

// Mise en place du DOM pour photographer.html
// Récupère les propriétés de l'objet pour les mettres dans le DOM

function mediaTemplate(data) {
    const { name, id, portrait, city, country, tagline, title, image, likes, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getMediaCardDOM() {

        const section_header = document.querySelector(".photograph-header");
        const section = document.createElement('section')
        const h2 = document.createElement( 'h2' );
        h2.innerHTML += `<a href="photographer.html?id=${id}">${name}</a>`;
        //h2.textContent = name;

        const p_city_country = document.createElement('p');
        const p_tagline = document.createElement('p');
        //const p_price = document.createElement('p');

        p_city_country.textContent = city + ", " + country;
        p_city_country.className = 'city_color';
        p_tagline.textContent = tagline;
       // p_price.textContent = price + "€" + "/jour";
        //p_price.className = 'price_color'

        const img_profil = document.createElement( 'img' );
        img_profil.setAttribute("src", picture);
        
        //section.appendChild(img);
        section_header.appendChild(section)
        section.appendChild(h2);
        section.appendChild(p_city_country);
        section.appendChild(p_tagline);
        //section.appendChild(p_price);

        const media_section = document.querySelector(".media_section");

        const images = `assets/media/${image}`;
        const img_album = document.createElement('img');

        img_album.setAttribute("src", images)

        media_section.appendChild(img_album)

        return (section, media_section);
    }

    return { name, picture, getMediaCardDOM }
}

// Rajoute dans le DOM (grâce à mediaTemplate et getMediaCardDOM) 
async function displayData(photographers, media, id) {
    const mediasSection = document.querySelector(".photograph-header");

    media.forEach((data) => {
        if (data.photographerId === id) {
            const mediaModel = mediaTemplate(data);
            const {section} = mediaModel.getMediaCardDOM();
            
            mediasSection.appendChild(section);
        }
    });
}

let _id;

async function init() {
    // Récupère les datas des media
    const { photographers, media } = await getPhotographers();
    

    // const idUserObject = photographers.find((element) => element.id === _id);
    // console.log(idUserObject);

    // Extraction de l'id
    const urlSearchParams = new URL(document.location).searchParams;
    _id = parseInt(urlSearchParams.get('id'));
    console.log(_id)

    if(!isNaN(_id)) {
        // Filtrer les medias spécifiques à l'id
        const filterMedia = media.filter((data) => data.photographerId === _id);

         // Affiche les medias liés à l'id
         console.log(filterMedia)
        displayData(photographers, filterMedia);
    } else {
        console.error("l'id indéfini ou NaN")
    }


}

init();