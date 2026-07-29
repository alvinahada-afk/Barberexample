import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const serviceList = document.getElementById("service-list");

async function loadServices(){

    console.log("MULAI AMBIL DATA");

    const snapshot = await getDocs(collection(db,"services"));

    console.log("JUMLAH DATA:", snapshot.size);

    serviceList.innerHTML = "";

    snapshot.forEach((doc)=>{

        console.log(doc.data());

        const data = doc.data();

        serviceList.innerHTML += `
        <div class="service-card">
            <h3>${data.nama}</h3>
            <p>Rp ${data.harga}</p>
            <p>${data.deskripsi}</p>
        </div>
        `;

    });

}

loadServices();
