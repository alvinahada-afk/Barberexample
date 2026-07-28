let semuaBooking = [];

const list = document.getElementById("bookingList");
const notifSound = new Audio("notif.mp3");

let jumlahBookingLama = 0;
let bookingBaru = 0;

// CEK LOGIN
firebase.auth().onAuthStateChanged((user)=>{

    if(!user){
        window.location.href="login.html";
    }

});



// LOAD DATA BOOKING

function loadBooking(){


db.collection("booking")
.onSnapshot((snapshot)=>{if(snapshot.size > jumlahBookingLama){

    notifSound.play();

    bookingBaru = snapshot.size - jumlahBookingLama;

    document.getElementById("notifCount").innerHTML = bookingBaru;

    document.getElementById("notifBox").style.display="block";

}

}

jumlahBookingLama = snapshot.size;

let total = 0;
let pending = 0;
let diterima = 0;
let ditolak = 0;
let pendapatan = 0;

list.innerHTML = "";

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

if(data.status=="Diterima"){

    diterima++;

    let harga = 0;

    if(data.layanan.includes("35.000")){
        harga = 35000;
    }

    if(data.layanan.includes("50.000")){
        harga = 50000;
    }

    if(data.layanan.includes("70.000")){
        harga = 70000;
    }


    pendapatan += harga;

}
    
if(data.status=="Ditolak"){
ditolak++;
}



tampilkanBooking(data,doc.id);



});



document.getElementById("totalBooking").innerHTML = total;

document.getElementById("pendingBooking").innerHTML = pending;

document.getElementById("acceptedBooking").innerHTML = diterima;

document.getElementById("rejectedBooking").innerHTML = ditolak;

document.getElementById("totalPendapatan").innerHTML =
"Rp" + pendapatan.toLocaleString("id-ID");

})

.catch((error)=>{


console.log("FIREBASE ERROR:",error);


list.innerHTML="Gagal mengambil data";


});


}



loadBooking();





// TAMPILKAN BOOKING

function tampilkanBooking(data,id){



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



<button onclick="updateStatus('${id}','Diterima')">

Terima Booking

</button>



<button onclick="updateStatus('${id}','Ditolak')">

Tolak Booking

</button>



<button onclick="hapusBooking('${id}')">

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



setTimeout(()=>{

location.reload();

},1000);



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


location.reload();


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







// FILTER BOOKING


function filterBooking(status){


let hasil="";



semuaBooking.forEach((data)=>{



if(status=="Semua" || data.status==status){



hasil += `


<div class="card">


<h3>👤 ${data.nama || "-"}</h3>


<p>📱 WhatsApp: ${data.nomor || "-"}</p>


<p>📅 Tanggal: ${data.tanggal || "-"}</p>


<p>⏰ Jam: ${data.jam || "-"}</p>


<p>💈 Capster: ${data.capster || "-"}</p>


<p>✂️ Layanan: ${data.layanan || "-"}</p>



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


let nama =
(data.nama || "").toLowerCase();


let nomor =
(data.nomor || "").toLowerCase();



if(
nama.includes(keyword) ||
nomor.includes(keyword)
){



hasil += `


<div class="card">


<h3>👤 ${data.nama || "-"}</h3>


<p>📱 WhatsApp: ${data.nomor || "-"}</p>


<p>📅 Tanggal: ${data.tanggal || "-"}</p>


<p>⏰ Jam: ${data.jam || "-"}</p>


<p>💈 Capster: ${data.capster || "-"}</p>


<p>✂️ Layanan: ${data.layanan || "-"}</p>


<p>Status:
${data.status}
</p>


</div>


`;



}



});



list.innerHTML = hasil;



}
