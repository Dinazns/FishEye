// Mettre le code JavaScript lié à la page photographer.html
// __________________________________________________________________________________

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

let _id;

async function init() {
    // Récupère les datas des media
    const data = await getPhotographers();

    // Extraction de l'id
    const urlSearchParams = new URL(document.location).searchParams;
    _id = parseInt(urlSearchParams.get("id"));

    console.log("ID Page :", _id);

    if (!isNaN(_id)) {
        displayData(data, _id);
    } else {
        console.error("l'id indéfini ou NaN");
    }
}

init();

// ___________________________________________________________________________________

// Rajoute dans le DOM la partie presentation du photographe en fonction de son id
async function displayData(data, id) {
    const { media, photographers } = data;

    const mediaObject = media.filter((media) => media.photographerId === id);
    const photographersObject = photographers.filter((photographer) => photographer.id === id)[0];

    console.log("MEDIA :", mediaObject);
    console.log("PHOTOGRAPHERS :", photographersObject);

    let name = photographersObject.name;

    document.getElementById("name").innerText = name;
    document.getElementById("city").innerText = photographersObject.city;
    document.getElementById("country").innerText = photographersObject.country;
    document.getElementById("tagline").innerText = photographersObject.tagline;

    const portrait = `./assets/photographers/${photographersObject.portrait}`;
    document.getElementById("img_portrait").setAttribute("src", portrait);

    setMediaPart(name, mediaObject);

    let likes_total = 0;
    LikesPrice(photographersObject.price, likes_total);

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
                setMediaPart(name, date_filter);
                break;
            case "popularite":
                const likes_filter = mediaObject.sort((a, b) => b.likes - a.likes);
                setMediaPart(name, likes_filter);
                break;
            case "titre":
                const title_filter = mediaObject.sort((a, b) => a.title.localeCompare(b.title));
                setMediaPart(name, title_filter);
                break;
            default:
                break;
        }
    });
};

// Affichage de la galerie d'images et videos

function setMediaPart(name, media) {
    const mediaSection = document.getElementById("media_section");
    // let lightboxIndex = 0;

    media.forEach((mediaElement) => {
        let divCreation = document.createElement("div");
        divCreation.className = "media_card";

        const picturePath = `assets/media/${name}/${mediaElement.image}`;
        const picturePathVideo = `assets/media/${name}/${mediaElement.video}`;

        // const {title, likes} = title_likesFromMedia;
        const TitleLikes_media_card = document.createElement("div");
        TitleLikes_media_card.className = "TitleLikes_media_card";

        const p_title = document.createElement("p");
        const p_likes = document.createElement("p");
        const bloc_likes = document.createElement("div");

        bloc_likes.className = "bloc_likes";

    // LIGHTBOX    _________________________________________________________

    function setupLightbox() {
        let lightboxIndex = 0;
        const cards = Array.from(document.querySelectorAll(".media_card img, .media_card video"));
        
        function updateLightboxImage(sens) {
            if (lightboxIndex !== null) {
                lightboxIndex = (sens === "right") ? (lightboxIndex + 1) % cards.length : (lightboxIndex - 1 + cards.length) % cards.length;
                document.querySelector('.lightBox img, .lightBox video').src = cards[lightboxIndex].src; // Met à jour la source de l'image ou de la vidéo dans la lightbox en utilisant l'index calculé
            } else {
                console.error("Position non trouvée");
            }
        }
        
        // Ouverture de la lightbox lors du clique sur une image ou video
        cards.forEach((media, index) => {
            media.addEventListener("click", () => {
                document.querySelector('.lightBox').style.display = 'block';
                document.querySelector('.lightBox img, .lightBox video').src = media.src;
        
                lightboxIndex = index;
        
                // Ajoutez des écouteurs d'événements pour les flèches gauche et droite
                side_right.addEventListener('click', () => updateLightboxImage("right"));
                side_left.addEventListener('click', () => updateLightboxImage("left"));
            });
        });
        
    }
        
    // Initialisation de la lightbox
    setupLightbox();

        if (mediaElement.image) {
            const img = document.createElement("img");
            img.setAttribute("src", picturePath);

            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;
            p_likes.className = "p_likes";
            
            img.addEventListener("click", () => {
                document.querySelector('.lightBox').style.display = 'block';
                document.querySelector('.lightBox img').src = img.src;
            });

            divCreation.appendChild(img);
            divCreation.appendChild(TitleLikes_media_card);
            TitleLikes_media_card.appendChild(p_title);
            TitleLikes_media_card.appendChild(bloc_likes);
            bloc_likes.appendChild(p_likes);
        }

        if (mediaElement.video) {
            const video = document.createElement("video");
            video.setAttribute("src", picturePathVideo);
            video.setAttribute("autoplay", "true");
            // video.setAttribute("controls", "true"); à mettre sur le carrousel lors de l'affichage de la vidéo

            // Ouverture de la lightbox lors du clique sur une video
            video.addEventListener("click", () => {
                document.querySelector('.lightBox').style.display = 'block';
                document.querySelector('.lightBox video').src = picturePathVideo;
                // video.setAttribute("controls", "true");
            });

            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;
            p_likes.className = "p_likes";

            divCreation.appendChild(video);
            divCreation.appendChild(TitleLikes_media_card);

            TitleLikes_media_card.appendChild(p_title);
            TitleLikes_media_card.appendChild(bloc_likes);
            bloc_likes.appendChild(p_likes);
        }

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

        bloc_likes.appendChild(heart);
        mediaSection.appendChild(divCreation);
    });
}

// (Mise en page) Affichage du nombre total de likes dans bloc_price et du TJM

function LikesPrice() { 
    let price,
    likes_total = 0;

    const all_P_Likes = document.getElementsByClassName("p_likes");
    const total = document.querySelector(".total_likes");
    
    for (let i = 0; i < all_P_Likes.length; i++) {
    likes_total += parseInt(all_P_Likes[i].textContent);
    //mise à jour du total des likes
    total.textContent = likes_total;
    }

    console.log("NUMBER OF LIKES AND PRICE :", { price, likes_total });    
}
   

// Incrémentation lors du like de la photo ou de la vidéo (like individuel)

function LikePicture(like_heart, option) {
    let pParent = like_heart.parentNode.querySelector("p");
    let likesP = parseInt(pParent.textContent);

    pParent.innerText = (option === "add") ? likesP + 1 : likesP - 1;

    LikesPrice();
}