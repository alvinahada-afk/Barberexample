const serviceList = document.getElementById("serviceList");

async function loadServices(){

    const querySnapshot = await db.collection("services").get();

    serviceList.innerHTML = "";

    querySnapshot.forEach((doc)=>{

        let data = doc.data();

        serviceList.innerHTML += `
        
        <div class="card">

            <h3>${data.nama}</h3>

            <p>
            Rp${Number(data.harga).toLocaleString("id-ID")}
            </p>

            <p>
            ${data.deskripsi}
            </p>

        </div>

        `;

    });

}

loadServices();
