import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
where,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// CEK JADWAL TERSEDIA

const tanggal = document.getElementById("tanggal");
const jam = document.getElementById("jam");


tanggal.addEventListener("change", async function(){

    let pilihTanggal = tanggal.value;

    if(!pilihTanggal) return;


    const q = query(
        collection(db,"booking"),
        where("tanggal","==",pilihTanggal)
    );


    const snapshot = await getDocs(q);


    let jamTerpakai = [];


    snapshot.forEach((doc)=>{

        let data = doc.data();

        jamTerpakai.push(data.jam);

    });



    for(let option of jam.options){

        if(jamTerpakai.includes(option.value)){

            option.disabled = true;
            option.textContent = option.value + " (Sudah penuh)";

        }else{

            option.disabled = false;
            option.textContent = option.value;

        }

    }


});


// SIMPAN BOOKING

document
.getElementById("bookingForm")
.addEventListener("submit", async function(e){

e.preventDefault();


await addDoc(collection(db,"booking"),{


nama: document.getElementById("nama").value,

nomor: document.getElementById("nomor").value,

layanan: document.getElementById("layanan").value,

catatan: document.getElementById("catatan").value,

tanggal: document.getElementById("tanggal").value,

jam: document.getElementById("jam").value,

capster: document.getElementById("capster").value,

waktu: new Date()


});


alert("Booking berhasil!");

this.reset();


});
