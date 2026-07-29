const serviceList = document.getElementById("serviceList");

db.collection("services").get().then((snapshot)=>{

serviceList.innerHTML="";

snapshot.forEach((doc)=>{

let data = doc.data();


serviceList.innerHTML += `

<div class="service-card">

<h3>${data.nama}</h3>

<p>Rp${data.harga.toLocaleString()}</p>

<p>${data.deskripsi}</p>

</div>

`;

});


}).catch((error)=>{

console.log(error);

});
