// ===============================
// ADMIN.JS FINAL
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
// CEK LOGIN
// ===============================

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

}

});



// ===============================
// LOAD BOOKING
// ===============================

function loadBooking(){


const ref = collection(db,"booking");


onSnapshot(ref,(snapshot)=>{


semuaBooking=[];


snapshot.forEach((item)=>{


let data=item.data();

data.id=item.id;

semuaBooking.push(data);


});



updateDashboard();

tampilkanBooking();


},(error)=>{

console.log("Firestore Error:",error);

});


}



loadBooking();




// ===============================
// DASHBOARD
// ===============================

function updateDashboard(){


let total=semuaBooking.length;

let pending=0;

let diterima=0;

let ditolak=0;

let pendapatan=0;



semuaBooking.forEach((data)=>{


if(data.status==="Pending"){

pending++;

}


if(data.status==="Diterima"){

diterima++;


if(data.harga){

let angka=String(data.harga)
.replace(/[^\d]/g,"");


pendapatan+=Number(angka);


}

else if(data.layanan){


let angka=data.layanan.match(/[\d.]+/);


if(angka){

pendapatan+=Number(
angka[0].replace(/\./g,"")
);

}


}


}



if(data.status==="Ditolak"){

ditolak++;

}


});



document.getElementById("totalBooking").innerHTML=total;

document.getElementById("pendingBooking").innerHTML=pending;

document.getElementById("acceptedBooking").innerHTML=diterima;

document.getElementById("rejectedBooking").innerHTML=ditolak;

document.getElementById("totalPendapatan").innerHTML=
"Rp "+pendapatan.toLocaleString("id-ID");


}




// ===============================
// TAMPIL BOOKING
// ===============================

function tampilkanBooking(){


const area=document.getElementById("bookingList");


if(!area)return;


area.innerHTML="";



let dataTampil=semuaBooking;



if(filterAktif!=="Semua"){


dataTampil=semuaBooking.filter((data)=>{

return data.status===filterAktif;

});


}



if(dataTampil.length===0){


area.innerHTML=
"<p>Tidak ada booking</p>";


return;

}



dataTampil.forEach((data)=>{


let tombol="";


if(data.status==="Pending"){


tombol=`

<button onclick="ubahStatus('${data.id}','Diterima')">
Terima
</button>


<button onclick="ubahStatus('${data.id}','Ditolak')">
Tolak
</button>

`;

}



area.innerHTML+=`

<div class="card">


<h3>${data.nama || "-"}</h3>


<p>📱 ${data.nomor || "-"}</p>


<p>💈 ${data.layanan || "-"}</p>


<p>👤 Capster: ${data.capster || "-"}</p>


<p>📅 ${data.tanggal || "-"}</p>


<p>⏰ ${data.jam || "-"}</p>


<p>
Status:
<span class="${data.status}">
${data.status}
</span>
</p>


${tombol}


<button onclick="hapusBooking('${data.id}')">
Hapus
</button>


<a class="wa-button"
href="https://wa.me/${data.nomor}"
target="_blank">

WhatsApp

</a>


</div>

`;


});


}




// ===============================
// FILTER
// ===============================

window.filterBooking=function(status){

filterAktif=status;

tampilkanBooking();

}




// ===============================
// UBAH STATUS
// ===============================

window.ubahStatus=async function(id,status){


try{


await updateDoc(

doc(db,"booking",id),

{
status:status
}

);



}catch(error){

console.log(error);

}


}




// ===============================
// HAPUS
// ===============================

window.hapusBooking=async function(id){


if(!confirm("Hapus booking ini?"))
return;



await deleteDoc(

doc(db,"booking",id)

);


}





// ===============================
// SEARCH
// ===============================

window.searchBooking=function(){


let input=document.getElementById("searchBooking");


let keyword=input.value.toLowerCase();



let hasil=semuaBooking.filter((data)=>{


return (

(data.nama||"")
.toLowerCase()
.includes(keyword)

||

(data.nomor||"")
.includes(keyword)

);


});



const area=document.getElementById("bookingList");


area.innerHTML="";


hasil.forEach((data)=>{


area.innerHTML+=`

<div class="card">


<h3>${data.nama}</h3>

<p>📱 ${data.nomor}</p>

<p>${data.layanan}</p>

<p>Status: ${data.status}</p>


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


const ref=collection(db,"booking");


onSnapshot(ref,(snapshot)=>{


let count=document.getElementById("notifCount");


if(count){

count.innerHTML=snapshot.size;

}


let list=document.getElementById("notifList");


if(list){


list.innerHTML="";


snapshot.forEach((item)=>{


let data=item.data();


list.innerHTML+=`

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





// ===============================
// BUKA NOTIF
// ===============================

window.bukaNotif=function(){


let box=document.getElementById("notifBox");


if(box){


box.style.display =
box.style.display==="block"
?
"none"
:
"block";


}


}





// ===============================
// LOGOUT
// ===============================

window.logout=async function(){


await signOut(auth);


window.location.href="login.html";


}





console.log("ADMIN FINAL AKTIF");
