const db = firebase.firestore();


firebase.auth().onAuthStateChanged(function(user){

if(!user){

window.location.href="login.html";

}

});



db.collection("booking").onSnapshot(function(snapshot){

let total = snapshot.size;

document.getElementById("totalPesanan").innerHTML = total;


let baru = 0;
let html = "";


snapshot.forEach(function(doc){


let data = doc.data();


if(data.status == "Diterima" || data.status == "Baru"){
baru++;
}


html += `
<tr>
<td>${data.nama || "-"}</td>
<td>${data.layanan || "-"}</td>
<td>${data.status || "-"}</td>
</tr>
`;


});


document.getElementById("pesananBaru").innerHTML = baru;


document.querySelector("table").innerHTML = `

<tr>
<th>Nama</th>
<th>Layanan</th>
<th>Status</th>
</tr>

${html}

`;


});


function logout(){

firebase.auth().signOut()
.then(function(){

window.location.href="login.html";

});

}
