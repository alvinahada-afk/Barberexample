function booking(){

let pesan =
"Halo Alvin Barber Studio, saya ingin melakukan booking haircut.";

let nomor = "6283892513500";


window.open(
"https://wa.me/"+nomor+
"?text="+encodeURIComponent(pesan)
);

}





const form = document.getElementById("bookingForm");

const tanggalInput = document.getElementById("tanggal");

const capsterInput = document.getElementById("capster");

const jamInput = document.getElementById("jam");




// DAFTAR JAM

const daftarJam = [

"10:00",
"11:00",
"12:00",
"13:00",
"14:00",
"15:00",
"16:00",
"17:00",
"18:00",
"19:00",
"20:00",
"21:00",
"22:00",
"23:00"

];




// CEK JAM TERSEDIA


function cekJam(){


let tanggal = tanggalInput.value;

let capster = capsterInput.value;



if(!tanggal || !capster){

return;

}



db.collection("booking")

.where("tanggal","==",tanggal)

.where("capster","==",capster)

.get()

.then((snapshot)=>{



let jamTerpakai = [];



snapshot.forEach((doc)=>{


let data = doc.data();


jamTerpakai.push(data.jam);



});





jamInput.innerHTML = `

<option value="">

-- Pilih Jam --

</option>

`;




daftarJam.forEach((jam)=>{


let penuh = jamTerpakai.includes(jam);



let option = document.createElement("option");



option.value = jam;



if(penuh){


option.textContent = jam+" (Penuh)";

option.disabled = true;



}else{


option.textContent = jam;



}



jamInput.appendChild(option);



});




});



}





// JALANKAN SAAT TANGGAL / CAPSTER BERUBAH


if(tanggalInput){

tanggalInput.addEventListener(
"change",
cekJam
);

}



if(capsterInput){

capsterInput.addEventListener(
"change",
cekJam
);

}








// SIMPAN BOOKING


if(form){


form.addEventListener("submit",(e)=>{


e.preventDefault();




let nama =
document.getElementById("nama").value;


let nomor =
document.getElementById("nomor").value;


let layanan =
document.getElementById("layanan").value;


let catatan =
document.getElementById("catatan").value;


let tanggal =
document.getElementById("tanggal").value;


let jam =
document.getElementById("jam").value;


let capster =
document.getElementById("capster").value;






if(!jam){


alert("❌ Silakan pilih jam yang tersedia");


return;


}






// CEK ULANG SEBELUM SIMPAN


db.collection("booking")

.where("tanggal","==",tanggal)

.where("jam","==",jam)

.where("capster","==",capster)

.get()

.then((snapshot)=>{



if(!snapshot.empty){


alert(
"❌ Jadwal sudah digunakan. Silakan pilih jam lain."
);


cekJam();


return;


}






// SIMPAN DATA


db.collection("booking")

.add({


nama:nama,

nomor:nomor,

layanan:layanan,

catatan:catatan,

tanggal:tanggal,

jam:jam,

capster:capster,

status:"Pending"



})

.then(()=>{


alert("✅ Booking berhasil dikirim!");

form.reset();



});





})

.catch((error)=>{


alert(
"❌ Error: "+error.message
);


});



});



}

document.getElementById("saveBtn").onclick = function(){

alert("Berhasil disimpan!");

};
