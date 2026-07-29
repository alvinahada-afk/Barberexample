import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const serviceList = document.getElementById("serviceList");


async function loadServices(){

    try {

        const querySnapshot = await getDocs(collection(db, "services"));

        serviceList.innerHTML = "";


        querySnapshot.forEach((doc)=>{

            const data = doc.data();


            serviceList.innerHTML += `

            <div class="card">

                <h3>${data.nama}</h3>

                <p>
                Rp${Number(data.harga).toLocaleString("id-ID")}
                </p>

                <p>
                ${data.deskripsi || ""}
                </p>


            </div>

            `;

        });


    } catch(error){

        console.log("Error:", error);

        serviceList.innerHTML =
        "<p>Gagal memuat layanan</p>";

    }

}


loadServices();
