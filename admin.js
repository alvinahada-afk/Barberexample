firebase.auth().onAuthStateChanged(function(user){

if(!user){

window.location.href="login.html";

}

});



function logout(){

firebase.auth().signOut()

.then(function(){

window.location.href="login.html";

});

}
