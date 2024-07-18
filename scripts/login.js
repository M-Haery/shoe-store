const $ = document;
const nameInput = $.querySelector(".name");
const passInput = $.querySelector(".pass");
const btnElem = $.querySelector("button");



function loginHandler() {
    let nameValue = nameInput.value;
    let passValue = passInput.value;
  
    fetch(`http://localhost:3000/users?name=${nameValue}`)
      .then((res) => res.json())
      .then((data) => data[0])
      .then((user) => {
        if (passValue == user.password && user.admin == true) {
          window.location.href = "panel.html";
        } else {
          alert("یوزرنیم یا پسورد به درستی وارد نشده است");
        }
      })
      .catch((err) => {
        console.error("errr", err);
        alert("یوزرنیم اشتباه است یا خطایی رخ داده است");
      });
  }
  
  btnElem.addEventListener("click", loginHandler);
  