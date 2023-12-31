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

var mediaPosition = 0;
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
    } else {
        console.error("l'id indéfini ou NaN");
        window.location.href = "/";
    }
}

// Rajoute dans le DOM la partie presentation du photographe en fonction de son id
async function photographerInfo(data, id) {
    const { media, photographers } = data;

    const photographersObject = photographers.filter((photographer) => photographer.id === id)[0];
    let name = photographersObject.name;

    profile(photographersObject);
    
    showMedia(name, media);

    let likes_total = 0;
    LikesPrice(photographersObject.price, likes_total);

};

function profile(photographersObject) {   
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
        const mElement = document.querySelector("div.media_element");
        lightBox.innerHTML = '';

        const titleLikes = document.createElement("div");
        titleLikes.className = "TitleLikes_media_card";

        const p_title = document.createElement("p");
        const p_likes = document.createElement("p");
        const bloc_likes = document.createElement("div");
        bloc_likes.className = "bloc_likes";

        if (mediaElement.image) {
            // mElement.innerHTML = '';
            console.log(mElement);
            const img = document.createElement("img");
            img.setAttribute("src", `assets/media/${name}/${mediaElement.image}`);
            
            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;
            p_likes.className = "p_likes";

            img.addEventListener('click', () => {
                mediaPosition = index;
                document.querySelector('#lightBox').style.display = 'block'; // Ouverture de la lightbox
                // document.querySelector('#lightBox img').src = img.src;

                const prevChild = document.querySelector('.mediaClass');
                const imgBox = document.createElement("img");
                imgBox.setAttribute("src", `assets/media/${name}/${mediaElement.image}`);
                imgBox.setAttribute("class","mediaClass");

                if(prevChild!=null || undefined) {
                    mElement.removeChild(prevChild);
                }

                mElement.appendChild(imgBox);
            })

            mediaCard.appendChild(titleLikes);
            titleLikes.appendChild(p_title);
            titleLikes.appendChild(bloc_likes);
            bloc_likes.appendChild(p_likes);

            // img.setAttribute("alt", mediaElement.title);
            mediaCard.appendChild(img);
        } else if (mediaElement.video) {
            const video = document.createElement("video");
            video.setAttribute("src", `assets/media/${name}/${mediaElement.video}`);

            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;
            p_likes.className = "p_likes";
            // video.setAttribute("controls", "false"); // Ajouter les contrôles pour la vidéo
            video.addEventListener('click', () => {
                mediaPosition = index;
                document.querySelector('#lightBox').style.display = 'block'; // Ouverture de la lightbox
                // document.querySelector('#lightBox video').src = video.src;
                const prevChildVideo = document.querySelector('.mediaClass');
                
                const videoBox = document.createElement("video");
                videoBox.setAttribute("src", `assets/media/${name}/${mediaElement.video}`);
                videoBox.setAttribute("controls", "true"); // Ajout des contrôles pour la vidéo
                videoBox.setAttribute("class", "mediaClass");

                if (prevChildVideo!=null || undefined) {
                    mElement.removeChild(prevChildVideo);
                }

                console.log("videoBox");
                mElement.appendChild(videoBox);
            })

            mediaCard.appendChild(titleLikes);
            titleLikes.appendChild(p_title);
            titleLikes.appendChild(bloc_likes);
            bloc_likes.appendChild(p_likes);

            mediaCard.appendChild(video);
        }

        // Ajout du titre et du nombre de likes sous chaque media cards
        // const titleLikes = document.createElement("div");
        // titleLikes.className = "TitleLikes_media_card";
        // titleLikes.innerHTML = `
        //     <p>${mediaElement.title}</p>
        //     <div class="bloc_likes">
        //         <p class="p_likes">${mediaElement.likes}</p>
        //         <i class="fa-regular fa-heart"></i>
        //     </div>
        // `;

        // bloc_likes.className = "bloc_likes";
        
        // Mise en place du coeur (affichage)

        const heart = document.createElement("i");

        heart.className = "fa-regular fa-heart";
        heart.addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target.classList.toString().includes("fa-regular")) {
                e.target.classList.remove("fa-regular");
                e.target.classList.add("fa-solid");

                LikePicture(e.target, "add");
            } else {
                e.target.classList.remove("fa-solid");
                e.target.classList.add("fa-regular");

                LikePicture(e.target, "remove");
            }
        });

        mediaCard.appendChild(titleLikes);
        bloc_likes.appendChild(heart);
        // Ajout de la carte média à la section média
        mediaSection.appendChild(mediaCard);
    });

    // Système de tri pour le menu déroulant 

    const menu = document.getElementById('menu-select');
    menu.addEventListener('change', function(e) {
        // Clear toutes les images déjà présente
        document.querySelectorAll(".media_card").forEach((media_card) => {
            media_card.remove()
        });

        // Tri par popularité, date ou titre
        switch (e.target.value) {
            case "date":
                const date_filter = mediaObject.sort((a, b) => (a.date > b.date ? 1 : -1));
                showMedia(name, date_filter);
                break;
            case "popularite":
                const likes_filter = mediaObject.sort((a, b) => b.likes - a.likes);
                showMedia(name, likes_filter);
                break;
            case "titre":
                const title_filter = mediaObject.sort((a, b) => a.title.localeCompare(b.title));
                showMedia(name, title_filter);
                break;
            default:
                break;
        }
    });

}


init();