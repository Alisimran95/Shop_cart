const addBtn = document.querySelectorAll(".add-btn");
const products = document.querySelectorAll(".product");

let shopCart = document.querySelector(".shopping-cart i");
let showCart = document.querySelector("#show-carts");
let deleteIcon  = document.querySelector("#close");
let showRow = document.querySelector(".show-row");
let countSpan = document.querySelector("#count");

let productsCart = JSON.parse(localStorage.getItem("productCart"));

// for null
if (!productsCart) {
        productsCart = [];
}
products.forEach(product=>{
    product.addEventListener("click",(e)=>{
        if(e.target.classList.contains("add-btn")){
        // console.log(e.target);
        const productId = e.target.dataset.id;
        const productImage = e.target.parentElement.children[0].src;
        const productName = e.target.parentElement.children[2].innerText;
        const productPrice = e.target.parentElement.children[3].innerText;

        let productsToCart = {
            id:productId,
            image:productImage,
            name:productName,
            price:productPrice,
            count :1,
            totalPrice:0
            }
            updateProductsInCart(productsToCart);
            // console.log(productsCart);
            update();
            // deleteItems(productsToCart);
        }
    })
})

// UpdateProductsInCart function
function updateProductsInCart(product){
for (let i = 0; i < productsCart.length; i++) {
      if(productsCart[i].id === product.id){
          productsCart[i].count +=1;
          let mainPrice = productsCart[i].price.substring(1);

          if(productsCart[i].count > 1){
            productsCart[i].totalPrice = productsCart[i].count * mainPrice;
          }
          return;
      }  
    }
    countSpan.innerText++;
    productsCart.push(product);
}

// adding html 
function update(){
    localStorage.setItem("productCart",JSON.stringify(productsCart));

    if (productsCart.length > 0) {
        let result = productsCart.map(product=>{
           return `
           <div class="show-carts-item">
                <img src="${product.image}" alt="watch-image">
                <h5>${product.name}</h5>
                <div class="show-carts-price">${product.price}</div>
                <div class="quantity">${product.count}</div>
                <div class="show-carts-total-price">${product.totalPrice}</div>
                <i class="far fa-trash-alt"></i>  
                </div>
            `
        })  
        showRow.innerHTML = result.join('');
    }
    else{
     alert("cart is empty")
    }
}

// Showing showCart and close button on this

shopCart.addEventListener("click",(e)=>{
    showCart.style.display = "flex";  
    deleteIcon.addEventListener("click",()=>{
        showCart.style.display = "none";
    })
})