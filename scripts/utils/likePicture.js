/*eslint no-global-assign: "error"*/
/*global likes_total:writable*/



// Affichage du total des likes de la page

function LikesPrice() { 
    
    likes_total = 0;

    const all_P_Likes = document.getElementsByClassName("p_likes");
    const total = document.querySelector(".total_likes");
    
    for (let i = 0; i < all_P_Likes.length; i++) {
    likes_total += parseInt(all_P_Likes[i].textContent);
    //mise à jour du total des likes
    total.textContent = likes_total;
    }

    console.log("NUMBER OF LIKES AND PRICE :", { likes_total });    
}
   

// Incrémentation lors du like de la photo ou de la vidéo (like individuel)

function LikePicture(like_heart, option) { // eslint-disable-line no-unused-vars
    let pParent = like_heart.parentNode.querySelector("p");
    let likesP = parseInt(pParent.textContent);

    pParent.innerText = (option === "add") ? likesP + 1 : likesP - 1;

    LikesPrice();
}
