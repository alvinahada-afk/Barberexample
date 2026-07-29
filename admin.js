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


// ======================
// LOAD DATA FIREBASE
// ======================

function loadBooking(){

const bookingRef = collection(db,"booking");


onSnapshot(bookingRef,(snapshot)=>{


semuaBooking = [];


snapshot.forEach((item)=>{

let data = item.data();

data.id = item.id;

semuaBooking.push(data);

});


updateDashboard();

tampilkanBooking();


},
(error)=>{

console.log("Firebase error:",error);

});


}



// ======================
// DASHBOARD
// ======================


function updateDashboard(){


let total = semuaBooking.length;

let pending = 0;
let diterima = 0;
let ditolak = 0;

let pendapatan = 0;



semuaBooking.forEach((data)=>{


if(data.status=="Pending"){

pending++;

}



if(data.status=="Diterima"){

diterima++;



// ambil harga

if(data.harga){

pendapatan += Number(data.harga);

}

else if(data.layanan){

let angka = data.layanan.match(/\d+/);

if(angka){

pendapatan += Number(angka[0]);

}

}


}



if(data.status=="Ditolak"){

ditolak++;

}


});




const totalEl =
document.getElementById("totalBooking");


const pendingEl =
document.getElementById("pendingBooking");


const diterimaEl =
document.getElementById("acceptedBooking");


const ditolakEl =
document.getElementById("rejectedBooking");


const pendapatanEl =
document.getElementById("totalPendapatan");



if(totalEl)
totalEl.innerHTML = total;


if(pendingEl)
pendingEl.innerHTML = pending;


if(diterimaEl)
diterimaEl.innerHTML = diterima;


if(ditolakEl)
ditolakEl.innerHTML = ditolak;


if(pendapatanEl)
pendapatanEl.innerHTML =
"Rp "+pendapatan.toLocaleString("id-ID");


}





loadBooking();
// ======================
// TAMPILKAN BOOKING
// ======================

function tampilkanBooking(){

const area = document.getElementById("bookingList");

if(!area) return;


area.innerHTML="";


let dataTampil = semuaBooking;


if(filterAktif!="Semua"){

dataTampil =
semuaBooking.filter((data)=>{

return data.status == filterAktif;

});

}



if(dataTampil.length==0){

area.innerHTML =
"<p>Belum ada booking</p>";

return;

}



dataTampil.forEach((data)=>{


area.innerHTML += `

<div class="booking-card">

<h3>${data.nama || "-"}</h3>

<p>📱 ${data.nomor || "-"}</p>

<p>💈 ${data.layanan || "-"}</p>

<p>👤 Capster: ${data.capster || "-"}</p>

<p>📅 ${data.tanggal || "-"} ${data.jam || ""}</p>

<p>Status:
<b>${data.status || "-"}</b>
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


<a target="_blank" href="https://wa.me/${data.nomor}">
WhatsApp
</a>


</div>

`;

});


}





// ======================
// FILTER
// ======================

window.filterBooking=function(status){

filterAktif=status;

tampilkanBooking();

}





// ======================
// UPDATE STATUS
// ======================

window.ubahStatus=async function(id,status){


await updateDoc(

doc(db,"booking",id),

{
status:status
}

);


}





// ======================
// HAPUS
// ======================

window.hapusBooking=async function(id){


let yakin =
confirm("Hapus booking ini?");


if(!yakin) return;


await deleteDoc(
doc(db,"booking",id)
);


}





// ======================
// SEARCH
// ======================

window.searchBooking=function(){


let input =
document.getElementById("searchBooking");


if(!input) return;


let keyword =
input.value.toLowerCase();



let hasil =
semuaBooking.filter((data)=>{


return (

(data.nama || "")
.toLowerCase()
.includes(keyword)

||

(data.nomor || "")
.includes(keyword)

);


});



const area =
document.getElementById("bookingList");


area.innerHTML="";


hasil.forEach((data)=>{


area.innerHTML += `

<div class="booking-card">

<h3>${data.nama}</h3>

<p>${data.nomor}</p>

<p>${data.layanan}</p>

<p>Status: ${data.status}</p>


</div>

`;


});


}





// ======================
// NOTIFIKASI
// ======================

function loadNotif(){


const ref =
collection(db,"booking");


onSnapshot(ref,(snapshot)=>{


let jumlah = snapshot.size;


const count =
document.getElementById("notifCount");


if(count){

count.innerHTML=jumlah;

}



const list =
document.getElementById("notifList");


if(list){


list.innerHTML="";


snapshot.forEach((item)=>{


let data=item.data();


list.innerHTML += `

<p>
🔔 ${data.nama || "-"} 
(${data.status || "-"})
</p>

`;


});


}


});


}


loadNotif();





// ======================
// BUKA NOTIF
// ======================

window.bukaNotif=function(){


const box =
document.getElementById("notifBox");


if(box){


box.style.display =
box.style.display=="block"
?
"none"
:
"block";


}


}





// ======================
// LOGOUT
// ======================

window.logout=function(){


localStorage.removeItem("admin");


location.href="index.html";


}




console.log("ADMIN BERHASIL AKTIF");
