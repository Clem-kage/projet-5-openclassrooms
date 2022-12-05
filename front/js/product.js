const url = "http://localhost:3000/api/products";
// mise en place de l'url
const queryString = window.location.search;
const paramUrl = new URLSearchParams(queryString)
const id = paramUrl.get("id")



let parentImage = document.querySelector('.item__img');
let imageProduit = document.querySelector('.item__img > img');
let NomProduit = document.querySelector('#title');
let prixProduit = document.querySelector('#price');
let descriptionProduit = document.querySelector('#description');
let couleurProduit = document.querySelector('#colors');
let option = document.querySelectorAll('#colors > option');
let ajout = document.querySelector('#addToCart');
// console.log(localStorage)

// appel de données-------------------------------------------------
fetch(`${url}/${id}`)
  .then((response) => response.json())
  .then((res) => {
   
// remplacement des données-------------------------------------
    imageProduit.src = res.imageUrl;
    imageProduit.alt = res.altTxt;
    NomProduit.textContent = res.name;
    prixProduit.textContent = res.price;
    descriptionProduit.textContent = res.description;
    res.colors.forEach(col => {
      option += `
    <option value="${col}">${col}</option>
    `
      couleurProduit.innerHTML = option;

    });


    let col = document.querySelector('#colors').value

    let quantite = Number(document.querySelector('#quantity').value)
    

//enregistrement des données dans le session storage-------------------------------------------
    ajout.addEventListener('click', function () {
      col = document.querySelector('#colors').value;
      quantite = Number(document.querySelector('#quantity').value)
     //convertion des données en objet
      let recupData = (data) => {
        let id = data._id;
        let nom = data.name;
        let prix = data.price; 
        let desc = data.description;
        let image = `<img  src="${data.imageUrl}" alt="${data.altTxt}"></img>`
        let obj = { id, nom, prix, desc, col, quantite, image };  
        return obj;
      }
      // modification de la session avec l'objet
      let panier = JSON.parse(sessionStorage.getItem('list'));
      let ajoutPanier = () => {
        panier.push(recupData(res));
        sessionStorage.setItem('list', JSON.stringify(panier));
      }
       // sécurité nen nombre d'article
      let nbArt = ()=>{
        if(recupData(res).quantite <= 0){
          alert('choisissez un nombre d\'article');
          return false;
        }
      }
      let secuPanier = () => {
        // for (let i = 0; i < panier.length; i++) {
          let target = panier.filter(item=> item.id === recupData(res).id && item.col === recupData(res).col);
          console.log(target)
          if(target.length == 0){
            alert("nouveau produit ajoué au panier")
            return false
          }
          else{
            alert('produit déja ajouté')
            return true
          }
     
  }

        // systeme de fond-----------------------------------------------------------------
        if (panier) {
          // console.log('ok');
          if (secuPanier() != true && nbArt() != false) {
            ajoutPanier();
          }
        }

        else {
          if(nbArt() != false)
          panier = [];
          ajoutPanier();
        }

        // console.log(panier)
        //  console.log(recupData(res).col)
      }
)
        // fin systeme de fond-----------------------------------------------------------------



  }
  )


