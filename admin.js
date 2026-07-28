let semuaBooking = [];

const list = document.getElementById("bookingList");

const notifSound = new Audio("notif.mp3");

let jumlahBookingLama = 0;


// CEK LOGIN

firebase.auth().onAuthStateChanged((user)=>{

if(!user){

window.location.href="login.html";

}

});




// LOAD BOOKING

function loadBooking(){


db.collection("booking")

.onSnapshot((snapshot)=>{


console.log("JUMLAH DATA:", snapshot.size);



let total = 0;

let pending = 0;

let diterima = 0;

let ditolak = 0;

let pendapatan = 0;



list.innerHTML = "";

semuaBooking = [];




snapshot.forEach((doc)=>{


let data = doc.data();



data.id = doc.id;



semuaBooking.push(data);



total++;



if(data.status=="Pending"){

pending++;

}



if(data.status=="Diterima"){

diterima++;


if(data.harga){

pendapatan += Number(data.harga);

}


}



if(data.status=="Ditolak"){

ditolak++;

}



tampilkanBooking(data);



});




// STATISTIK

document.getElementById("totalBooking").innerHTML = total;


document.getElementById("pendingBooking").innerHTML = pending;


document.getElementById("acceptedBooking").innerHTML = diterima;


document.getElementById("rejectedBooking").innerHTML = ditolak;



document.getElementById("totalPendapatan").innerHTML =

"Rp"+pendapatan.toLocaleString("id-ID");




},

(error)=>{

console.log("FIREBASE ERROR:",error);

}



);



}



loadBooking();

console.log("ADMIN JS JALAN");






// TAMPILKAN BOOKING


function tampilkanBooking(data){



list.innerHTML += `


<div class="card">


<h3>👤 ${data.nama || "-"}</h3>


<p>📱 WhatsApp : ${data.nomor || "-"}</p>


<p>📅 Tanggal : ${data.tanggal || "-"}</p>


<p>⏰ Jam : ${data.jam || "-"}</p>


<p>💈 Capster : ${data.capster || "-"}</p>


<p>✂️ Layanan : ${data.layanan || "-"}</p>


<p>📝 Catatan : ${data.catatan || "-"}</p>



<p>

Status :

<span class="${data.status}">

${data.status || "Pending"}

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

</a>



</div>


`;



}








// UPDATE STATUS


function updateStatus(id,status){


db.collection("booking")

.doc(id)

.update({

status:status

})

.then(()=>{


alert("Status berhasil diubah");



})

.catch((error)=>{


console.log(error);


});


}







// HAPUS BOOKING


function hapusBooking(id){


if(confirm("Hapus booking ini?")){


db.collection("booking")

.doc(id)

.delete()

.then(()=>{


alert("Booking berhasil dihapus");


});


}


}







// LOGOUT


function logout(){


firebase.auth()

.signOut()

.then(()=>{


window.location.href="login.html";


});


}








// FILTER


function filterBooking(status){



let hasil = "";




semuaBooking.forEach((data)=>{


if(status=="Semua" || data.status==status){



hasil += `


<div class="card">


<h3>👤 ${data.nama || "-"}</h3>


<p>📱 WhatsApp : ${data.nomor || "-"}</p>


<p>📅 ${data.tanggal || "-"}</p>


<p>⏰ ${data.jam || "-"}</p>


<p>✂️ ${data.layanan || "-"}</p>



<p>Status : ${data.status}</p>



<button onclick="updateStatus('${data.id}','Diterima')">

Terima

</button>



<button onclick="updateStatus('${data.id}','Ditolak')">

Tolak

</button>



<button onclick="hapusBooking('${data.id}')">

Hapus

</button>


</div>


`;



}


});



list.innerHTML = hasil;



}







// SEARCH


function searchBooking(){


let keyword = document

.getElementById("searchBooking")

.value

.toLowerCase();



let hasil="";



semuaBooking.forEach((data)=>{


let nama =

(data.nama || "")

.toLowerCase();



let nomor =

(data.nomor || "")

.toLowerCase();



if(

nama.includes(keyword) ||

nomor.includes(keyword)

){


hasil += `


<div class="card">


<h3>👤 ${data.nama}</h3>


<p>📱 ${data.nomor}</p>


<p>✂️ ${data.layanan}</p>


<p>Status : ${data.status}</p>


</div>


`;


}



});



list.innerHTML = hasil;



}
