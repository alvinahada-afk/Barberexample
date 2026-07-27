// Tombol WhatsApp lama
function booking(){

let pesan = 
"Halo Alvin Barber Studio, saya ingin melakukan booking haircut.";

let nomor = "6283892513500";

window.open(
"https://wa.me/"+nomor+"?text="+pesan
);

}


// Sistem Booking Firebase

const form = document.getElementById("bookingForm");

if(form){

form.addEventListener("submit", (e)=>{

e.preventDefault();


document.getElementById("bookingForm").addEventListener("submit", function(e){

e.preventDefault();

let nama = document.getElementById("nama").value;
let nomor = document.getElementById("nomor").value;
let tanggal = document.getElementById("tanggal").value;
let jam = document.getElementById("jam").value;


db.collection("booking").add({

nama: nama,
nomor: nomor,
tanggal: tanggal,
jam: jam,
status: "Menunggu"

})
.then(()=>{

alert("Booking berhasil dikirim!");

document.getElementById("bookingForm").reset();

})
.catch((error)=>{

alert("Gagal: " + error.message);

});

});

nama: document.getElementById("nama").value,

nomor: document.getElementById("nomor").value,

tanggal: document.getElementById("tanggal").value,

jam: document.getElementById("jam").value,

status: "Menunggu"

})

.then(()=>{

alert("Booking berhasil!");

form.reset();

})

.catch((error)=>{

alert(error);

});

});

}
