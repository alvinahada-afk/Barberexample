const tokoRef = db.collection("settings").doc("toko");


tokoRef.get().then((doc)=>{


if(doc.exists){


let data = doc.data();



let nama =
document.getElementById("namaToko");


let deskripsi =
document.getElementById("deskripsiToko");


let jam =
document.getElementById("jamBuka");



if(nama){

nama.innerHTML = data.namaToko;

}


if(deskripsi){

deskripsi.innerHTML = data.deskripsi;

}


if(jam){

jam.innerHTML =
"🕒 Buka: "+data.jamBuka;

}



}



});
