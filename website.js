window.onload = function(){

const settingRef = db.collection("settings").doc("toko");


settingRef.get().then((doc)=>{


if(doc.exists){

let data = doc.data();


document.getElementById("namaToko").innerHTML =
data.namaToko;


document.getElementById("deskripsiToko").innerHTML =
data.deskripsi;


document.getElementById("jamBuka").innerHTML =
"Jam Buka : " + data.jamBuka;


}else{

console.log("Data toko tidak ditemukan");

}


}).catch((error)=>{

console.log("Firebase Error:",error);

});


};

console.log(db);
