const $ = document;
const productContainer = $.querySelector(".product-container");
const moonBTN = $.querySelector(".moonBTN")
const HTML = $.querySelector("html")

window.addEventListener("load", function () {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((datas) => {
      datas.forEach((product) => {

        productContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="flex flex-col justify-center items-center bg-orange-300 h-[450px] w-72 m-auto gap-y-5 rounded-xl">
      <img src="${product.imageURL}" alt="" class="rounded-xl">
      <h2 class="text-2xl font-bold">${product.title}</h2>
      <h2 class="text-xl font-bold">${product.price}$</h2>
      <button class="w-20 h-9 bg-emerald-400 hover:bg-emerald-500 rounded-3xl text-white">BUY</button>
    </div>`
        );
      });
    });
});

function darkModeHandler(){

   if(HTML.classList == "dark"){
    HTML.classList.remove("dark")
   }else{
    HTML.classList.add("dark")
   }
}

moonBTN.addEventListener("click", darkModeHandler)