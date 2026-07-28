let semuaBooking = [];

const list = document.getElementById("bookingList");


// CEK LOGIN
firebase.auth().onAuthStateChanged((user)=>{

if(!user){
window.location.href="login.html";
}

});



// AMBIL DATA BOOKING

db.collection("booking")
.get()
.then((snapshot)=>{


let total = 0;
let pending = 0;
let diterima = 0;
let ditolak = 0;


list.innerHTML="";

semuaBooking = [];



snapshot.forEach((doc)=>{


let data = doc.data();


semuaBooking.push({

id:doc.id,
...data

});


total++;


if(data.status=="Pending"){
pending++;
}


if(data.status=="Diterima"){
diterima++;
}


if(data.status=="Ditolak"){
ditolak++;
}




tampilkanBooking(data);



});



document.getElementById("totalBooking").innerHTML=total;

document.getElementById("pendingBooking").innerHTML=pending;

document.getElementById("acceptedBooking").innerHTML=diterima;

document.getElementById("rejectedBooking").innerHTML=ditolak;



})
.catch((error)=>{

console.log(error.message);

});





// TAMPILKAN CARD

function tampilkanBooking(data){


list.innerHTML += `


<div class="card">


<h3>👤 ${data.nama || "-"}</h3>


<p>📱 WhatsApp: ${data.nomor || "-"}</p>

<p>📅 Tanggal: ${data.tanggal || "-"}</p>

<p>⏰ Jam: ${data.jam || "-"}</p>

<p>💈 Capster: ${data.capster || "-"}</p>

<p>✂️ Layanan: ${data.layanan || "-"}</p>

<p>📝 Catatan: ${data.catatan || "-"}</p>


<p>
Status:
<span class="${data.status}">
${data.status}
</span>

</p>



<button onclick="updateStatus('${data.id}','Diterima')">

Terima Booking

</button>



<button onclick="updateStatus('${data.id}','Ditolak')">

Tolak Booking

</button>



<button onclick="hapusBooking('${data.id}')">

Hapus

</button>


<br><br>



<a class="wa-button"

href="https://wa.me/${data.nomor}"

target="_blank">

💬 Chat WhatsApp

</
