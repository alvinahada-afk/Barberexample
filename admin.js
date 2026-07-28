console.log("ADMIN JS AKTIF");

const db = firebase.firestore();

db.collection("booking").onSnapshot((snapshot)=>{

console.log("DATA MASUK:", snapshot.size);


document.getElementById("totalPesanan").innerHTML = snapshot.size;
document.getElementById("pesananBaru").innerHTML = snapshot.size;


let pelanggan = new Set();

let table = document.querySelector("table");

table.innerHTML = `
<tr>
<th>Nama</th>
<th>Layanan</th>
<th>Status</th>
</tr>
`;


snapshot.forEach((doc)=>{

let data = doc.data();

console.log(data);


pelanggan.add(data.nomor);


table.innerHTML += `

<tr>

<td>${data.nama || "-"}</td>

<td>${data.layanan || "-"}</td>

<td>${data.status || "-"}</td>

</tr>

`;

});


document.getElementById("pelanggan").innerHTML = pelanggan.size;


},(error)=>{

console.log("FIREBASE ERROR:",error);

});
