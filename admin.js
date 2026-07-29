import { db } from "./firebase.js";

import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


let semuaBooking = [];
let filterAktif = "Semua";


// LOAD BOOKING REALTIME

function loadBooking(){

  const bookingRef = collection(db, "booking");


  onSnapshot(bookingRef, (snapshot)=>{


    semuaBooking = [];


    snapshot.forEach((item)=>{

      semuaBooking.push({
        id:item.id,
        ...item.data()
      });

    });


    updateDashboard();

    tampilkanBooking();

  });


}



loadBooking();


// UPDATE STATISTIK DASHBOARD

function updateDashboard(){


let total = semuaBooking.length;

let pending = 0;

let diterima = 0;

let ditolak = 0;

let pendapatan = 0;



semuaBooking.forEach((data)=>{


if(data.status === "Pending"){
pending++;
}


if(data.status === "Diterima"){

diterima++;

let harga = data.harga || 0;

pendapatan += Number(harga);

}


if(data.status === "Ditolak"){
ditolak++;
}


});



document.getElementById("totalBooking").innerHTML = total;

document.getElementById("pendingBooking").innerHTML = pending;

document.getElementById("acceptedBooking").innerHTML = diterima;

document.getElementById("rejectedBooking").innerHTML = ditolak;

document.getElementById("totalPendapatan").innerHTML =
"Rp " + pendapatan.toLocaleString("id-ID");


}
// TAMPILKAN BOOKING

function tampilkanBooking(){

const area = document.getElementById("bookingList");

area.innerHTML = "";


let dataTampil = semuaBooking;


if(filterAktif !== "Semua"){

dataTampil = semuaBooking.filter((data)=>{

return data.status === filterAktif;

});

}



dataTampil.forEach((data)=>{


area.innerHTML += `

<div class="booking-card">

<h3>${data.nama}</h3>

<p>📱 ${data.nomor}</p>

<p>💈 ${data.layanan}</p>

<p>👤 Capster: ${data.capster}</p>

<p>📅 ${data.tanggal} - ${data.jam}</p>

<p>Status:
<b>${data.status}</b>
</p>


<button onclick="ubahStatus('${data.id}','Diterima')">
Terima
</button>


<button onclick="ubahStatus('${data.id}','Ditolak')">
Tolak
</button>


<button onclick="hapusBooking('${data.id}')">
Hapus
</button>


<a href="https://wa.me/${data.nomor}" target="_blank">
WhatsApp
</a>


</div>

`;

});


}



// FILTER

window.filterBooking = function(status){

filterAktif = status;

tampilkanBooking();

}



// UPDATE STATUS

window.ubahStatus = async function(id,status){


await updateDoc(
doc(db,"booking",id),
{
status:status
}
);


}



// HAPUS BOOKING

window.hapusBooking = async function(id){


if(confirm("Hapus booking ini?")){


await deleteDoc(
doc(db,"booking",id)
);


}


}

// SEARCH BOOKING

window.searchBooking = function(){

let keyword = document
.getElementById("searchBooking")
.value
.toLowerCase();


let area = document.getElementById("bookingList");

area.innerHTML = "";


semuaBooking
.filter((data)=>{


return (

data.nama.toLowerCase().includes(keyword)

||

data.nomor.includes(keyword)

);


})
.forEach((data)=>{


area.innerHTML += `

<div class="booking-card">

<h3>${data.nama}</h3>

<p>📱 ${data.nomor}</p>

<p>💈 ${data.layanan}</p>

<p>👤 Capster: ${data.capster}</p>

<p>📅 ${data.tanggal} - ${data.jam}</p>

<p>Status:
<b>${data.status}</b>
</p>


<button onclick="ubahStatus('${data.id}','Diterima')">
Terima
</button>


<button onclick="ubahStatus('${data.id}','Ditolak')">
Tolak
</button>


<button onclick="hapusBooking('${data.id}')">
Hapus
</button>


</div>

`;

});


}



// LOGOUT

window.logout = function(){

localStorage.removeItem("admin");

window.location.href="index.html";

}
// NOTIFIKASI BOOKING BARU

function loadNotif(){

const bookingRef = collection(db,"booking");


onSnapshot(bookingRef,(snapshot)=>{


let count = snapshot.size;


const notifCount =
document.getElementById("notifCount");


if(notifCount){

notifCount.innerHTML = count;

}


const list =
document.getElementById("notifList");


if(list){


list.innerHTML="";


snapshot.forEach((item)=>{


let data=item.data();


list.innerHTML += `

<p>
🔔 ${data.nama}
- ${data.status}
</p>

`;


});


}



});


}


loadNotif();



// BUKA TUTUP NOTIFIKASI

window.bukaNotif=function(){

const box =
document.getElementById("notifBox");


if(box){

box.style.display =
box.style.display === "block"
?
"none"
:
"block";

}

}



// KALENDER SEDERHANA

window.buatKalender=function(){

const area =
document.getElementById("kalender");


if(!area) return;


let bulan =
document.getElementById("bulanKalender").value;


area.innerHTML =
"<p>Pilih tanggal untuk melihat booking</p>";



}




console.log("ADMIN JS AKTIF");
