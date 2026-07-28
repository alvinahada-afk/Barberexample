const bookingRef = db.collection("booking");

const totalPesanan = document.getElementById("totalPesanan");
const pesananBaru = document.getElementById("pesananBaru");
const pelanggan = document.getElementById("pelanggan");
const tabelPesanan = document.getElementById("tabelPesanan");


bookingRef.onSnapshot((snapshot)=>{

let total = snapshot.size;
let baru = 0;
let pelangganData = [];

tabelPesanan.innerHTML="";


snapshot.forEach((doc)=>{

let data = doc.data();

if(data.status == "Diterima" || data.status == "Pending"){
baru++;
}


if(data.nama){
pelangganData.push(data.nama);
}


tabelPesanan.innerHTML += `

<tr>
<td>${data.nama || "-"}</td>
<td>${data.layanan || "-"}</td>
<td>${data.status || "-"}</td>
</tr>

`;

});


totalPesanan.innerHTML = total;

pesananBaru.innerHTML = baru;

pelanggan.innerHTML = [...new Set(pelangganData)].length;


});
