let total = 0;
let pending = 0;
let accepted = 0;
let rejected = 0;

firebase.auth().onAuthStateChanged((user)=>{
  if(!user){
    window.location="login.html";
  }
});

const list = document.getElementById("bookingList");

db.collection("booking")
.get()
.then((snapshot)=>{

list.innerHTML="";

snapshot.forEach((doc)=>{

let data = doc.data();

total++;

if(data.status=="Pending"){
pending++;
}

if(data.status=="Diterima"){
accepted++;
}

if(data.status=="Ditolak"){
rejected++;
}


list.innerHTML += `

<div class="card">

<h3>${data.nama}</h3>

<p>WhatsApp: ${data.nomor}</p>

<p>Tanggal: ${data.tanggal}</p>

<p>Jam: ${data.jam}</p>

<p>Status: ${data.status}</p>


<button onclick="updateStatus('${doc.id}','Diterima')">
Terima Booking
</button>


<button onclick="updateStatus('${doc.id}','Ditolak')">
Tolak Booking
</button>


<button onclick="hapusBooking('${doc.id}')">
Hapus
</button>


<br><br>


<a href="https://wa.me/${data.nomor}">
Chat WhatsApp
</a>


</div>

`;

});


document.getElementById("totalBooking").innerHTML=total;
document.getElementById("pending").innerHTML=pending;
document.getElementById("accepted").innerHTML=accepted;
document.getElementById("rejected").innerHTML=rejected;


})
.catch((error)=>{

list.innerHTML="Error: "+error.message;

});



function updateStatus(id,status){

db.collection("booking")
.doc(id)
.update({
status:status
})
.then(()=>{

alert("Status berhasil diubah");
location.reload();

});

}



function hapusBooking(id){

let yakin=confirm("Hapus booking ini?");

if(yakin){

db.collection("booking")
.doc(id)
.delete()
.then(()=>{

alert("Booking berhasil dihapus");
location.reload();

});

}

}



function logout(){

firebase.auth().signOut()
.then(()=>{

alert("Berhasil logout");

window.location="login.html";

});

}
