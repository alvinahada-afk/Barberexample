const list = document.getElementById("bookingList");

db.collection("booking")
.get()
.then((snapshot)=>{

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

<a href="https://wa.me/6283892513500?text=Booking%20Baru%0A%0ANama:%20${data.nama}%0ANomor:%20${data.nomor}%0ATanggal:%20${data.tanggal}%0AJam:%20${data.jam}" target="_blank">
Kirim Notifikasi WhatsApp
</a>

</div>
`;

    });

})
.catch((error)=>{
    list.innerHTML="Error: "+error;
});

function updateStatus(id,status){

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
