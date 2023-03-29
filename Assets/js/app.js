//public key:c6a98dad0694af1086e032725e906e63
//privareKey:
//hash MD5= 8ff042df82c2883916fd6cb327514f6a


const searchButton=document.querySelector('.search-btn');
const superheroContainter=document.getElementById('super-hero');
const searchContainer=document.querySelector('.header-search');
const suggestionBox=document.querySelector('.autocom-box');
const superHeroDetailsContainer=document.querySelector('.hero-details-content');
const heroDetailCloseBtn=document.querySelector('.details-close-btn');
const inputbox=document.querySelector('.search-hero');


heroDetailCloseBtn.addEventListener('click', ()=>{
   console.log("Close details section")
   superHeroDetailsContainer.parentElement.classList.remove('showHeroDetails');
})




suggestionBox.addEventListener('click', suggestionSearchHero);
searchButton.addEventListener('click', findSeachHero);
document.addEventListener('DOMContentLoaded', renderHomePage);
superheroContainter.addEventListener('click', checkHeroContainerAction)




let searchHero="";
 inputbox.onkeyup=(e)=>{
    console.log(e.target.value);
    searchHero=e.target.value;
    if(searchHero.length>=3)
    {
    checkSuperHero(searchHero);
    }else{
        
      searchContainer.classList.remove("active");

    }
   }


  // This Function is call when user type the search Text More Than 2 characters and search the heros
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
                emptyArray.push(listofHero);
             }else
             {

             }
            })

             suggestionArray=emptyArray.map((data)=>{
               // console.log('Empty Array :',data);
              if(isHeroAddedToFvt(data.id)){
                   
               return data='<li>'+data.name+'<button class="AddToFavt-btn favourite-added" id="'+data.id+'">AddToFavt</button></li>';

              }{
               return data='<li>'+data.name+'<button class="AddToFavt-btn" id="'+data.id+'">AddToFavt</button></li>';
              }

            })


        } else {

         searchContainer.classList.remove("active");

        }
        showSuggestion(suggestionArray);
    
        
         
     })

 }

 //This Function is to display the list of suggestion in Search Box
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

 //This Function checks the events click in suggestion box and as per the class name it decides the action
function suggestionSearchHero(e){

   e.preventDefault();
     console.log("Suggestion Search Box",e.target);
     const item=e.target;
     console.log("Iten :", item);
     if(item.classList[0]=="AddToFavt-btn"){
      var favId=item.id;
        if(item.classList[1]=="favourite-added"){
         removeFromLocalStorage(favId);
         checkSuperHero(searchHero);

          }else{
         item.classList.add("favourite-added");
         var favId=item.id;
         console.log("FvtID=",favId);
         savefvtToLocal(favId);
         toastr.success("Added to favourite")
          }
        } else{
         console.log("Iside suggestion Search Hero", item);
         let searchItem=item.textContent;
         searchItem=searchItem.replace('AddToFavt','');
         console.log(searchItem);
         displayHeros(searchItem);
      

        }
  

  }



// This Function is to display specific type of heros based on the hero name
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


//This Function is call when search botton is click a
 function findSeachHero(){
      
      let seachInputText=document.querySelector('.search-hero').value.trim();
      console.log('Search Hero : ', seachInputText);
      displayHeros(seachInputText);

 }

// This Functions Loads the list Heros and dsiplay in Hhome Page
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


 //Fucntion to check the events i,e clicks done in Hero container 
function checkHeroContainerAction(e){

    e.preventDefault();

    console.log("Added to Favourite checking");
      console.log(e.target);
      const item=e.target;

  

     
      if(item.classList[2]=="fvt"){
         const favtheroSelected=item.parentElement;
         //If Already added to fvaourite then remove from the favourite
         if(favtheroSelected.classList[1]=="favourite-added"){
            const eleSelected =item.parentElement;
            console.log("element selected",eleSelected)
            var favId=eleSelected.childNodes[0].id;
            removeFromLocalStorage(favId);
            renderHomePage();
         }  // if not added to favourite then add to favourite
         else{
            console.log('fvt-parentelement :',favtheroSelected);
            favtheroSelected.classList.add("favourite-added");
            var favId=favtheroSelected.childNodes[0].id;
            savefvtToLocal(favId);
            renderHomePage();
         }
        
 
     }
    // Check if user click the Show Details Button or not if yes then fetch the details and will call show detail fucntion
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

 // Function to show details of an Hero
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


//Function to save the favt heros in local storage
 function savefvtToLocal(favourite){
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

// function to get the favourites from the local storage
function getFavourites(){
   let lstfavourites;
   if(localStorage.getItem('lstfavourites')==null){
       lstfavourites=[];
   } else {
       lstfavourites=JSON.parse(localStorage.getItem('lstfavourites'));
   }
   return lstfavourites;
}

// Funciton to check if hero is already added or not in local storage
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

// function to remove from the local storage
function removeFromLocalStorage(heroId){
   let lstfavourites=getFavourites();
   console.log(heroId);
   lstfavourites.splice(lstfavourites.indexOf(heroId), 1);
   localStorage.setItem("lstfavourites", JSON.stringify(lstfavourites));

} 