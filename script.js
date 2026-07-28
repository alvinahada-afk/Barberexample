function booking(){

let pesan = 
"Halo Alvin Barber Studio, saya ingin melakukan booking haircut.";

let nomor = "6283892513500";

window.open(
"https://wa.me/"+nomor+"?text="+encodeURIComponent(pesan)
);

}



const form = document.getElementById("bookingForm");


if(form){


form.addEventListener("submit",(e)=>{


e.preventDefault();



let nama = document.getElementById("nama").value;

let nomor = document.getElementById("nomor").value;

let layanan = document.getElementById("layanan").value;

let catatan = document.getElementById("catatan").value;

let tanggal = document.getElementById("tanggal").value;

let jam = document.getElementById("jam").value;

let capster = document.getElementById("capster").value;





// CEK JADWAL TERSEDIA

db.collection("booking")

.where("tanggal","==",tanggal)

.where("jam","==",jam)

.where("capster","==",capster)

.get()

.then((snapshot)=>{



if(!snapshot.empty){


alert(
"❌ Jam tersebut sudah dibooking.\nSilakan pilih jam lain."
);


return;


}





// SIMPAN BOOKING BARU


db.collection("booking").add({


nama:nama,

nomor:nomor,

layanan:layanan,

catatan:catatan,

tanggal:tanggal,

jam:jam,

capster:capster,

status:"Pending"



})

.then(()=>{


alert("✅ Booking berhasil dikirim!");

form.reset();



})


.catch((error)=>{


alert("❌ Error: "+error.message);


});





})

.catch((error)=>{


alert("❌ Gagal mengecek jadwal: "+error.message);


});



});


}
