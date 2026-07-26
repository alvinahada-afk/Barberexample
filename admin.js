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

<a href="https://wa.me/${data.nomor}?text=Booking%20Anda%20${data.nama}%20${data.tanggal}%20${data.jam}">
Kirim WhatsApp
</a>

</div>
`;

});

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
