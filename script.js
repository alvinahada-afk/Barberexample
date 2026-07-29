alert("SCRIPT JALAN");

db.collection("settings")
.doc("toko")
.get()
.then((doc)=>{

alert("Firebase terbaca");

if(doc.exists){

let data = doc.data();

alert(JSON.stringify(data));

}

})
.catch((error)=>{

alert(error.message);

});
