let tab = JSON.parse(sessionStorage.getItem("list"));

let sectionArticle = document.querySelector("#cart__items");
let totalPrix = document.querySelector("#totalPrice");
let totalQ = document.querySelector("#totalQuantity");

let base = 0;
totalPrix.textContent = base;
let transfert = [];

afficher = (products, price) => {
  const Prix = price;
  console.log(Prix);
  let makeArticle = (data) => {
    let art = document.createElement("article");
    art.classList.add("cart__item");
    art.setAttribute("data-id", data.id);
    art.setAttribute("data-color", data.col);
    return art;
  };
  let makeImage = (data) => {
    let divImage = document.createElement("div");
    divImage.classList.add("cart__item__img");
    const image = data.image;
    divImage.innerHTML = image;
    return divImage;
  };
  let makeContent = () => {
    let container = document.createElement("div");
    container.classList.add("cart__item__content");
    return container;
  };
  let makeDescription = () => {
    let description = document.createElement("div");
    description.classList.add("cart__item__content__description");
    return description;
  };
  let makeName = (data) => {
    let Name = document.createElement("h2");
    Name.textContent = data.nom;
    return Name;
  };
  let makeCol = (data) => {
    let color = document.createElement("p");
    color.textContent = data.col;
    return color;
  };
  let makePrice = (data) => {
    let prix = "prix";
    let price = document.createElement("p");
    price.textContent = Prix;
    price.classList.add("prix");
    return price;
  };
  let makeSets = () => {
    let set = document.createElement("div");
    set.classList.add("cart__item__content__settings");
    return set;
  };
  let makeQuantity = (data) => {
    let name = "itemQuantity";
    number = "number";
    let quant = document.createElement("div");
    quant.classList.add("cart__item__content__settings__quantity");
    let para = document.createElement("p");
    let nombreProduit = data.quantite;
    para.textContent = "Qté :" + nombreProduit;
    quant.appendChild(para);

    let input = document.createElement("input");
    input.setAttribute("type", number);
    input.setAttribute("name", name);
    input.setAttribute("min", 1);
    input.setAttribute("max", 100);
    input.setAttribute("value", data.quantite);

    input.addEventListener("input", (e) => {
      let NumbQuant = e.target.value;
      para.textContent = "Qté :" + NumbQuant;
      if (NumbQuant >= 100 || NumbQuant <= 0) {
        alert("quantité impossible ");
        location.reload();
      }
    });

    quant.appendChild(input);
    input.classList.add("itemQuantity");

    let newquantity = () => {
      para.textContent = "Qté :" + input.value;
    };
    newquantity();

    let total = () => {
      let result = Prix * Number(input.value);
      prix.textContent = result;
    };

    total();

    input.addEventListener("input", (e) => {
      setTimeout(() => {
        totalArticles(tab);
      }, 1000);
      total(products);
    });

    return quant;
  };
  let makeDelete = (sesSto) => {
    let div = document.createElement("div");
    div.classList.add("cart__item__content__settings__delete");
    let lien = document.createElement("a");
    lien.href = "/front/html/cart.html";
    lien.style.textDecoration = "none";
    lien.style.color = "inherit";
    lien.addEventListener("click", () => {
      article.style.display = "none";
      sesSto.pop();
      sessionStorage.setItem("list", JSON.stringify(sesSto));

      if (tab < 1) {
        sessionStorage.clear();
      }
    });
    let btnSupp = document.createElement("p");
    btnSupp.classList.add("deleteItem");
    btnSupp.textContent = "supprimer";
    div.appendChild(lien);
    lien.appendChild(btnSupp);

    return div;
  };
  let article = makeArticle(products);
  let image = makeImage(products);
  let contenu = makeContent();
  let description = makeDescription();
  let Name = makeName(products);
  let col = makeCol(products);
  let prix = makePrice(products);
  let settings = makeSets();
  let divQuantite = makeQuantity(products);
  let divDelete = makeDelete(tab);

  sectionArticle.appendChild(article);
  article.appendChild(image);
  article.appendChild(contenu);
  contenu.appendChild(description);
  description.appendChild(Name);
  description.appendChild(col);
  description.appendChild(prix);
  contenu.appendChild(settings);
  settings.appendChild(divQuantite);
  settings.appendChild(divDelete);
  article.appendChild(contenu);

  //---------------------------------------------------------------------
  //fin systeme d'affichage

  //systeme de calcul-------------------------------------------------------
  let totalArticles = () => {
    let tabPrix = [];
    let tabQuant = [];
    let prices = document.querySelectorAll(".prix");
    let quantity = document.querySelectorAll(".itemQuantity");

    prices.forEach((oneP) => {
      let resP = oneP.textContent;
      let resultatP = Number(resP);
      tabPrix.push(resultatP);
    });
    quantity.forEach((oneQ) => {
      let resQ = Number(oneQ.value);
      tabQuant.push(resQ);
    });

    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let finalPrice = tabPrix.reduce(reducer);
    totalPrix.innerHTML = finalPrice;
    let finalQuant = tabQuant.reduce(reducer);
    totalQ.innerHTML = finalQuant;
  };
  totalArticles();
  //systeme de calcul-------------------------------------------------------
};

let appelAPI = async (singleprod) => {
  fetch(`http://localhost:3000/api/products/${singleprod.id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((dataP) => {
      let Prix = dataP.price;

      afficher(singleprod, Prix);
      console.log(Prix);
    });
};

if (tab !== null) {
  tab.forEach((products) => {
    appelAPI(products);
  });
}

// systeme de protection de formulaire------------------------------------------------------------------------------
let formPrenom = document.querySelector(
  ".cart__order__form__question:nth-child(1) input"
);
let formNom = document.querySelector(
  ".cart__order__form__question:nth-child(2) input"
);
let formAdresse = document.querySelector(
  ".cart__order__form__question:nth-child(3) input"
);
let formVille = document.querySelector(
  ".cart__order__form__question:nth-child(4) input"
);
let formEmail = document.querySelector(
  ".cart__order__form__question:nth-child(5) input"
);

let messErreurPrenom = document.querySelector(
  ".cart__order__form__question:nth-child(1) p"
);
let messErreurNom = document.querySelector(
  ".cart__order__form__question:nth-child(2) p"
);
let messErreurAdresse = document.querySelector(
  ".cart__order__form__question:nth-child(3) p"
);
let messErreurVille = document.querySelector(
  ".cart__order__form__question:nth-child(4) p"
);
let messErreurEmail = document.querySelector(
  ".cart__order__form__question:nth-child(5) p"
);
let messages = document.querySelectorAll(".cart__order__form__question p");

let valid = document.getElementById("order");
let formulaire = document.querySelector(".cart__order__form");

let messageErreur = "formulaire non valide";
let messageCorrect = "formulaire valide";

//rejex voulu
let lettres = /^[a-zA-Z\u00C0-\u00FF]*$/;
let chiffres = /^[0-9]/;
let mail = /\S+@\S+\.\S+/;

//verification des champs de formulaire
let verifLettre = (input, mess) => {
  input.addEventListener("input", (e) => {
    let valeur = e.target.value;
    if ((lettres.test(valeur) == false) != "") {
      mess.textContent = "chiffres et caractères spéciaux non autorisés";
      mess.style.color = "red";
      return false;
    } else {
      mess.textContent = messageCorrect;
      mess.style.color = "green";
      return true;
    }
  });
};

let verifAdresse = (input, mess) => {
  input.addEventListener("input", (i) => {
    let valeur = i.target.value;
    if (lettres.test(valeur) == false && chiffres.test(valeur) == false) {
      mess.textContent = "caractères spéciaux non autorisés";
      mess.style.color = "red";
      return false;
    } else {
      mess.textContent = messageCorrect;
      mess.style.color = "green";
      return true;
    }
  });
};

let verifMail = (input, mess) => {
  input.addEventListener("input", (a) => {
    let valeur = a.target.value;
    if (valeur.search(mail) === 0) {
      mess.textContent = messageCorrect;
      mess.style.color = "green";
      return true;
    } else if (valeur.search(mail) === -1) {
      mess.textContent = "adresse email non valide";
      mess.style.color = "red";
      return false;
    }
  });
};

// fin verification des champs de formulaire

verifLettre(formPrenom, messErreurPrenom);
verifLettre(formNom, messErreurNom);
verifLettre(formVille, messErreurVille);
verifAdresse(formAdresse, messErreurAdresse);
verifMail(formEmail, messErreurEmail);

// sécurité en plus
let formulairevalid = () => {
  let tabForm = [];
  messages.forEach((ele) => {
    tabForm.push(ele.textContent);
  });
  for (let e = 0; e <= tabForm.length; e++) {
    if (tabForm[e] != messageCorrect) {
      return false;
    } else {
      return true;
    }
  }
};

let notempty = () => {
  let allForms = document.querySelectorAll(
    ".cart__order__form__question input"
  );
  allForms.forEach((ele) => {
    if (ele.value === "") {
      return false;
    } else {
      return true;
    }
  });
};
// fin verification des champs de formulaire

// mise en forme dela requete
let requeteForm = () => {
  let products = [];
  tab.forEach((product) => {
    let res = product.id;
    products.push(res);
  });

  let firstName = formPrenom.value;
  let lastName = formNom.value;
  let address = formAdresse.value;
  let city = formVille.value;
  let email = formEmail.value;

  let contact = { firstName, lastName, address, city, email };
  let result = { products, contact };
  // console.log(result)
  return result;
};
// fin mise en forme dela requete

// requete transmise à l'API
let soumettreFormulaire = () => {
  // e.preventDefault();
  const objet = requeteForm();
  let option = {
    method: "POST",
    body: JSON.stringify(objet),
    headers: {
      "content-type": "application/json",
    },
  };
  // console.log(objet);

  fetch("http://localhost:3000/api/products/order", option)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      sessionStorage.setItem("orderId", data.orderId);
      document.location.href = `confirmation.html?id=${data.orderId}`;
    })
    .catch((err) => console.log(err));
};

//  systeme de fond
valid.addEventListener("click", (e) => {
  e.preventDefault();
  let quant = Number(document.querySelector(".itemQuantity").value);
  if (quant >= 100 || quant <= 0) {
    alert(" nombre d'article incorecte");
    location.reload();
  }
  if (formulairevalid() == true) {
    soumettreFormulaire();
  } else {
    alert("validez le panier avec vos informations");
  }
});

// fin systeme de protection de formulaire------------------------------------------------------------------------------

//
