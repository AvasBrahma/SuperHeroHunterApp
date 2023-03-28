//public key:c6a98dad0694af1086e032725e906e63
//privareKey:2379479983331c3043831c076dc97ba015ee690b
//hash MD5= 8ff042df82c2883916fd6cb327514f6a


const searchButton=document.querySelector('.search-btn');
const superheroContainter=document.getElementById('super-hero');
const searchContainer=document.querySelector('.header-search');
const suggestionBox=document.querySelector('.autocom-box');


searchButton.addEventListener('click', findSeachHero);
document.addEventListener('DOMContentLoaded', renderHomePage);
// fvtbutton.addEventListener('click', addToFavt);
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
               return data='<li>'+data+'</li>';
            })

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

 function findSeachHero(){
      
      let seachInputText=document.querySelector('.search-hero').value.trim();
     
      console.log('Search Hero : ', seachInputText);
     fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a`)
     .then(response=>response.json())
     .then(data=>{
        console.log('Data:::::::', data);

     })

    
 }

 function renderHomePage(){
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c6a98dad0694af1086e032725e906e63&hash=8ff042df82c2883916fd6cb327514f6a&limit=100&offset=100`)
    .then(response=>response.json())
    .then(data=>{
       fetchAllHeros(data);

    })

 }

 function fetchAllHeros(data){
   
    let html="";
    if(data.data){
        data.data.results.forEach(listofHero => {
          console.log(listofHero) ;
          console.log(listofHero.thumbnail.path);
          html+=`
          <div class="superhero-container">
          <div class="hero-img">
            <img src="${listofHero.thumbnail.path}.jpg" alt="">
          </div>
          <div class="hero-name">
              <h3>${listofHero.name}</h3>
              <a href="" class="hero-details-btn">Show Details</a>
              <button class="add-to-favourite"><i class="fa-solid fa-heart fvt"  id=${listofHero.id}></i></button>
              
          </div>
          </div>
          `;
         
        });
       
   }
   superheroContainter.innerHTML=html;

}

function checkHeroContainerAction(e){
   console.log("Added to Favourite checking");
      console.log(e.target);
      const item=e.target;
     
      if(item.classList[2]=="fvt"){
         const favtheroSelected=item.parentElement;
         console.log('fvt-parentelement :',favtheroSelected);
         favtheroSelected.classList.add("favourite-added");
         var favId=favtheroSelected.childNodes[0].id;
         savefvtToLocal(favId);
 
     }
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