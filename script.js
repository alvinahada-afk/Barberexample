import { db } from './firebase.js';
import { getDocs, collection, query, where, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ID_TOKO_KAMU = "toko001";

async function muatData() {
  const layanan = await getDocs(query(collection(db,"services"), where("shopId","==",ID_TOKO_KAMU)));
  layanan.forEach(doc => {
    const o = new Option(doc.data().name, doc.id);
    document.getElementById('pilihLayanan').appendChild(o);
  });

  const barber = await getDocs(query(collection(db,"barbers"), where("shopId","==",ID_TOKO_KAMU)));
  barber.forEach(doc => {
    const o = new Option(doc.data().name, doc.id);
    document.getElementById('pilihBarber').appendChild(o);
  });
}

async function cekKetersediaan() {
  const tgl = document.getElementById('tgl').value;
  const idBarber = document.getElementById('pilihBarber').value;
  const semuaJam = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
  
  const q = query(
    collection(db,"bookings"),
    where("shopId","==",ID_TOKO_KAMU),
    where("barberId","==",idBarber),
    where("bookingDate","==",tgl),
    where("status","in",["pending","confirmed"])
  );

  const hasil = await getDocs(q);
  const jamTerpakai = [];
  hasil.forEach(d => jamTerpakai.push(d.data().bookingTime));

  document.getElementById('jam').innerHTML = `<option value="">Pilih Jam</option>`;
  semuaJam.forEach(j => {
    if(!jamTerpakai.includes(j)){
      document.getElementById('jam').innerHTML += `<option value="${j}">${j}</option>`;
    }
  });
}

document.getElementById('formPesan').addEventListener('submit', async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));

  await addDoc(collection(db,"bookings"),{
    shopId: ID_TOKO_KAMU,
    customerName: d.nama,
    customerWa: d.wa,
    serviceId: d.layanan,
    barberId: d.barber,
    bookingDate: d.tgl,
    bookingTime: d.jam,
    status: "pending",
    createdAt: Timestamp.now()
  });

  alert("✅ Berhasil! Data tersimpan di sistem.");
  e.target.reset();
})

document.getElementById('tgl').addEventListener('change',cekKetersediaan);
muatData();
