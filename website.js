db.collection("settings")
.doc("toko")
.get()
.then((doc)=>{

if(doc.exists){

let data = doc.data();

document.getElementById("namaToko").innerHTML=data.namaToko;

document.getElementById("deskripsiToko").innerHTML=data.deskripsi;

document.getElementById("jamBuka").innerHTML=
"Jam Buka : "+data.jamBuka;

}

})
.catch(error=>{
console.log(error);
});
