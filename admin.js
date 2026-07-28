let semuaBooking = [];

const list = document.getElementById("bookingList");

const notifSound = new Audio("notif.mp3");

let jumlahBookingLama = 0;

let pertamaLoad = true;

let daftarNotif = [];


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



if(!pertamaLoad && snapshot.size > jumlahBookingLama){


let jumlahBaru = snapshot.size - jumlahBookingLama;


notifSound.play().catch(()=>{});


let notif = document.getElementById("notifCount");


if(notif){

notif.innerHTML = jumlahBaru;

notif.style.display="inline-block";

}



let box = document.getElementById("notifBox");


if(box){

box.style.display="block";

}


}



jumlahBookingLama = snapshot.size;

pertamaLoad = false;



let total = 0;

let pending = 0;

let diterima = 0;

let ditolak = 0;

let pendapatan = 0;



list.innerHTML = "";

semuaBooking = [];

daftarNotif = [];





snapshot.forEach((doc)=>{


let data = doc.data();


data.id = doc.id;


semuaBooking.push(data);



if(data.status=="Pending"){

pending++;

daftarNotif.push(data);

}



if(data.status=="Diterima"){

diterima++;


let angka = (data.layanan || "").match(/Rp([\d.]+)/);


if(angka){

pendapatan += Number(
angka[1].replace(/\./g,"")
);

}

}



if(data.status=="Ditolak"){

ditolak++;

}



total++;


tampilkanBooking(data);



});




document.getElementById("totalBooking").innerHTML = total;

document.getElementById("pendingBooking").innerHTML = pending;

document.getElementById("acceptedBooking").innerHTML = diterima;

document.getElementById("rejectedBooking").innerHTML = ditolak;


document.getElementById("totalPendapatan").innerHTML =
"Rp"+pendapatan.toLocaleString("id-ID");



},(error)=>{


console.log("FIREBASE ERROR:",error);


});


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


<p>Status :

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
// UPDATE STATUS + WHATSAPP


function updateStatus(id,status){


db.collection("booking")

.doc(id)

.get()

.then((doc)=>{


let data = doc.data();



db.collection("booking")

.doc(id)

.update({

status:status

})

.then(()=>{


let pesan="";



if(status=="Diterima"){


pesan =

"Halo "+data.nama+" 👋\n\n"+
"Booking Alvin Barber Studio kamu sudah DITERIMA ✅\n\n"+
"Tanggal : "+data.tanggal+"\n"+
"Jam : "+data.jam+"\n"+
"Layanan : "+data.layanan+"\n"+
"Capster : "+data.capster+"\n\n"+
"Kami tunggu kedatangannya 🙏";


}



if(status=="Ditolak"){


pesan =

"Halo "+data.nama+" 👋\n\n"+
"Maaf booking Alvin Barber Studio kamu DITOLAK ❌\n\n"+
"Silakan hubungi kami untuk jadwal lain.\n\n"+
"Terima kasih 🙏";


}



window.open(

"https://wa.me/"+data.nomor+
"?text="+encodeURIComponent(pesan),

"_blank"

);



});


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







// FILTER STATUS


function filterBooking(status){


let hasil="";



semuaBooking.forEach((data)=>{


if(status=="Semua" || data.status==status){


hasil += `


<div class="card">


<h3>👤 ${data.nama || "-"}</h3>


<p>📱 WhatsApp : ${data.nomor || "-"}</p>


<p>📅 ${data.tanggal || "-"}</p>


<p>⏰ ${data.jam || "-"}</p>


<p>💈 ${data.capster || "-"}</p>


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







// SEARCH BOOKING


function searchBooking(){


let keyword = document

.getElementById("searchBooking")

.value

.toLowerCase();



let hasil="";



semuaBooking.forEach((data)=>{


let nama = (data.nama || "").toLowerCase();

let nomor = (data.nomor || "").toLowerCase();



if(

nama.includes(keyword) ||

nomor.includes(keyword)

){


hasil += `


<div class="card">


<h3>👤 ${data.nama}</h3>


<p>📱 ${data.nomor}</p>


<p>📅 ${data.tanggal}</p>


<p>⏰ ${data.jam}</p>


<p>✂️ ${data.layanan}</p>


<p>Status : ${data.status}</p>


</div>


`;


}


});


list.innerHTML = hasil;


}







// FILTER JADWAL BERDASARKAN TANGGAL


function filterTanggalAdmin(){


let tanggal = 

document.getElementById("tanggalAdmin").value;



if(!tanggal){

loadBooking();

return;

}



let hasil="";



semuaBooking

.sort((a,b)=>{

return a.jam.localeCompare(b.jam);

})

.forEach((data)=>{


if(data.tanggal == tanggal){


hasil += `


<div class="card">


<h3>👤 ${data.nama}</h3>


<p>⏰ Jam : ${data.jam}</p>


<p>💈 Capster : ${data.capster}</p>


<p>✂️ Layanan : ${data.layanan}</p>


<p>Status : ${data.status}</p>



<button onclick="updateStatus('${data.id}','Diterima')">

Terima

</button>


<button onclick="updateStatus('${data.id}','Ditolak')">

Tolak

</button>


</div>


`;


}


});



list.innerHTML = hasil;


}








// NOTIFIKASI DROPDOWN


function bukaNotif(){


let box = document.getElementById("notifBox");



if(box.style.display=="block"){


box.style.display="none";


return;


}



let area = document.getElementById("notifList");



if(daftarNotif.length==0){


area.innerHTML="Tidak ada booking baru";


}else{


let html="";



daftarNotif.forEach((data)=>{


html += `


<div class="notif-item">


<b>${data.nama}</b>


<br>

📅 ${data.tanggal}


<br>

⏰ ${data.jam}


<br>

💈 ${data.capster}


<br>

✂️ ${data.layanan}


</div>


`;


});


area.innerHTML = html;


}



box.style.display="block";


}

function buatKalender(){

let bulan = document.getElementById("bulanKalender").value;


if(!bulan){

return;

}


let [tahun,bulanNomor] = bulan.split("-");


let tanggalAwal = new Date(
tahun,
bulanNomor-1,
1
);


let jumlahHari = new Date(
tahun,
bulanNomor,
0
).getDate();



let html="";


for(let i=1;i<=jumlahHari;i++){


let tanggal =
tahun+"-"+bulanNomor+"-"+String(i).padStart(2,"0");



let jumlah = semuaBooking.filter((data)=>{

return data.tanggal == tanggal;

}).length;



html += `

<button 
class="tanggal-kalender"
onclick="lihatJadwal('${tanggal}')">

${i}

${jumlah>0 ? 
"<span>🔴 "+jumlah+"</span>" 
: ""}

</button>


`;

}


document.getElementById("kalender").innerHTML=html;


}





function lihatJadwal(tanggal){


let hasil="";



let dataHari = semuaBooking.filter((data)=>{

return data.tanggal==tanggal;

});



dataHari.sort((a,b)=>{

return a.jam.localeCompare(b.jam);

});



if(dataHari.length==0){


hasil="Tidak ada booking";


}else{


dataHari.forEach((data)=>{


hasil += `


<div class="card">


<h3>👤 ${data.nama}</h3>


<p>⏰ ${data.jam}</p>


<p>💈 ${data.capster}</p>


<p>✂️ ${data.layanan}</p>


<p>Status : ${data.status}</p>


</div>


`;


});


}



document.getElementById("jadwalHari").innerHTML=hasil;


}

function buatKalender(){

let input = document.getElementById("bulanKalender");

let kalender = document.getElementById("kalender");


if(!input.value){

return;

}


let [tahun,bulan] = input.value.split("-");


let tanggalAwal = new Date(
tahun,
bulan-1,
1
);


let jumlahHari = new Date(
tahun,
bulan,
0
).getDate();



let html="";


for(let i=1;i<=jumlahHari;i++){


html += `

<div 
class="tanggal-kalender"
onclick="pilihTanggal('${tahun}-${bulan}-${i}')">

${i}

</div>

`;


}



kalender.innerHTML=html;


}




function pilihTanggal(tanggal){


let area=document.getElementById("jadwalHari");


let hasil="";


semuaBooking.forEach((data)=>{


if(data.tanggal==tanggal){


hasil += `

<div class="card">

<h3>
👤 ${data.nama}
</h3>

<p>⏰ ${data.jam}</p>

<p>✂️ ${data.layanan}</p>

<p>Status : ${data.status}</p>

</div>


`;

}


});



if(hasil==""){

hasil="Tidak ada booking pada tanggal ini";

}


area.innerHTML=hasil;


}
