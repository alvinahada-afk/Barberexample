// ambil data booking Firebase

const db = firebase.firestore();

db.collection("booking").onSnapshot((snapshot)=>{

let total = snapshot.size;

document.getElementById("totalPesanan").innerHTML = total;
document.getElementById("pesananBaru").innerHTML = total;


let tabel = document.querySelector("table");

tabel.innerHTML = `
<tr>
<th>Nama</th>
<th>Layanan</th>
<th>Status</th>
</tr>
`;


snapshot.forEach((doc)=>{

let data = doc.data();

tabel.innerHTML += `
<tr>
<td>${data.nama || "-"}</td>
<td>${data.layanan || "-"}</td>
<td>${data.status || "-"}</td>
</tr>
`;

});


}).catch((error)=>{

console.log(error);

});
