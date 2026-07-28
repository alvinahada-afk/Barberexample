console.log("ADMIN JS AKTIF");

setTimeout(()=>{

const db = firebase.firestore();

console.log("FIREBASE AKTIF");

db.collection("booking").get()
.then((snapshot)=>{

console.log("JUMLAH DATA:", snapshot.size);

let tabel = document.querySelector("table");

tabel.innerHTML = `
<tr>
<th>Nama</th>
<th>Layanan</th>
<th>Status</th>
</tr>
`;

snapshot.forEach((doc)=>{

let d = doc.data();

console.log(d);

tabel.innerHTML += `
<tr>
<td>${d.nama}</td>
<td>${d.layanan}</td>
<td>${d.status}</td>
</tr>
`;

});


document.getElementById("totalPesanan").innerHTML = snapshot.size;


})
.catch((error)=>{

console.log("ERROR FIREBASE:",error);

});


},1000);
