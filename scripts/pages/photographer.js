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

// ____________________________________________

// Mise en place du DOM pour photographer.html
// Récupère les propriétés de l'objet pour les mettres dans le DOM

function setMediaPart(name, media) {
	const mediaSection = document.getElementById("media_section");
   
	media.forEach((mediaElement) => {
		let divCreation = document.createElement("div");
        const picturePath = `assets/media/${name}/${mediaElement.image}`;
        
        divCreation.className = "media_card";

        const img = document.createElement('img');
        img.setAttribute("src", picturePath);

        divCreation.appendChild(img);
        mediaSection.appendChild(divCreation);
	});
}

// Rajoute dans le DOM (grâce à mediaTemplate et getMediaCardDOM) 
async function displayData(data, id) {
    const { media, photographers } = data;

    const mediaObject = media.filter((media) => media.photographerId === id);
    const photographersObject = photographers.filter((photographer) => photographer.id === id)[0];

    console.log("MEDIA :", mediaObject)
    console.log("MPHOTOGRAPHERS :", photographersObject)

    let name = photographersObject.name;

    document.getElementById("name").innerText = name;
    document.getElementById("city").innerText = photographersObject.city;
    document.getElementById("country").innerText = photographersObject.country;
    document.getElementById("tagline").innerText = photographersObject.tagline;
   
    setMediaPart(name, mediaObject);
}

let _id;

async function init() {
    // Récupère les datas des media
    const data = await getPhotographers();

    // const idUserObject = photographers.find((element) => element.id === _id);
    // console.log(idUserObject);

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