document.addEventListener("DOMContentLoaded", function(){

setTimeout(()=>{

if(typeof db === "undefined"){
console.log("DB TIDAK TERBACA");
return;
}


db.collection("settings")
.doc("toko")
.get()
.then((doc)=>{


if(doc.exists){

let data = doc.data();

console.log(data);


document.getElementById("namaToko").innerHTML =
data.namaToko;


document.getElementById("deskripsiToko").innerHTML =
data.deskripsi;


document.getElementById("jamBuka").innerHTML =
"Jam Buka : " + data.jamBuka;


}else{

console.log("Dokumen toko tidak ada");

}


})
.catch((error)=>{

console.log(error);

});


},1000);


});
