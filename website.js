// Ambil data toko dari Firebase

const settingRef = db.collection("settings").doc("toko");


settingRef.get()
.then((doc)=>{


    if(doc.exists){

        let data = doc.data();


        document.getElementById("namaToko").innerHTML =
        data.namaToko || "Alvin Barber Studio";


        document.getElementById("deskripsiToko").innerHTML =
        data.deskripsi || "Premium barber dengan style modern";


        document.getElementById("jamBuka").innerHTML =
        "Jam Buka : " + (data.jamBuka || "10:00 - 23:00");


    }else{


        // Jika dokumen Firebase tidak ditemukan

        document.getElementById("namaToko").innerHTML =
        "Alvin Barber Studio";


        document.getElementById("deskripsiToko").innerHTML =
        "Premium barber dengan style modern";


        document.getElementById("jamBuka").innerHTML =
        "Jam Buka : 10:00 - 23:00";


    }


})

.catch((error)=>{


    console.log("Firebase error:", error);


    document.getElementById("namaToko").innerHTML =
    "Alvin Barber Studio";


    document.getElementById("deskripsiToko").innerHTML =
    "Premium barber dengan style modern";


    document.getElementById("jamBuka").innerHTML =
    "Jam Buka : 10:00 - 23:00";


});
