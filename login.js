function login(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;


firebase.auth().signInWithEmailAndPassword(email,password)

.then((user)=>{

alert("Login berhasil");

window.location.href="admin.html";

})


.catch((error)=>{

document.getElementById("pesan").innerHTML =
"Login gagal : " + error.message;

});

}
