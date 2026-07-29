import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const serviceList = document.getElementById("serviceList");


async function loadServices(){

try{

const snapshot = await getDocs(collection(db,"services"));


serviceList.innerHTML="";


snapshot.forEach((doc)=>{


let data = doc.data();


serviceList.innerHTML += `

<div class="card">

<h3>${data.nama}</h3>

<p>
Rp ${data.harga.toLocaleString("id-ID")}
</p>

<p>
${data.deskripsi}
</p>

</div>

`;


});


}catch(error){

console.log(error);

}


}


loadServices();
