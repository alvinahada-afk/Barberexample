function booking(){

let pesan = 
"Halo Alvin Barber Studio, saya ingin melakukan booking haircut.";

let nomor = "6283892513500";

window.open(
"https://wa.me/"+nomor+"?text="+encodeURIComponent(pesan)
);

}


const form = document.getElementById("bookingForm");


if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();


let nama = document.getElementById("nama").value;
let nomor = document.getElementById("nomor").value;
let tanggal = document.getElementById("tanggal").value;
let jam = document.getElementById("jam").value;
let capster = document.getElementById("capster").value;
let layanan = document.getElementById("layanan").value;

  let catatan = document.getElementById("catatan").value;


db.collection("booking")
.where("tanggal","==",tanggal)
.where("jam","==",jam)
.get()
.then((snapshot)=>{

    if(!snapshot.empty){

        alert("❌ Jam tersebut sudah dibooking. Silakan pilih jam lain.");
        return;

    }


    // Jika jam masih kosong, simpan booking

    db.collection("booking").add({

        nama:nama,
        nomor:nomor,
        tanggal:tanggal,
        jam:jam,
        capster:capster,
        status:"Pending"

    })

    .then(()=>{

        alert("✅ Booking berhasil dikirim!");

        form.reset();

    })

    .catch((error)=>{

        alert("Gagal menyimpan booking: "+error.message);

    });


})
.catch((error)=>{

    alert("Error cek jadwal: "+error.message);

});

})


.then(()=>{

alert("✅ Booking berhasil!");

form.reset();

})


.catch((error)=>{

alert("❌ Error: "+error.message);

});


});


}
