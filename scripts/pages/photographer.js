// Récupère les données data (photographers + media) json
async function getPhotographers() {
    let data = await fetch("/data/photographers.json")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data;
        });

    return data;
}

let mediaLength = 0;
const mediaSection = document.getElementById("media_section");
let _id;

async function init() {
    // Récupère les datas des media
    const data = await getPhotographers();
    // Extraction de l'id
   const urlSearchParams = new URL(document.location).searchParams;
    _id = parseInt(urlSearchParams.get("id"));

    console.log("ID Page :", _id);

    if (!isNaN(_id)) {
        photographerInfo(data, _id);
        mediaLength = data.length;
    } else {
        console.error("l'id indéfini ou NaN");
    }
}
console.log(mediaLength);


// Rajoute dans le DOM la partie presentation du photographe en fonction de son id
async function photographerInfo(data, id) {
    const { media, photographers } = data;

    const photographersObject = photographers.filter((photographer) => photographer.id === id)[0];
    let name = photographersObject.name;

    profile(photographersObject);
    
    showMedia(name, media);

};

function profile(photographersObject){
    
    let name = photographersObject.name;
    
    document.getElementById("name").innerText = name;
    document.getElementById("city").innerText = photographersObject.city;
    document.getElementById("country").innerText = photographersObject.country;
    document.getElementById("tagline").innerText = photographersObject.tagline;
    const portrait = `./assets/photographers/${photographersObject.portrait}`;
    document.getElementById("img_portrait").setAttribute("src", portrait);

    // Mis à jour du prix par jour du photographe
    const priceParJourElement = document.getElementById("priceParJour");
    priceParJourElement.innerText = `${photographersObject.price} € / jour`;
    console.log(priceParJourElement);
}

function showMedia(name, media){
    const mediaObject = media.filter((media) => media.photographerId === _id);
    console.log("Media du photographe :", mediaObject);

    mediaObject.forEach((mediaElement, index) => {
        const mediaCard = document.createElement("div");
        mediaCard.className = "media_card";

        const lightBox = document.getElementsByClassName("side");
        lightBox.innerHTML = '';

        if (mediaElement.image) {
            const img = document.createElement("img");
            img.setAttribute("src", `assets/media/${name}/${mediaElement.image}`);
            img.addEventListener('click', () => {
                document.querySelector('#lightBox').style.display = 'block';
                document.querySelector('#lightBox img').src = img.src;
                const imgBox = document.createElement("img");
                imgBox.setAttribute("src", `assets/media/${name}/${mediaElement.image}`);
                lightBox.appendChild(imgBox);
            })
            // img.setAttribute("alt", mediaElement.title);
            mediaCard.appendChild(img);
            

        } else if (mediaElement.video) {
            const video = document.createElement("video");
            video.setAttribute("src", `assets/media/${name}/${mediaElement.video}`);
            // video.setAttribute("controls", "false"); // Ajouter les contrôles pour la vidéo
            video.addEventListener('click', () => {
                document.querySelector('#lightBox').style.display = 'block';
                document.querySelector('#lightBox video').src = video.src;
                const videoBox = document.createElement("video");
                videoBox.setAttribute("src", `assets/media/${name}/${mediaElement.video}`);
                video.setAttribute("controls", "true"); // Ajout des contrôles pour la vidéo
                lightBox.appendChild(video);
            })
            mediaCard.appendChild(video);
            
        }

        // Ajout du titre et du nombre de likes sous chaque media cards
        const titleLikes = document.createElement("div");
        titleLikes.className = "TitleLikes_media_card";
        titleLikes.innerHTML = `
            <p>${mediaElement.title}</p>
            <div class="bloc_likes">
                <p class="p_likes">${mediaElement.likes}</p>
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-heart"></i>
            </div>
        `;


        mediaCard.appendChild(titleLikes);

        // Ajout de la carte média à la section média
        mediaSection.appendChild(mediaCard);
    });


}
init();