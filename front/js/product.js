const url="http://localhost:3000/api/products";

const queryString = window.location.search;
const paramUrl = new URLSearchParams(queryString)
const id = paramUrl.get("id")

let parentImage = document.querySelector('.item__img'); 
let imageProduit = document.querySelector('.item__img > img');
let NomProduit = document.querySelector('#title');
let prixProduit = document.querySelector('#price');
let descriptionProduit = document.querySelector('#description');
let couleurProduit = document.querySelector('#colors');
let option= document.querySelectorAll('#colors > option')


fetch(`${url}/${id}`)
.then((response)=>response.json())
.then((res) => {
// imageProduit+=`
// <img src="${res.imageUrl}" alt="${res.altTxt}">
// `
imageProduit.src=res.imageUrl;
imageProduit.alt=res.altTxt;
nomProduit = res.name;
prixProduit.textContent = res.price;
descriptionProduit.textContent = res.description;
res.colors.forEach(col => {
    option += `
    <option value="${col}">${col}</option>
    `
   couleurProduit.innerHTML = option;
    
});


})



//  }


//  affichage(res)



 

