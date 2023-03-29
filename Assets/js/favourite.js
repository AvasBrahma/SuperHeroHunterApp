let listOfFvts=[];

const fvtSuperHeroContainter=document.getElementById('fvt-super-hero');
const fvtHeroContainter=document.getElementById('fvt-super-hero');

fvtHeroContainter.addEventListener('click', checkFavouriteEvents);

document.addEventListener('DOMContentLoaded', loadfavoutes);


function getFavourites(){
    let lstfavourites;
    if(localStorage.getItem('lstfavourites')==null){
        lstfavourites=[];
    } else {
        lstfavourites=JSON.parse(localStorage.getItem('lstfavourites'));
    }
    return lstfavourites;
}

function isHeroAddedToFvt(heroID){
  let listOfFavts=getFavourites();
  listOfFavts.forEach(function(heroIdDB){
       if(heroIdDB==heroID){
        return true;
       }

  })

}

 function loadfavoutes(){
     
    let listOfFavts=getFavourites();

      fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a&limit=100&offset=30`)
      .then(response=>response.json())
      .then(data=>{
     
         let html='';
         console.log(listOfFavts.length);
         if(listOfFavts.length==0){
          html+=`
          `;
          fvtSuperHeroContainter.innerHTML=html;

         }else{

          listOfFavts.forEach(function(heroId){
 
       
            if(data.data){
  
              data.data.results.forEach(listofHero => {
                       if(listofHero.id==heroId){
  
                         
          html+=`
            <div class="fvt-superhero-container">
            <div class="fvt-hero-img">
              <img src="${listofHero.thumbnail.path}.jpg" alt="">
            </div>
            <div class="fvt-hero-name">
                <h3>${listofHero.name}</h3>
                <a href="" class="fvt-hero-details-btn">Show Details</a>
                <button class="add-to-favourite favourite-added"><i class="fa-solid fa-heart fvt"  id=${listofHero.id}></i></button>
                
            </div>
            </div>
            `;
  
            fvtSuperHeroContainter.innerHTML=html;
  
  
                          // displayFavourites(listofHero);
  
                       }
              })
  
          }
  
          }
          
          )
 


         }
      

 
 
  }) 
     


}

function displayFavourites(favtHeros){

    console.log("favourite Heros ", favtHeros)

  let html='';
    html+=`
          <div class="fvt-superhero-container">
          <div class="fvt-hero-img">
            <img src="${favtHeros.thumbnail.path}.jpg" alt="">
          </div>
          <div class="fvt-hero-name favourite">
              <h3>${favtHeros.name}</h3>
              <a href="" class="hero-details-btn">Show Details</a>
              <button class="add-to-favourite"><i class="fa-solid fa-heart fvt"  id=${favtHeros.id}></i></button>
              
          </div>
          </div>
          `;

          fvtSuperHeroContainter.innerHTML=html;

}

function checkFavouriteEvents(e){

  e.preventDefault();

   console.log("Remove Favourites");
    console.log(e.target);
    const item=e.target;



   
    if(item.classList[2]=="fvt"){
       const favtheroSelected=item.parentElement;
       if(favtheroSelected.classList[1]=="favourite-added"){
          const eleSelected =item.parentElement;
          console.log("element selected",eleSelected)
          var favId=eleSelected.childNodes[0].id;
          removeFromLocalStorage(favId);
          loadfavoutes();
       
       }


}

}


function removeFromLocalStorage(heroId){
  let lstfavourites=getFavourites();
  console.log(heroId);
  lstfavourites.splice(lstfavourites.indexOf(heroId), 1);
  localStorage.setItem("lstfavourites", JSON.stringify(lstfavourites));
  loadfavoutes();

} 
    

    
    

