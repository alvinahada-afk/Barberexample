firebase.auth().onAuthStateChanged((user)=>{
  if(!user){
    window.location="login.html";
  }
});
const list = document.getElementById("bookingList");

db.collection("booking")
.get()
.then((snapshot)=>{

    list.innerHTML = "";

    snapshot.forEach((doc)=>{

        let data = doc.data();

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

<a href="https://wa.me/6283892513500?text=Booking%20Baru%0A%0ANama:%20${data.nama}%0ANomor:%20${data.nomor}%0ATanggal:%20${data.tanggal}%0AJam:%20${data.jam}" target="_blank">
Notifikasi Pemilik
</a>

        </div>
        `;

    });

})
.catch((error)=>{
    list.innerHTML = "Error: " + error.message;
});


function updateStatus(id,status){
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
alert(error);
});

}

}
    
db.collection("booking")
.doc(id)
.update({
    status: status
})
.then(()=>{
    alert("Status booking berhasil diubah");
    location.reload();
})
.catch((error)=>{
    alert(error);
});

}

function hapusBooking(id){

let yakin = confirm("Yakin hapus booking ini?");

if(yakin){

db.collection("booking")
.doc(id)
.delete()
.then(()=>{
alert("Booking berhasil dihapus");
location.reload();
})
.catch((error)=>{
alert(error);
});

}

}
