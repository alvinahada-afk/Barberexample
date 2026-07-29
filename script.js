db.collection("settings")
.doc("toko")
.get()
.then((doc)=>{


if(doc.exists){

let data = doc.data();


}

})
.catch((error)=>{

});
