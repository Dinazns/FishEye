// Mettre le code JavaScript lié à la page photographer.html

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

// ____________________________________________

// Rajoute dans le DOM la partie presentation du photographe en fct de son id
async function displayData(data, id) {
    const { media, photographers } = data;

    const mediaObject = media.filter((media) => media.photographerId === id);
    const photographersObject = photographers.filter(
        (photographer) => photographer.id === id
    )[0];

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

    //Parcours et Incrémentation de like ( Somme pour le total dans bloc_price )
    for (let i = 0; i < mediaObject.length; i++) {
        likes_total += mediaObject[i].likes;
    }

    LikesPrice(photographersObject.price, likes_total);
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
        const TitleLikes_media_card = document.createElement("div");
        TitleLikes_media_card.className = "TitleLikes_media_card";

        const p_title = document.createElement("p");
        const p_likes = document.createElement("p");
        const bloc_likes = document.createElement("div");

        bloc_likes.className = "bloc_likes";

        if (mediaElement.image) {
            const img = document.createElement("img");

            img.setAttribute("src", picturePath);

            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;

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
            video.setAttribute("controls", "true");

            p_title.textContent = mediaElement.title;
            p_likes.textContent = mediaElement.likes;

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

function LikesPrice(price, likes_total) {
    const bloc_price = document.getElementById("bloc_price");

    const p_likes = document.createElement("p");
    const p_price = document.createElement("p");
    const heart = document.createElement("i");
    const bloc_likes_total = document.createElement("div");

    p_price.textContent = price + "€" + "/jour";
    p_price.className = "price_color";
    p_price.style.color = "black";

    p_likes.innerText = likes_total;
    p_likes.className = "total_likes";

    heart.className = "fa-solid fa-heart";
    bloc_likes_total.className = "bloc_likes_total";

    bloc_price.appendChild(bloc_likes_total);
    bloc_likes_total.appendChild(p_likes);
    bloc_likes_total.appendChild(heart);
    bloc_price.appendChild(p_price);

    console.log("NUMBER OF LIKES AND PRICE :", { price, likes_total });
}

// Incrémentation lors du like de la photo ou de la vidéo

function LikePicture(like_heart, option) {
    let pParent = like_heart.parentNode.querySelector("p");
    let likesP = parseInt(pParent.textContent);

    pParent.innerText = (option === "add") ? likesP + 1 : likesP - 1;
}