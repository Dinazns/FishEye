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

let _id;

async function init() {
    // Récupère les datas des media
    const data = await getPhotographers();

    // Extraction de l'id
    const urlSearchParams = new URL(document.location).searchParams;
    _id = parseInt(urlSearchParams.get('id'));
    console.log("ID Page :", _id)

    if(!isNaN(_id)) {
        displayData(data, _id);
    } else {
        console.error("l'id indéfini ou NaN")
    }
}

init();

// ____________________________________________

// Rajoute dans le DOM la partie presentation du photographe en fct de son id
async function displayData(data, id) {
    const { media, photographers } = data;

    const mediaObject = media.filter((media) => media.photographerId === id);
    const photographersObject = photographers.filter((photographer) => photographer.id === id)[0];

    console.log("MEDIA :", mediaObject)
    console.log("PHOTOGRAPHERS :", photographersObject)

    let name = photographersObject.name;

    document.getElementById("name").innerText = name;
    document.getElementById("city").innerText = photographersObject.city;
    document.getElementById("country").innerText = photographersObject.country;
    document.getElementById("tagline").innerText = photographersObject.tagline;

    const portrait = `./assets/photographers/${photographersObject.portrait}`;
    document.getElementById("img_portrait").setAttribute("src", portrait);

    setMediaPart(name, mediaObject);


}

// Affichage de la galerie d'images et videos

function setMediaPart(name, media) {
	const mediaSection = document.getElementById("media_section");
   
	media.forEach((mediaElement) => {
		let divCreation = document.createElement("div");
        divCreation.className = "media_card";

        const picturePath = `assets/media/${name}/${mediaElement.image}`;
        const picturePathVideo = `assets/media/${name}/${mediaElement.video}`;

        // const {title, likes} = title_likesFromMedia;  
        const TitleLikes_media_card = document.createElement('div');
        TitleLikes_media_card.className = 'TitleLikes_media_card';      

        const p_title = document.createElement('p');
        const p_likes = document.createElement('p');

        if(mediaElement.image) {
            const img = document.createElement('img');

            img.setAttribute("src", picturePath);
            
            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;

            divCreation.appendChild(img);
            divCreation.appendChild(TitleLikes_media_card)
            TitleLikes_media_card.appendChild(p_title)
            TitleLikes_media_card.appendChild(p_likes)
           

        }        

        if(mediaElement.video) {
            const video = document.createElement('video')
            video.setAttribute("src", picturePathVideo);

            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;

            divCreation.appendChild(video);
            divCreation.appendChild(TitleLikes_media_card)
            TitleLikes_media_card.appendChild(p_title)
            TitleLikes_media_card.appendChild(p_likes)

        }

       

        // const likes =
        
        mediaSection.appendChild(divCreation);

        
        
	});
}