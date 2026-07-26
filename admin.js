const list = document.getElementById("bookingList");

db.collection("booking")
.onSnapshot((snapshot)=>{

    list.innerHTML = "";

    snapshot.forEach((doc)=>{

        let data = doc.data();

        list.innerHTML += `
        <div style="
        background:#111;
        color:white;
        padding:20px;
        margin:15px;
        border-radius:10px;
        ">

        <h3>${data.nama}</h3>

        <p>WhatsApp: ${data.nomor}</p>
        <p>Tanggal: ${data.tanggal}</p>
        <p>Jam: ${data.jam}</p>
        <p>Status: ${data.status}</p>

        <a href="https://wa.me/${data.nomor}" target="_blank">
        Chat WhatsApp
        </a>

        </div>
        `;

    });

});
