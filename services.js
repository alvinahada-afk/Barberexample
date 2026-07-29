import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

alert("services.js jalan");

const list = document.getElementById("service-list");

async function test(){

    const data = await getDocs(collection(db,"services"));

    alert("Jumlah data: " + data.size);

    data.forEach((doc)=>{

        alert(JSON.stringify(doc.data()));

    });

}

test();
