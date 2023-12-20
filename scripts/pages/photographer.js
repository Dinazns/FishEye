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

async function init() {
    // Récupère les datas des media
    const data = await getPhotographers();
    // Extraction de l'id
   const urlSearchParams = new URL(document.location).searchParams;
   const  _id = parseInt(urlSearchParams.get("id"));

    console.log("ID Page :", _id);

    if (!isNaN(_id)) {
        photographerInfo(data, _id);
        mediaLength = data.length;
    } else {
        console.error("l'id indéfini ou NaN");
    }
}
console.log(mediaLength);
async function photographerInfo(data, id) {
    const { media, photographers } = data;
    profile(photographers,id);
    showMedia(media,id);

};
function profile(photographers,id){
    const photographersObject = photographers.filter((photographer) => photographer.id === id)[0];
    let name = photographersObject.name;
    document.getElementById("name").innerText = name;
    document.getElementById("city").innerText = photographersObject.city;
    document.getElementById("country").innerText = photographersObject.country;
    document.getElementById("tagline").innerText = photographersObject.tagline;
    const portrait = `./assets/photographers/${photographersObject.portrait}`;
    document.getElementById("img_portrait").setAttribute("src", portrait);
}
function showMedia(media,id){
    const mediaObject = media.filter((media) => media.photographerId === id);
    
    console.log(mediaObject);
}
init();