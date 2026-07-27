// Tombol WhatsApp lama
function booking(){

let pesan = 
"Halo Alvin Barber Studio, saya ingin melakukan booking haircut.";

let nomor = "6283892513500";

window.open(
"https://wa.me/"+nomor+"?text="+encodeURIComponent(pesan)
);

}



// Sistem Booking Firebase

const form = document.getElementById("bookingForm");


if(form){


form.addEventListener("submit",(e)=>{


e.preventDefault();



let nama = document.getElementById("nama").value;

let nomor = document.getElementById("nomor").value;

let tanggal = document.getElementById("tanggal").value;

let jam = document.getElementById("jam").value;


db.collection("booking")
.where("tanggal","==",tanggal)
.where("jam","==",jam)
.get()
.then((snapshot)=>{


if(!snapshot.empty){

alert("❌ Jam tersebut sudah dibooking. Silakan pilih jam lain.");
return;

}


db.collection("booking").add({

nama:nama,
nomor:nomor,
tanggal:tanggal,
jam:jam,
status:"Pending"

})
.then(()=>{


let pesan =
"🔔 Booking Baru Alvin Barber Studio\n\n"+
"Nama: "+nama+"\n"+
"WhatsApp: "+nomor+"\n"+
"Tanggal: "+tanggal+"\n"+
"Jam: "+jam+"\n"+
"Status: Pending";


let nomorPemilik="6283892513500";


window.open(
"https://wa.me/"+nomorPemilik+"?text="+encodeURIComponent(pesan),
"_blank"
);


alert("Booking berhasil dikirim!");

form.reset();


})
.catch((error)=>{

alert("Gagal: "+error.message);

});


})
.catch((error)=>{

alert("Error cek booking: "+error.message);

});

.then((snapshot)=>{


if(!snapshot.empty){

alert("❌ Jam tersebut sudah dibooking. Silakan pilih jam lain.");

return;

}

db.collection("booking")
.where("tanggal","==",tanggal)
.where("jam","==",jam)
.get()
.then((snapshot)=>{


if(!snapshot.empty){

alert("❌ Jam tersebut sudah dibooking. Silakan pilih jam lain.");

return;

}


db.collection("booking").add({

nama:nama,
nomor:nomor,
tanggal:tanggal,
jam:jam,
status:"Pending"

})

.then(()=>{


let pesan =
"🔔 Booking Baru Alvin Barber Studio\n\n"+
"Nama: "+nama+"\n"+
"WhatsApp: "+nomor+"\n"+
"Tanggal: "+tanggal+"\n"+
"Jam: "+jam+"\n\n"+
"Status: Pending";


let nomorPemilik = "6283892513500";


window.open(
"https://wa.me/"+nomorPemilik+"?text="+encodeURIComponent(pesan),
"_blank"
);


alert("Booking berhasil dikirim!");

form.reset();


})

.catch((error)=>{

alert("Gagal: "+error.message);

});


});
}
