let total = 0;
let pending = 0;
let accepted = 0;
let rejected = 0;


firebase.auth().onAuthStateChanged((user)=>{

if(!user){

window.location.href="login.html";

}

});


const list = document.getElementById("bookingList");


db.collection("booking")
.get()
.then((snapshot)=>{let total = 0;
let pending = 0;
let diterima = 0;
let ditolak = 0;


list.innerHTML="";


snapshot.forEach((doc)=>{

let data = doc.data();

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


/* Tampilkan booking */


list.innerHTML += `

<div class="card">


<h3>${data.nama || "-"}</h3>

<p>WhatsApp: ${data.nomor || "-"}</p>

<p>Tanggal: ${data.tanggal || "-"}</p>

<p>Jam: ${data.jam || "-"}</p>

<p>Capster: ${data.capster || "-"}</p>

<p>Layanan: ${data.layanan || "-"}</p>

<p>Catatan: ${data.catatan || "-"}</p>

<p>
Status:
<span class="${data.status}">
${data.status}
</span>
</p>



<button onclick="updateStatus('${doc.id}','Diterima')">

Terima Booking

</button>



<button onclick="updateStatus('${doc.id}','Ditolak')">

Tolak Booking

</button>



<button onclick="hapusBooking('${doc.id}')">

Hapus

</button>

<a 
href="https://wa.me/${data.nomor}?text=${encodeURIComponent(
`Halo ${data.nama}, 
Booking Alvin Barber Studio:

Tanggal: ${data.tanggal}
Jam: ${data.jam}
Capster: ${data.capster}
Layanan: ${data.layanan}

Terima kasih 🙏`
)}"
target="_blank"
class="wa-button">
Chat WhatsApp
</a>

<br><br>



</div>


`;


});



document.getElementById("totalBooking").innerHTML = total;

document.getElementById("pendingBooking").innerHTML = pending;

document.getElementById("acceptedBooking").innerHTML = diterima;

document.getElementById("rejectedBooking").innerHTML = ditolak;


})

.catch((error)=>{


console.log(error.message);


});





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


let pesan = "";

if(status=="Diterima"){

pesan =
"Halo "+data.nama+" 👋\n\n"+
"Booking Alvin Barber Studio kamu sudah DITERIMA ✅\n\n"+
"Tanggal : "+data.tanggal+"\n"+
"Jam : "+data.jam+"\n"+
"Layanan : "+(data.layanan || "-")+"\n"+
"Capster : "+(data.capster || "-")+"\n\n"+
"Kami tunggu kedatangannya 🙏";


}

else if(status=="Ditolak"){

pesan =
"Halo "+data.nama+" 👋\n\n"+
"Maaf booking Alvin Barber Studio kamu DITOLAK ❌\n\n"+
"Silakan hubungi kami untuk jadwal lain.\n\n"+
"Terima kasih 🙏";

}



window.open(
"https://wa.me/"+data.nomor+"?text="+encodeURIComponent(pesan),
"_blank"
);


alert("Status berhasil diubah!");

location.reload();


});


});


}





function hapusBooking(id){


let yakin = confirm("Hapus booking ini?");


if(yakin){


db.collection("booking")
.doc(id)
.delete()


.then(()=>{


alert("Booking berhasil dihapus");


location.reload();


})


.catch((error)=>{


alert(error.message);


});


}


}




function logout(){


firebase.auth().signOut()


.then(()=>{


alert("Berhasil logout");


window.location.href="login.html";


})


.catch((error)=>{


alert("Logout gagal: "+error.message);


});


}
