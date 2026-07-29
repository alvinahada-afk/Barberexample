window.onload = function(){

db.collection("settings")
.doc("toko")
.get()
.then((doc)=>{

console.log("Firebase jalan");

if(doc.exists){

const data = doc.data();

document.getElementById("namaToko").innerHTML = data.namaToko;

document.getElementById("deskripsiToko").innerHTML = data.deskripsi;

document.getElementById("jamBuka").innerHTML =
"Jam Buka : " + data.jamBuka;

}

})
.catch((error)=>{
console.log(error);
});

};
