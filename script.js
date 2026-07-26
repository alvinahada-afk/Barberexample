function booking(){

let pesan =
"Halo Alvin Barber Studio, saya ingin melakukan booking haircut.";

let nomor =
"628123456789";

window.open(
"https://wa.me/"+nomor+"?text="+pesan
);

}
const form = document.getElementById("bookingForm");

form.addEventListener("submit", (e) => {

e.preventDefault();

db.collection("booking").add({

nama: document.getElementById("nama").value,

nomor: document.getElementById("nomor").value,

tanggal: document.getElementById("tanggal").value,

jam: document.getElementById("jam").value,

status: "Menunggu"

})
.then(() => {

alert("Booking berhasil!");

form.reset();

})
.catch((error)=>{

alert(error);

});

});
