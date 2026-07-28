firebase.firestore()
.collection("booking")
.onSnapshot((snapshot)=>{

let tabel = document.getElementById("tabelPesanan");

tabel.innerHTML="";

let jumlah = 0;

snapshot.forEach((doc)=>{

let data = doc.data();

jumlah++;

tabel.innerHTML += `
<tr>
<td>${data.nama}</td>
<td>${data.layanan}</td>
<td>${data.status}</td>
</tr>
`;

});


document.getElementById("totalPesanan").innerHTML = jumlah;
document.getElementById("pesananBaru").innerHTML = jumlah;

});
