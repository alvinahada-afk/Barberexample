console.log("ADMIN JS AKTIF");

const db = firebase.firestore();

db.collection("booking").onSnapshot((snapshot)=>{

console.log("DATA MASUK:", snapshot.size);


document.getElementById("totalPesanan").innerHTML = snapshot.size;
document.getElementById("pesananBaru").innerHTML = snapshot.size;


snapshot.forEach((doc)=>{

let data = doc.data();

let layanan = data.layanan || "Belum memilih";
let harga = "-";

if(layanan.includes("Premium")){
harga="Rp35.000";
}

if(layanan.includes("Basic")){
harga="Rp25.000";
}


let statusClass="";

if(data.status=="Diterima"){
statusClass="success";
}

else if(data.status=="Pending"){
statusClass="pending";
}

else if(data.status=="Ditolak"){
statusClass="danger";
}


pelanggan.add(data.nomor);


table.innerHTML += `

<tr>

<td>${data.nama || "-"}</td>

<td>
${layanan}
<br>
<span class="harga">${harga}</span>
</td>

<td>
<span class="status ${statusClass}">
${data.status || "Pending"}
</span>
</td>

</tr>

`;

});
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
