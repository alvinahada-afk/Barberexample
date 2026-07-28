function login(){


let email = document.getElementById("email").value;

let password = document.getElementById("password").value;


auth.signInWithEmailAndPassword(email,password)

.then(()=>{


window.location.href="admin.html";


})


.catch((error)=>{


document.getElementById("pesan").innerHTML =
"Login gagal: " + error.message;


});


}


// cek kalau sudah login

auth.onAuthStateChanged((user)=>{


if(user){

window.location.href="admin.html";

}


});
