const settingRef = db.collection("settings").doc("toko");


// LOAD DATA

settingRef.get().then((doc)=>{


if(doc.exists){


let data = doc.data();


document.getElementById("namaToko").value =
data.namaToko || "";


document.getElementById("whatsapp").value =
data.whatsapp || "";


document.getElementById("deskripsi").value =
data.deskripsi || "";


document.getElementById("jamBuka").value =
data.jamBuka || "";


}


});





// SIMPAN


function simpanSetting(){


let data={


namaToko:
document.getElementById("namaToko").value,


whatsapp:
document.getElementById("whatsapp").value,


deskripsi:
document.getElementById("deskripsi").value,


jamBuka:
document.getElementById("jamBuka").value


};



settingRef.set(data)


.then(()=>{


alert("✅ Website berhasil diperbarui");


});


}
