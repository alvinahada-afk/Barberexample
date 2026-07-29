import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const serviceList = document.getElementById("service-list");

async function loadServices(){

const data = await getDocs(collection(db,"services"));

serviceList.innerHTML = "";

data.forEach((doc)=>{

console.log(doc.data());

serviceList.innerHTML += `
<h2>${doc.data().nama}</h2>
<p>${doc.data().deskripsi}</p>
<p>${doc.data().harga}</p>
`;

});

}

loadServices();
