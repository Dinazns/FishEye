
// Ouverture du formulaire

function displayModal() { // eslint-disable-line no-unused-vars
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById("firstname").focus();
}

// Fermeture du formulaire

function closeModal() { // eslint-disable-line no-unused-vars
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Fonction pour afficher un message d'erreur
function showError(fieldId, message) {
    const container = document.getElementById(fieldId).parentElement;
    container.querySelector(".error").innerText = message;
}

// Sélectionne le formulaire
let myForm = document.getElementById("myForm");

// Écoute l'événement de soumission du formulaire
myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let error = false;

    // Réinitialise tous les messages d'erreur
    const errorElements = document.getElementsByClassName('error');
    Array.from(errorElements).forEach((e) => {
        e.innerText = "";
    });

    // Récupére les valeurs des champs
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const messageForm = document.getElementById("message").value;

    // Vérifie chaque champ individuellement
    if (firstname === "") {
        error = true;
        showError("firstname", "Veuillez saisir votre prénom correctement");
    }

    if (lastname === "") {
        error = true;
        showError("lastname", "Veuillez saisir votre nom correctement");
    }

    if (email === "") {
        error = true;
        showError("email", "Veuillez saisir votre email correctement");
    }

    // if(!error) myForm.submit();   
    
    // Affiche les données du formulaire s'il n'y a pas d'erreur
    if (!error) {
        console.log("DONNEES DU FORMULAIRE :");
        console.log(" Prénom : " + firstname);
        console.log(" Nom : " + lastname);
        console.log(" Email : " + email);
        console.log(" Message : " + messageForm);
     } // else {
    //     e.preventDefault();
    // }
});