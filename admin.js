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

        <br><br>

        <a href="https://wa.me/${data.nomor}">
        Chat WhatsApp
        </a>

        </div>
        `;

    });

})
.catch((error)=>{
    list.innerHTML = "Error: " + error.message;
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
