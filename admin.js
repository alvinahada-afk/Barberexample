const db = firebase.firestore();

let tabel = document.getElementById("tabelPesanan");

db.collection("booking").onSnapshot((snapshot)=>{

let total = 0;

tabel.innerHTML = "";

snapshot.forEach((doc)=>{

let data = doc.data();

total++;

tabel.innerHTML += `
<tr>
<td>${data.nama || "-"}</td>
<td>${data.layanan || "-"}</td>
<td>${data.status || "Diterima"}</td>
</tr>
`;

});


document.getElementById("totalPesanan").innerHTML = total;
document.getElementById("pesananBaru").innerHTML = total;


});
