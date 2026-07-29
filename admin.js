// ===============================
// ADMIN.JS FINAL - BAGIAN 1
// ===============================

import { db, auth } from "./firebase.js";

import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



let semuaBooking = [];
let filterAktif = "Semua";



// ===============================
// CEK LOGIN ADMIN
// ===============================

onAuthStateChanged(auth,(user)=>{

  if(!user){

    window.location.href = "login.html";

  }

});




// ===============================
// AMBIL DATA BOOKING
// ===============================

function loadBooking(){


const ref = collection(db,"booking");


onSnapshot(ref,(snapshot)=>{


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


console.log(
"Firestore Error:",
error
);


});


}



loadBooking();




// ===============================
// DASHBOARD
// ===============================


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

}


// ambil harga

if(data.status === "Diterima"){


if(data.harga){

pendapatan += Number(data.harga);


}else if(data.layanan){


let harga =
data.layanan.match(/\d+/);


if(harga){

pendapatan += Number(harga[0]);

}


}


}



if(data.status === "Ditolak"){

ditolak++;

}



});




const totalEl =
document.getElementById("totalBooking");


const pendingEl =
document.getElementById("pendingBooking");


const acceptedEl =
document.getElementById("acceptedBooking");


const rejectedEl =
document.getElementById("rejectedBooking");


const pendapatanEl =
document.getElementById("totalPendapatan");



if(totalEl)
totalEl.innerHTML = total;


if(pendingEl)
pendingEl.innerHTML = pending;


if(acceptedEl)
acceptedEl.innerHTML = diterima;


if(rejectedEl)
rejectedEl.innerHTML = ditolak;


if(pendapatanEl)
pendapatanEl.innerHTML =
"Rp " + pendapatan.toLocaleString("id-ID");



}

// ===============================
// TAMPILKAN BOOKING
// ===============================

function tampilkanBooking(){

const area =
document.getElementById("bookingList");


if(!area) return;


area.innerHTML = "";


let dataTampil = semuaBooking;



if(filterAktif !== "Semua"){


dataTampil =
semuaBooking.filter((data)=>{

return data.status === filterAktif;

});


}



if(dataTampil.length === 0){

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


<a href="https://wa.me/${data.nomor}" target="_blank">
WhatsApp
</a>



</div>

`;

});


}





// ===============================
// FILTER
// ===============================

window.filterBooking = function(status){

filterAktif = status;

tampilkanBooking();

}




// ===============================
// UPDATE STATUS
// ===============================

window.ubahStatus = async function(id,status){


try{


await updateDoc(

doc(db,"booking",id),

{
status: status
}

);



}catch(error){

console.log(error);

}


}





// ===============================
// HAPUS BOOKING
// ===============================

window.hapusBooking = async function(id){


if(!confirm("Hapus booking ini?")) return;



await deleteDoc(

doc(db,"booking",id)

);


}





// ===============================
// SEARCH
// ===============================

window.searchBooking=function(){


const input =
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


area.innerHTML = "";



hasil.forEach((data)=>{


area.innerHTML += `

<div class="booking-card">

<h3>${data.nama || "-"}</h3>

<p>📱 ${data.nomor || "-"}</p>

<p>💈 ${data.layanan || "-"}</p>

<p>Status: ${data.status || "-"}</p>


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





// ===============================
// NOTIFIKASI
// ===============================

function loadNotif(){


const ref =
collection(db,"booking");


onSnapshot(ref,(snapshot)=>{


const count =
document.getElementById("notifCount");


if(count){

count.innerHTML =
snapshot.size;

}



const list =
document.getElementById("notifList");


if(list){


list.innerHTML="";


snapshot.forEach((item)=>{


let data=item.data();


list.innerHTML += `

<p>
🔔 ${data.nama || "-"} (${data.status || "-"})
</p>

`;

});


}


});


}


loadNotif();





// ===============================
// BUKA NOTIF
// ===============================

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





// ===============================
// LOGOUT
// ===============================

window.logout = async function(){


try{


await signOut(auth);


window.location.href =
"login.html";


}catch(error){


console.log(error);


}


}





console.log("ADMIN FINAL AKTIF");
