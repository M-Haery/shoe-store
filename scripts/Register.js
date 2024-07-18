const $ = document
const registerBTN = $.querySelector("button")
const nameInput = $.querySelector(".name")
const passInput = $.querySelector(".pass")
const confirmPassInput = $.querySelector(".confirmPass")

registerBTN.addEventListener("click", function(){
    let nameValue = nameInput.value
    let passValue = passInput.value
    let confirmPassValue = confirmPassInput.value
    
    if(passValue === confirmPassValue){
    getUser(nameValue, passValue)
    }else{
     alert("The password is not correct")
    }
})

async function getUser(userName, userPass){
   let res = await fetch(`http://localhost:3000/users/?name=${userName}`)
   let user = await res.json()
   
   if(user.length == 0){
   registerNewUser(userName, userPass)
   }else{
    alert("this Username is already used")
   }
}

async function registerNewUser(newUserName, newUserPass,){
   let newUser = {name: newUserName ,password: newUserPass,admin: false}

   let res = await fetch(`http://localhost:3000/users/`,{
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
   })
   let data = res.json()
   console.log(data)
}