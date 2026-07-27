// CEK LOGIN ADMIN
firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        window.location="login.html";
    }
});


// AMBIL ELEMENT
const list = document.getElementById("bookingList");


// LOAD DATA BOOKING
db.collection("booking")
.get()
.then((snapshot)=>{

    let total = 0;
    let pending = 0;
    let accepted = 0;
    let rejected = 0;

    list.innerHTML = "";


    snapshot.forEach((doc)=>{

        let data = doc.data();

        total++;


        if(data.status == "Pending" || data.status == "Menunggu"){
            pending++;
        }

        if(data.status == "Diterima"){
            accepted++;
        }

        if(data.status == "Ditolak"){
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


        <a href="https://wa.me/${data.nomor}" target="_blank">
        Chat WhatsApp Pelanggan
        </a>


        <br><br>


        <a href="https://wa.me/6283892513500?text=Booking%20Baru%0A%0ANama:%20${data.nama}%0ANomor:%20${data.nomor}%0ATanggal:%20${data.tanggal}%0AJam:%20${data.jam}" target="_blank">

        Notifikasi Pemilik

        </a>


        </div>

        `;


    });



    // UPDATE STATISTIK

    document.getElementById("totalBooking").innerHTML = total;

    document.getElementById("pending").innerHTML = pending;

    document.getElementById("accepted").innerHTML = accepted;

    document.getElementById("rejected").innerHTML = rejected;



})

.catch((error)=>{

    list.innerHTML = "Error: " + error.message;

});




// UBAH STATUS BOOKING

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




// HAPUS BOOKING

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




// LOGOUT

function logout(){


firebase.auth()
.signOut()


.then(()=>{


alert("Berhasil logout");


window.location="login.html";


});


}
