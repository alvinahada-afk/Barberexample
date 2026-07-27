let semuaBooking = [];


firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        window.location.href="login.html";
    }
});


const list = document.getElementById("bookingList");


db.collection("booking")
.get()
.then((snapshot)=>{

    let total = 0;
    let pending = 0;
    let diterima = 0;
    let ditolak = 0;

    list.innerHTML="";


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

        if(data.status=="Ditolak"){
            ditolak++;
        }



        let waLink =
        "https://wa.me/"+data.nomor;



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



        <br><br>


        <a class="wa-button" 
        href="${waLink}" 
        target="_blank">

        💬 Chat WhatsApp

        </a>


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



alert("Status berhasil diubah!");

location.reload();



});


});


}






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






function logout(){


firebase.auth()
.signOut()

.then(()=>{


window.location.href="login.html";


});


}






function filterBooking(status){


let hasil="";



semuaBooking.forEach((data)=>{



if(status=="Semua" || data.status==status){



hasil += `


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



<button onclick="updateStatus('${data.id}','Diterima')">
Terima Booking
</button>


<button onclick="updateStatus('${data.id}','Ditolak')">
Tolak Booking
</button>


<button onclick="hapusBooking('${data.id}')">
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


});



document.getElementById("bookingList").innerHTML=hasil;


}
