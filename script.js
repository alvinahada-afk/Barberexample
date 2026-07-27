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


// Simpan booking ke Firebase

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


let nomorPemilik = "6283892513500";


window.open(
"https://wa.me/"+nomorPemilik+"?text="+encodeURIComponent(pesan),
"_blank"
);


alert("✅ Booking berhasil dikirim!");

form.reset();


})


.catch((error)=>{

alert("❌ Error: "+error.message);

});


});


}
