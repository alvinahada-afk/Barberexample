const list = document.getElementById("bookingList");

db.collection("booking")
.get()
.then((snapshot)=>{

    list.innerHTML="";

    snapshot.forEach((doc)=>{

        let data = doc.data();

        list.innerHTML += `
        <div class="card">
            <h3>${data.nama}</h3>
            <p>WhatsApp: ${data.nomor}</p>
            <p>Tanggal: ${data.tanggal}</p>
            <p>Jam: ${data.jam}</p>
            <p>Status: ${data.status}</p>
        </div>
        `;

    });

})
.catch((error)=>{
    list.innerHTML="Error: "+error;
});
