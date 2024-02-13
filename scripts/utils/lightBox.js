const side_left = document.querySelector('.side_left');
const side_right = document.querySelector('.side_right');

// Ajout des écouteurs d'événements pour les flèches gauche et droite
side_right.addEventListener('click', () => updateLightboxImage("right"));
side_left.addEventListener('click', () => updateLightboxImage("left"));

// Fermer la modale
document.querySelector('#lightBox span').addEventListener("click", () => {
    document.querySelector('#lightBox').style.display = 'none';
});

function updateLightboxImage(sens) {
    const cards = Array.from(document.querySelectorAll(".media_card"));
    const containerLightbox = document.querySelector('.media_element');

    // mets les evenements de clique left et right au clavier

    if (sens === "right") {
        mediaPosition = (mediaPosition + 1) % cards.length;
    } else if (sens === "left") {
        mediaPosition = (mediaPosition - 1 + cards.length) % cards.length;
    }

    // Récupère le nom de la balise contenant mon image ou ma vidéo
    if(cards[mediaPosition].childNodes[0].nodeName.toLowerCase() === "img") {
        // Si ma lightbox contient une balise qui n'est pas de type image
        if(containerLightbox.childNodes[1].nodeName.toLowerCase() !== "img") {
            containerLightbox.querySelector('video').remove();

            const newImage = document.createElement("img");
            newImage.src = cards[mediaPosition].querySelector("img").src;

            containerLightbox.appendChild(newImage);
            return;
        }

        // On remplace la source de ma balise image situé dans ma lightbox
        containerLightbox.querySelector("img").src = cards[mediaPosition].querySelector("img").src;
    }

    if(cards[mediaPosition].childNodes[0].nodeName.toLowerCase() === "video") {
        // Si ma lightbox contient une balise qui n'est pas de type video
        if(containerLightbox.childNodes[1].nodeName.toLowerCase() !== "video") {
            containerLightbox.querySelector('img').remove();

            const newVideo = document.createElement("video");
            newVideo.setAttribute("src", cards[mediaPosition].querySelector("video").src);
            newVideo.setAttribute("controls", "true");

            containerLightbox.appendChild(newVideo);
            return;
        }

        // On remplace la source de ma balise image situé dans ma lightbox
        containerLightbox.querySelector("video").src = cards[mediaPosition].querySelector("video").src;
    }
}