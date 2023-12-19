// Ouverture du formulaire

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

// Fermeture du formulaire

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Fonction pour afficher un message d'erreur
function showError(fieldId, message) {
    const container = document.getElementById(fieldId).parentElement;
    container.querySelector(".error").innerText = message;
}

// Sélectionnez le formulaire
let myForm = document.getElementById("myForm");

// Écoutez l'événement de soumission du formulaire
myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let error = false;

    // Réinitialisez tous les messages d'erreur
    const errorElements = document.getElementsByClassName('error');
    Array.from(errorElements).forEach((e) => {
        e.innerText = "";
    });

    // Récupérez les valeurs des champs
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();

    // Vérifiez chaque champ individuellement
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

    if(!error) myForm.submit();    
});