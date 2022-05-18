const url="http://localhost:3000/api/products";

let sectionProduit = document.querySelector('.items')
let produit = document.querySelector('a');
console.log(localStorage.getItem('list'));
// let text = document.querySelector('#item:fisrt');
// console.log(text);
// --------------------pas besoin ???
let nomProduit= document.querySelector('.items .productName');
let image = document.querySelector('.items img');
let description = document.querySelector('.items .productDescription');
let footer= document.querySelector('footer');
//--------------------
// récupération des données---------------------
async function récupererDonnees(){

const requete = await fetch(url, {
    method: 'GET'
});

if(!requete.ok) {
    alert('problème');
}
else{
  let data = await requete.json();
  console.log(data);

//boucle de création d'articles-----------------------
  data.forEach(product => {
    


//fonction principale
  let affichage = (product)=>{
    

  let makeImage = (donnee)=>{
    let image = document.createElement('img')
    image.src = donnee.imageUrl;
    image.alt = donnee.altTxt;
    // console.log(image);
    return image;
  }

  let makeLink = (donnee)=>{
    let link = document.createElement('a');
    link.href = 'product.html?id='+ donnee._id;
    // console.log(link)
    return link;
  } 

  let makeDesc = (donnee)=>{
    result = donnee.description
   let desc =  document.createElement('p');
   desc.classList.add('productDescription');
   desc.textContent = result;

    return desc;
  }

  let makeName = (donnee)=>{
    result = donnee.name
    let Name =  document.createElement('h3');
    Name.textContent = result;
 
     return Name;
  }
  let makearticle = ()=>{
    let result = document.createElement('article');
    
    // makeLink(data.article).appendChild(result);
    return result;
  }

    let image =  makeImage(product);
    let article = makearticle();
    let desc = makeDesc(product);
    let pName = makeName(product);
    let lien  = makeLink(product);

    article.appendChild(image);
    lien.appendChild(article);
    article.appendChild(pName);
    article.appendChild(desc);
    // console.log(lien);
    sectionProduit.appendChild(lien);

    console.log(lien);
    return lien;
} 
affichage(product)
});


}

} 



récupererDonnees()
