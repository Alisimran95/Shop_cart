let addBtn = document.querySelectorAll('#add-btn');
let cart = document.querySelector(".cart .fas");
let counterSpan = document.querySelector("#counter")
let cartDisplay = document.querySelector("#cart-display");
let tBody = document.querySelector("tbody")

let products = [];

addBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        let item = {
            image:e.target.parentElement.parentElement.children[0].src,
            title:e.target.parentElement.parentElement.children[1].children[0].innerText,
            count:1,
        }
        addToLocal(item);
        
        // let uniqueProducts = [
        //     ...new Map(products.map((i)=>[i["title"],i])).values()
        // ];
        // console.log(uniqueProducts);
    })
});


function addToLocal(item){

    let cartItem  = JSON.parse(localStorage.getItem('productInCart'));
    if (cartItem === null) {
        products.push(item);
        localStorage.setItem("productInCart",JSON.stringify(products));
      
        // console.log(cartItem);
    }
    else{
        cartItem.forEach(i=>{
            if (item.title ===  i.title) {
                item.count = i.count +=1;
            }
            else{
             products.push(i);
            }

        });
        products.push(item);
    }
    localStorage.setItem('productInCart',JSON.stringify(products));
    products.forEach(pp=>{
        document.querySelector(".table tbody").innerHTML += 
        `<tr>
        <td>${pp.title}</td>
        <td>${pp.image}</td>
        <td>${pp.count}</td>
         </tr>
        `
}) 
  
    // window.location.reload();
}
