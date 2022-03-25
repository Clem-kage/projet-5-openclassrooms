const url="http://localhost:3000/api/products";

let sectionProduit = document.querySelector('.items')
let produit = document.querySelector('a');

//--------------------pas besoin ???
// let nomProduit= document.querySelector('.items .productName');
// let image = document.querySelector('.items img');
// let description = document.querySelector('.items .productDescription');
// let footer= document.querySelector('footer');
//--------------------
async function récupererDonnees(){

const requete = await fetch(url, {
    method: 'GET'
});

if(!requete.ok) {
    alert('problème');
}
else{
  let data = await requete.json();
  
//    makeLink = (donnee)=>{
//    let link = document.createElement('a');
//     link.href="./product.html?id=" +  donnee[0]._id
//     console.log(link);
//     if( sectionProduit != null){
//         sectionProduit.appendChild(link)
//     }
//     return link;
//    }

//    makeLink(data);

//    makeArticle = ()=>{
//        let art = document.createElement('.items a article');
//        return art;

//    }

//    makeImage = (donnee)=>{
//        let image = document.querySelector('article > img')
//        image.src= donnee[0].imageUrl;
//        console.log(image);
//    }
//    makeImage(data);

//    makeH3 = (donnee)=>{
//        let title = document.querySelector('article > h3')
//        title.textContent = donnee[0].name; 
//        console.log(title);
//        return title;
//    }
//    makeH3(data)

//    makeDesc = (donnee)=>{
//        let description = document.querySelector('.productDescription')
//        description.textContent = donnee[0].description;
//        console.log(description);
//        return description;
//    }
//    makeDesc(data);

   













affichage = (donnees)=>{
   return donnees.forEach(canape => {
        produit+=`
        <a href="./product.html?id=${canape._id}">
        <article>
          <img src="${canape.imageUrl}" alt=${canape.altTxt}>
          <h3 class="productName">${canape.name}</h3>
          <p class="productDescription">${canape.description}</p>
        </article>
      </a>
    `
      sectionProduit.innerHTML = produit;
              console.log(produit);

    });
}  

affichage(data);

} 
}


récupererDonnees()
// image.src ='https://jeromeobiols.com/wordpress/wp-content/uploads/photo-montagne-vallee-blanche-chamonix-mont-blanc.jpg';
// console.log(image);
