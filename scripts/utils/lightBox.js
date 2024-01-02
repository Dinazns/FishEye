// const side_left = document.querySelector('.side_left');
// const side_right = document.querySelector('.side_right');

// Fermer la modale
document.querySelector('#lightBox span').addEventListener("click", () => {
    document.querySelector('#lightBox').style.display = 'none';
});

// // Evénements pour les flèches gauche et droite
// side_right.addEventListener('click', () => updateLightboxImage("right"));
// side_left.addEventListener('click', () => updateLightboxImage("left"));