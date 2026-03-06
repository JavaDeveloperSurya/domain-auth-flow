const params = new URLSearchParams(window.location.search)

const token = params.get("token")

if(token){

 localStorage.setItem("token",token)

}

const storedToken = localStorage.getItem("token")

fetch("/api/dashboard",{

 headers:{
  Authorization:`Bearer ${storedToken}`
 }

})
.then(res=>res.json())
.then(data=>{

 document.getElementById("user").innerText =
  JSON.stringify(data,null,2)

})

function logout(){

 localStorage.removeItem("token")

 window.location.href="/login.html"

}