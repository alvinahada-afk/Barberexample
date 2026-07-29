// =================================
// ADMIN.JS FINAL ALVIN BARBER
// BAGIAN 1/3
// =================================


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

let tanggalDipilih = "";




// ================================
// CEK LOGIN
// ================================

onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="login.html";

}


});




// ================================
// LOAD BOOKING
// ================================


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

buatKalender();



},(error)=>{


console.log(
"Firebase Error:",
error
);


});


}



loadBooking();





// ================================
// DASHBOARD
// ================================


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



let harga = 0;



if(data.harga){


harga = Number(
String(data.harga)
.replace(/[^\d]/g,"")
);



}

else if(data.layanan){



let angka =
data.layanan.match(/[\d.]+/);



if(angka){


harga =
Number(
angka[0].replace(/\./g,"")
);


}



}



pendapatan += harga;



}




if(data.status=="Ditolak"){

ditolak++;

}



});





document.getElementById("totalBooking").innerHTML =
total;


document.getElementById("pendingBooking").innerHTML =
pending;


document.getElementById("acceptedBooking").innerHTML =
diterima;


document.getElementById("rejectedBooking").innerHTML =
ditolak;


document.getElementById("totalPendapatan").innerHTML =
"Rp " + pendapatan.toLocaleString("id-ID");



}

// =================================
// TAMPILKAN BOOKING
// =================================


function tampilkanBooking(){


const area =
document.getElementById("bookingList");


if(!area) return;



area.innerHTML="";



let dataTampil = semuaBooking;



// FILTER STATUS

if(filterAktif !== "Semua"){


dataTampil =
dataTampil.filter((data)=>{

return data.status == filterAktif;

});


}



// FILTER TANGGAL

if(tanggalDipilih){


dataTampil =
dataTampil.filter((data)=>{


return data.tanggal == tanggalDipilih;


});


}





if(dataTampil.length == 0){


area.innerHTML =
"<p>Tidak ada booking</p>";


return;


}




dataTampil.forEach((data)=>{


area.innerHTML += `


<div class="card">


<h3>
${data.nama || "-"}
</h3>



<p>
📱 ${data.nomor || "-"}
</p>



<p>
💈 ${data.layanan || "-"}
</p>



<p>
👤 Capster:
${data.capster || "-"}
</p>



<p>
📅 ${data.tanggal || "-"}
</p>



<p>
⏰ ${data.jam || "-"}
</p>



<p>
Status:

<span class="${data.status}">

${data.status || "-"}

</span>

</p>





<button 
class="btn-terima"
onclick="ubahStatus('${data.id}','Diterima')">

Terima

</button>





<button
class="btn-tolak"
onclick="ubahStatus('${data.id}','Ditolak')">

Tolak

</button>





<button
class="btn-hapus"
onclick="hapusBooking('${data.id}')">

Hapus

</button>





<a 
class="wa-button"
target="_blank"
href="https://wa.me/${data.nomor}">

WhatsApp

</a>



</div>



`;



});



}




// =================================
// FILTER
// =================================


window.filterBooking=function(status){


filterAktif=status;


tampilkanBooking();


}




// =================================
// UPDATE STATUS + WHATSAPP
// =================================


window.ubahStatus = async function(id,status){



let data =
semuaBooking.find(
(item)=>item.id==id
);



if(!data) return;




await updateDoc(

doc(db,"booking",id),

{

status:status

}

);





let nomor =
String(data.nomor)
.replace(/^0/,"62");





let pesan =

`Halo ${data.nama},

Booking Anda di Alvin Barber Studio telah ${status}.

Layanan:
${data.layanan}

Tanggal:
${data.tanggal}

Jam:
${data.jam}

Terima kasih.`;





window.open(

"https://wa.me/"+nomor+
"?text="+encodeURIComponent(pesan),

"_blank"

);



}






// =================================
// HAPUS
// =================================


window.hapusBooking = async function(id){


let yakin =
confirm("Hapus booking ini?");



if(!yakin) return;



await deleteDoc(

doc(db,"booking",id)

);



}

// =================================
// SEARCH
// =================================


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


<div class="card">


<h3>
${data.nama || "-"}
</h3>


<p>
📱 ${data.nomor || "-"}
</p>


<p>
💈 ${data.layanan || "-"}
</p>


<p>
Status:
${data.status || "-"}
</p>



<button
class="btn-terima"
onclick="ubahStatus('${data.id}','Diterima')">

Terima

</button>



<button
class="btn-tolak"
onclick="ubahStatus('${data.id}','Ditolak')">

Tolak

</button>



<button
class="btn-hapus"
onclick="hapusBooking('${data.id}')">

Hapus

</button>



</div>


`;



});



}





// =================================
// KALENDER
// =================================


window.buatKalender=function(){


let kalender =
document.getElementById("kalender");



let bulan =
document.getElementById("bulanKalender");



if(!kalender || !bulan) return;



kalender.innerHTML="";



let tanggal =
new Date();



if(bulan.value){

tanggal =
new Date(
bulan.value+"-01"
);

}




let tahun =
tanggal.getFullYear();



let bulanIndex =
tanggal.getMonth();



let jumlahHari =
new Date(
tahun,
bulanIndex+1,
0
).getDate();





for(let i=1;i<=jumlahHari;i++){



let div =
document.createElement("div");



div.className =
"tanggal-kalender";



div.innerHTML =
i;



div.onclick=function(){



let bulanFix =
String(bulanIndex+1)
.padStart(2,"0");



let hariFix =
String(i)
.padStart(2,"0");



tanggalDipilih =
`${tahun}-${bulanFix}-${hariFix}`;



tampilkanBooking();



}



kalender.appendChild(div);



}



}




// =================================
// NOTIFIKASI
// =================================


function loadNotif(){


const ref =
collection(db,"booking");



onSnapshot(ref,(snapshot)=>{



let count =
document.getElementById("notifCount");



if(count){

count.innerHTML =
snapshot.size;

}




let list =
document.getElementById("notifList");



if(list){


list.innerHTML="";



snapshot.forEach((item)=>{


let data =
item.data();



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






// =================================
// BUKA NOTIF
// =================================


window.bukaNotif=function(){



let box =
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






// =================================
// LOGOUT
// =================================


window.logout = async function(){



await signOut(auth);



window.location.href =
"login.html";



}





console.log(
"ADMIN FINAL AKTIF"
);

window.toggleKalender=function(){

let area =
document.getElementById("areaKalender");


if(area.style.display=="none"){

area.style.display="block";

}else{

area.style.display="none";

}

}

// ===============================
// TOGGLE KALENDER
// ===============================

window.toggleKalender = function(){

const area = document.getElementById("areaKalender");

if(!area){
    console.log("areaKalender tidak ditemukan");
    return;
}


if(area.style.display === "none" || area.style.display === ""){

    area.style.display = "block";

}else{

    area.style.display = "none";

}

}
