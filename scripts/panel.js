const $ = document;
const openModalBTN = $.querySelector(".open-modal");
const modal = $.querySelector(".modal");
const closeModal = $.querySelector(".close-modal");
const backDrop = $.querySelector(".back-drop");

const nameInput = $.querySelector(".name-input");
const pathInput = $.querySelector(".path-input");
const priceInput = $.querySelector(".price-input");
const subBTN = $.querySelector(".subBTN");

const editmodal = $.querySelector(".editmodal")
const editBackDrop = $.querySelector(".edit-back-drop")
const closeEditModal = $.querySelector(".close-edit-modal")
const subEditBTN = $.querySelector(".subEditBTN")
const editNameInput = $.querySelector(".edit-name-input");
const editPathInput = $.querySelector(".edit-path-input");
const editPriceInput = $.querySelector(".edit-price-input");

const productDataContainer = $.querySelector(".productDataContainer");

window.addEventListener("load", function () {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((datas) => {
      datas.forEach((product) => {
        productDataContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="flex justify-around p-2">
            <h3 class="ID w-40 text-center">${product.id}</h3>
            <h3 class="w-40 text-center">${product.title}</h3>
            <h3 class="w-40 text-center">0</h3>
            <h3 class="w-40 text-center">${product.price}</h3>
            <div class="flex w-40 text-center">
            <img onclick="removeProduct(event)" class="w-6 h-6" src="./images/svg/icons8-x-50.png" alt="">

            <img onclick="openEditModal(event)" class="w-6 h-6" src="images/svg/icons8-edit-50.png" alt="">
            </div>
          </div>`
        );
      });
    });
});

function removeProduct(e) {

   let removedProductID = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML

        fetch(`http://localhost:3000/products/${removedProductID}`,{
          method:"DELETE"
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          location.reload()
        })
        
}

function openEditModal(e){
  let editedProductID = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
  
  editmodal.classList.remove("hidden");
  editBackDrop.classList.remove("hidden");
  closeEditModal.addEventListener("click", function () {
    editmodal.classList.add("hidden");
    editBackDrop.classList.add("hidden");
  });
  editBackDrop.addEventListener("click", function () {
    editmodal.classList.add("hidden");
    editBackDrop.classList.add("hidden");
  });
  
  subEditBTN.addEventListener("click", ()=>{
    let editnameValue = editNameInput.value;
    let editpriceValue = editPriceInput.value;
    let editpathValue = editPathInput.value;
    
    let editedProduct = {
      title: editnameValue,
      price: editpriceValue,
      imageURL: editpathValue,
      views: 200,
    };
    
    fetch(`http://localhost:3000/products/${editedProductID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedProduct),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      location.reload()
    });
  modal.classList.add("hidden");
  backDrop.classList.add("hidden");
    
  })
  
}

function openAddProductModalHandler() {
  modal.classList.remove("hidden");
  backDrop.classList.remove("hidden");
  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
    backDrop.classList.add("hidden");
  });
  backDrop.addEventListener("click", function () {
    modal.classList.add("hidden");
    backDrop.classList.add("hidden");
  });
}

function addProductHandler() {
  let nameValue = nameInput.value;
  let priceValue = priceInput.value;
  let pathValue = pathInput.value;

  let newProduct = {
    title: nameValue,
    price: priceValue,
    imageURL: pathValue,
    views: 200,
  };

  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      location.reload()
    });
  modal.classList.add("hidden");
  backDrop.classList.add("hidden");

}

openModalBTN.addEventListener("click", openAddProductModalHandler);
subBTN.addEventListener("click", addProductHandler);

