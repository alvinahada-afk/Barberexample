console.log("ADMIN AKTIF");


const db = firebase.firestore();


let daftarPelanggan = new Set();


db.collection("booking")
.onSnapshot((snapshot)=>{


let total = snapshot.size;

let pending = 0;

let tabel = document.getElementById("tabelPesanan");


tabel.innerHTML="";


daftarPelanggan.clear();



snapshot.forEach((doc)=>{


let data = doc.data();


let nama = data.nama || "-";

let layanan = data.layanan || data.service || "-";

let status = data.status || "Pending";



if(status=="Pending"){
pending++;
}



daftarPelanggan.add(nama);



tabel.innerHTML += `

<tr>

<td>${nama}</td>

<td>${layanan}</td>

<td>

<span class="status ${status}">

${status}

</span>

</td>


</tr>

`;



});



document.getElementById("totalPesanan").innerHTML = total;


document.getElementById("pesananBaru").innerHTML = pending;


document.getElementById("pelanggan").innerHTML = daftarPelanggan.size;


document.getElementById("jumlahPelanggan").innerHTML =
daftarPelanggan.size + " Pelanggan";



})


.catch((error)=>{

console.log("FIREBASE ERROR:",error);

});
