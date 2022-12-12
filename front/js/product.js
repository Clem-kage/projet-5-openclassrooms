const url = "http://localhost:3000/api/products";
// mise en place de l'url
const queryString = window.location.search;
const paramUrl = new URLSearchParams(queryString);
const id = paramUrl.get("id");

let alreadyHave = false;

let parentImage = document.querySelector(".item__img");
let imageProduit = document.querySelector(".item__img > img");
let NomProduit = document.querySelector("#title");
let prixProduit = document.querySelector("#price");
let descriptionProduit = document.querySelector("#description");
let couleurProduit = document.querySelector("#colors");
let option = document.querySelectorAll("#colors > option");
let ajout = document.querySelector("#addToCart");

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
    option += '<option value="">--SVP, choisissez une couleur --</option>';
    res.colors.forEach((col) => {
      option += `
    <option value="${col}">${col}</option>
    `;
      couleurProduit.innerHTML = option;
    });

    let col = document.querySelector("#colors").value;
    let quantite = Number(document.querySelector("#quantity").value);
    let inputQantite = document.querySelector("#quantity");
    inputQantite.setAttribute("value", 1);

    inputQantite.addEventListener("change", (e) => {
      let quant = e.target.value;
      if (quant >= 100 || quant <= 0) {
        alert("quantité impossible ");
        location.reload();
      }
    });
    //enregistrement des données dans le session storage-------------------------------------------
    ajout.addEventListener("click", function () {
      col = document.querySelector("#colors").value;
      quantite = Number(document.querySelector("#quantity").value);
      //convertion des données en objet
      let recupData = (data) => {
        let id = data._id;
        let nom = data.name;
        let desc = data.description;
        let image = `<img  src="${data.imageUrl}" alt="${data.altTxt}"></img>`;
        let obj = { id, nom, desc, col, quantite, image };
        return obj;
      };
      // modification de la session avec l'objet
      let panier = JSON.parse(sessionStorage.getItem("list"));

      let ajoutPanier = () => {
        if (alreadyHave != true) {
          panier.push(recupData(res));
          sessionStorage.setItem("list", JSON.stringify(panier));
          alert("nouveau produit ajouté au panier");
        } else if (alreadyHave == true) {
          alert("produit déja ajouté");
          let target = (panier.filter(
            (item) =>
              item.id === recupData(res).id && item.col === recupData(res).col)
          );
          let result = parseInt(target[0].quantite + recupData(res).quantite);
          // console.log("target à supprimer: "+ JSON.stringify(target))
          let delElement = panier.find(item=> item === target[0])
          // console.log(panier.indexOf(delElement))
          let baseChoice = recupData(res);
          let newChoice = Object.defineProperty(baseChoice, "quantite", {
            value: result,
            writable: false,
          });

          panier.splice(panier.indexOf(delElement), 1, newChoice) 
          // console.log("nouvel article à push: " + JSON.stringify(newChoice))
          // console.log("panier: "+ JSON.stringify(panier))
          sessionStorage.setItem("list", JSON.stringify(panier));
        }
      };
      // sécurité nen nombre d'article
      let choixUtilisateur = () => {
        if (recupData(res).quantite <= 0) {
          alert("choisissez un nombre d'article");
          throw false;
        } else if (recupData(res).col == "") {
          alert("choisissez une couleur");
          throw false;
        } else {
          return true;
        }
      };

      let managQuantite = () => {
        let target = panier.filter(
          (item) =>
            item.id === recupData(res).id && item.col === recupData(res).col
        );
        if (panier.length < 0) {
          alreadyHave = false;
           return false; 
        } 
        if (target.length > 0) {
          alreadyHave = true;
          return false;
        }
      };

      // systeme de fond-----------------------------------------------------------------
      if (panier) {
        if (managQuantite() != true && choixUtilisateur() != false) {
          ajoutPanier();
        }
      } else if (choixUtilisateur() != false) {
        panier = [];
        ajoutPanier();
      }
      panier = JSON.parse(sessionStorage.getItem("list"));
    });
    // fin systeme de fond-----------------------------------------------------------------
  });
