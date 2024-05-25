let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let productdata=[]

function Fetchdata(){
    fetch("https://add-to-cart-backend-i1je.onrender.com/pitches")
    .then((res)=>res.json())
    .then((data)=>{
        CardList(data)
        productdata=data
    })
    .catch((err)=>console.log(err))
}
Fetchdata()

function CardList(data){
   const store=data.map((el)=>Card(el.id,el.image,el.title,el.price,el.founder,el.category,el.description))
   mainSection.innerHTML=store.join("")
}


function Card(id,image,title,price,founder,category,description){
   let SingleCard=`
   <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}&description=${encodeURIComponent(description)}">
   <div class="card" data-id=${id}>
   <div class="card-img">
     <img src=${image} alt="pitch">
   </div>
   <div class="card-body">
     <h4 class="card-title">${title}</h4>
     <p class="card-founder">Founder:${founder}</p>
     <p class="card-category">${category}</p>
     <p class="card-price">${price}</p>
     <a href="#" class="card-link" data-id=${id}>Edit</a>
     <button class="card-button" data-id=${id}>Delete</button>
   </div>
 </div>
</a>
   `

   return SingleCard
}

// ### POST PART ###

pitchCreateBtn.addEventListener("click",()=>{
    let product={
        title:pitchTitleInput.value,
        price:pitchPriceInput.value,
        category:pitchCategoryInput.value,
        image:pitchImageInput.value,
        founder:pitchfounderInput.value,
    }
   fetch("https://add-to-cart-backend-i1je.onrender.com/pitches",{
    method:"POST",
    headers:{
        'Content-Type': 'application/json',
    },
    body:JSON.stringify(product)
   }).then((res)=>res.json())
   .then((data)=>{
    console.log(data)
    alert("Product added...")
   }).catch((err)=>{
    console.log(err)
    alert("Somthing went wrong")
})
})


//### DELETE PART ###

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-button")){
        DeleteProduct(e.target.dataset.id)
    }
})

function DeleteProduct(id){
    fetch(`https://add-to-cart-backend-i1je.onrender.com/pitches/${id}`,{
        method:"DELETE"
    }).then((res)=>res.json())
    .then((data)=>{
        alert("deleted...")
        console.log(data)
    })
    .catch((err)=>console.log(err))
}


//### FILTER PART ###
filterFood.addEventListener("click",()=>{
    let filterData=productdata.filter((el)=>el.category==="Food")
    console.log(filterData)
    CardList(filterData)
})

filterElectronics.addEventListener("click",()=>{
    let filterData=productdata.filter((el)=>el.category==="Electronics")
    console.log(filterData)
    CardList(filterData)
})

filterPersonalCare.addEventListener("click",()=>{
    let filterData=productdata.filter((el)=>el.category==="Personal Care")
    console.log(filterData)
    CardList(filterData)
})


//### SHORTING PART ###
sortAtoZBtn.addEventListener("click",()=>{
    const sortAtoZBtn=productdata.sort((a,b)=>a.price-b.price)
    CardList(sortAtoZBtn)
})

sortZtoABtn.addEventListener("click",()=>{
    const sortZtoABtn=productdata.sort((a,b)=>b.price-a.price)
    CardList(sortZtoABtn)
})

//### UPDATE PART###

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link")){
        let id=e.target.dataset.id;
        PopulateForm(id);
    }
})

function PopulateForm(id){
    fetch(`https://add-to-cart-backend-i1je.onrender.com/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        updatePitchTitleInput.value=data.title
        updatePitchImageInput.value=data.image
        updatePitchfounderInput.value=data.founder
        updatePitchCategoryInput.value=data.category
        updatePitchPriceInput.value=data.price
        updatePitchIdInput.value=data.id
    })
    .catch((err)=>console.log(err))
}
updatePitchBtn.addEventListener("click",()=>{
    console.log(updatePitchPriceInput.value)
    let updateProductData={
        title:updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        founder:updatePitchfounderInput.value,
        category:updatePitchCategoryInput.value,
        price:updatePitchPriceInput.value,
        id:updatePitchIdInput.value
    }

    fetch(`https://add-to-cart-backend-i1je.onrender.com/pitches/${updateProductData.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updateProductData)
    }).then((res)=>res.json())
    .then((data)=>{
        alert("data updated...")
    })
    .catch((err)=>console.log(err))
})

// ### UPDATE PRICE ###
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link")){
        let id=e.target.dataset.id;
    }
})
updatePricePitchPriceButton.addEventListener("click",()=>{
    console.log(updatePricePitchPrice.value)
    let updateProductData={
        price:updatePricePitchPrice.value,
        id:updatePricePitchId.value
    }

    fetch(`https://add-to-cart-backend-i1je.onrender.com/pitches/${updateProductData.id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updateProductData)
    }).then((res)=>res.json())
    .then((data)=>{
        alert("data updated...")
    })
    .catch((err)=>console.log(err))
})
