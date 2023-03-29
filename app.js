//public key:c6a98dad0694af1086e032725e906e63
//privareKey:2379479983331c3043831c076dc97ba015ee690b
//hash MD5= 8ff042df82c2883916fd6cb327514f6a


const searchButton=document.querySelector('.search-btn');
const superheroContainter=document.getElementById('super-hero');
const searchContainer=document.querySelector('.header-search');
const suggestionBox=document.querySelector('.autocom-box');
const superHeroDetailsContainer=document.querySelector('.hero-details-content');
const heroDetailCloseBtn=document.querySelector('.details-close-btn');



heroDetailCloseBtn.addEventListener('click', ()=>{
   console.log("Close details section")
   superHeroDetailsContainer.parentElement.classList.remove('showHeroDetails');
})




suggestionBox.addEventListener('click', suggestionSearchHero);
searchButton.addEventListener('click', findSeachHero);
document.addEventListener('DOMContentLoaded', renderHomePage);
// fvtbutton.addEventListener('click',c addToFavt);
superheroContainter.addEventListener('click', checkHeroContainerAction)

const inputbox=document.querySelector('.search-hero');


   inputbox.onkeyup=(e)=>{
    console.log(e.target.value);
    let searchHero=e.target.value;
    if(searchHero.length>=3)
    {
    checkSuperHero(searchHero);
    }else{
        
      searchContainer.classList.remove("active");

    }
   }

 function checkSuperHero(searchItem){
    let suggestionArray=[];
     let emptyArray=[];
    console.log('check with search item : ', searchItem);
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a&limit=100&offset=30`)
     .then(response=>response.json())
     .then(data=>{
       
        if(data.data){
            data.data.results.forEach(listofHero => {

             if(listofHero.name.toLocaleLowerCase().startsWith(searchItem.toLocaleLowerCase()))
             {
                emptyArray.push(listofHero.name);
             }else
             {

             }
            })

             suggestionArray=emptyArray.map((data)=>{
               return data='<li>'+data+'<button class="AddToFavt-btn">AddToFavt</button></li>';
            })
            // let allSuggestion=suggestionBox.querySelectorAll("li");
            // for(let i=0;i<allSuggestion.length;i++){
            //  allSuggestion[i].setAttibute("onclick", "suggestionSearchHero(this)");
            // }


        } else {

         searchContainer.classList.remove("active");

        }
        showSuggestion(suggestionArray);


       

    
        
         
     })

 }

function showSuggestion(suggestion){
      let html='';
     let listData;  

    if(!suggestion.length){
       userValue=inputbox.value;
       listData=userValue;

    }else{
    
        searchContainer.classList.add("active");
        listData=suggestion.join('');
        console.log('sugesstion data :', listData);
    

    }
    suggestionBox.innerHTML=listData;

 }  


  function suggestionSearchHero(e){

   e.preventDefault();
     console.log("Suggestion Search Box",e.target);
     const item=e.target;
     console.log("Iten :", item);
     if(item.classList[0]=="AddToFavt-btn"){

        item.classList.add("favourite-added");
      //   var favId=favtheroSelected.childNodes[0].id;
      //   savefvtToLocal(favId);


        } else{
         console.log("Iside suggestion Search Hero", item);
         let searchItem=item.textContent;
         searchItem=searchItem.replace('AddToFavt','');
         console.log(searchItem);

         displayHeros(searchItem);
      

        }
  

  }




function displayHeros(seachInputText){

 
   let html='';


   fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a&limit=100&offset=30`)
   .then(response=>response.json())
   .then(data=>{
      
      if(data.data){
         data.data.results.forEach(listofHero => {
   
            if(listofHero.name.toLocaleLowerCase().startsWith(seachInputText.toLocaleLowerCase()))
            {
     
               if(isHeroAddedToFvt(listofHero.id)){
                 console.log("added tpo fvt section html")
                 html+=`
                 <div class="superhero-container">
                 <div class="hero-img">
                   <img src="${listofHero.thumbnail.path}.${listofHero.thumbnail.extension}" alt="">
                 </div>
                 <div class="hero-name">
                     <h3>${listofHero.name}</h3>
                     <a href="" class="hero-details-btn"  id=${listofHero.id} >Show Details</a>
                     <button class="add-to-favourite favourite-added"><i class="fa-solid fa-heart fvt"  id=${listofHero.id}></i></button>
                     
                 </div>
                 </div>
                 `;
     
               } else
               {
                 html+=`
                 <div class="superhero-container">
                 <div class="hero-img">
                   <img src="${listofHero.thumbnail.path}.${listofHero.thumbnail.extension}" alt="">
                 </div>
                 <div class="hero-name">
                     <h3>${listofHero.name}</h3>
                     <a href="" class="hero-details-btn"  id=${listofHero.id} >Show Details</a>
                     <button class="add-to-favourite"><i class="fa-solid fa-heart fvt"  id=${listofHero.id}></i></button>
                     
                 </div>
                 </div>
                 `;
     
               }
        superheroContainter.innerHTML=html;
               
            }
   
   
   
         })
      }
   


   })
   



}



 function findSeachHero(){
      
      let seachInputText=document.querySelector('.search-hero').value.trim();
      console.log('Search Hero : ', seachInputText);
      displayHeros(seachInputText);

 }

 function getHeros(){
   let apiRes;
     fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a&limit=100&offset=30`)
     .then(response=>response.json())
     .then(data=>{
        
          apiRes=data;
  

     })

     console.log("Get Heros :", apiRes);
    
 }

 function renderHomePage(){

   let html='';
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a&limit=100&offset=30`)
    .then(response=>response.json())
    .then(data=>{
      
      if(data.data){
         data.data.results.forEach(listofHero => {

            if(listofHero.description.length==0){
               return;
             }
             if(listofHero.thumbnail.path.includes("image_not_available")){
               return;
             }
   
             if(isHeroAddedToFvt(listofHero.id)){
               console.log("added tpo fvt section html")
               html+=`
               <div class="superhero-container">
               <div class="hero-img">
                 <img src="${listofHero.thumbnail.path}.${listofHero.thumbnail.extension}" alt="">
               </div>
               <div class="hero-name">
                   <h3>${listofHero.name}</h3>
                   <a href="" class="hero-details-btn"  id=${listofHero.id} >Show Details</a>
                   <button class="add-to-favourite favourite-added"><i class="fa-solid fa-heart fvt"  id=${listofHero.id}></i></button>
                   
               </div>
               </div>
               `;
   
             } else
             {
               html+=`
               <div class="superhero-container">
               <div class="hero-img">
                 <img src="${listofHero.thumbnail.path}.${listofHero.thumbnail.extension}" alt="">
               </div>
               <div class="hero-name">
                   <h3>${listofHero.name}</h3>
                   <a href="" class="hero-details-btn"  id=${listofHero.id} >Show Details</a>
                   <button class="add-to-favourite"><i class="fa-solid fa-heart fvt"  id=${listofHero.id}></i></button>
                   
               </div>
               </div>
               `;
   
             }
      superheroContainter.innerHTML=html;
         })

      }

    })

 }


function checkHeroContainerAction(e){

    e.preventDefault();

    console.log("Added to Favourite checking");
      console.log(e.target);
      const item=e.target;

  

     
      if(item.classList[2]=="fvt"){
         const favtheroSelected=item.parentElement;
         if(favtheroSelected.classList[1]=="favourite-added"){
            const eleSelected =item.parentElement;
            console.log("element selected",eleSelected)
            var favId=eleSelected.childNodes[0].id;
            removeFromLocalStorage(favId);

           // removeFromLocalStorage();
         }
         else{
            console.log('fvt-parentelement :',favtheroSelected);
            favtheroSelected.classList.add("favourite-added");
            var favId=favtheroSelected.childNodes[0].id;
            savefvtToLocal(favId);
         }
        
 
     }

     if(item.classList[0]=="hero-details-btn")
     {
      const heroId=item.id;
      console.log("HeroID", heroId);
      fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a&limit=100`)
      .then(response=>response.json())
      .then(data=>{
             
         if(data.data){
            data.data.results.forEach(listofHero => {

               if(listofHero.id==heroId){
                   showHeroDetails(listofHero);
               }
            

               
            })
     
      } 
     
     })


 }}    

   function showHeroDetails(listofHero){
       
   console.log('Inside Show Hero Details Func -->  hero selected :', listofHero);
  let html='';
      html=`
      <h2 class="hero-tile hero-features">${listofHero.name}</h2>
      <p>${listofHero.description}</p>
      <div class="Comins hero-role">
          <h3>${listofHero.comics.available} Comics</h3>
      </div>
      <div class="Events hero-role">
        <h3>${listofHero.events.available} Events</h3>
      </div>
      <div class="Series hero-role">
        <h3>${listofHero.series.available} Series</h3>
      </div>
      <div class="Stories hero-role">
        <h3>${listofHero.stories.available} Stories</h3>
      </div>
      <div class="hero-detail-img">
           <img src="${listofHero.thumbnail.path}.jpg" alt="">
      </div>
       <div class="additional-links">
         
          <a href="${listofHero.urls[0].url}" target="_blank">More Detail</a>
          <a href="${listofHero.urls[1].url}" target="_blank">Wiki</a>
          <a href="${listofHero.urls[2].url}" target="_blank">ComicLink</a>
       </div>
      
      
      `;
       
      superHeroDetailsContainer.innerHTML=html;
      superHeroDetailsContainer.parentElement.classList.add('showHeroDetails');
  

   }


 function savefvtToLocal(favourite){

   //checl already there 
   let lstfavourites;
   if(localStorage.getItem('lstfavourites')==null){
      lstfavourites=[];
   } else {
       console.log(JSON.parse(localStorage.getItem('lstfavourites')));
       lstfavourites=JSON.parse(localStorage.getItem('lstfavourites'));
   }
   lstfavourites.push(favourite);
   localStorage.setItem("lstfavourites", JSON.stringify(lstfavourites));


}

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

 let checkFvt=false;
 let listOfFavts=getFavourites();
 listOfFavts.forEach(function(heroIdDB){
      if(heroIdDB==heroID){
         console.log('hero added to fvt already =', heroID);
         checkFvt=true;
      }

 })
 return checkFvt;
}

function removeFromLocalStorage(heroId){
   let lstfavourites=getFavourites();
   console.log(heroId);
   lstfavourites.splice(lstfavourites.indexOf(heroId), 1);
   localStorage.setItem("lstfavourites", JSON.stringify(lstfavourites));
   renderHomePage();

} 