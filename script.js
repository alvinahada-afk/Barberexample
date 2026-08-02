import { db } from './firebase.js';
import { getDocs, collection, query, where, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ID_TOKO = "toko001";

window.onload = async () => {
  await muatSemuaData();
}

async function muatSemuaData() {
  try {
    // Muat Layanan
    const layananSnap = await getDocs(query(collection(db,"services"), where("shopId","==",ID_TOKO)));
    let htmlLayanan = `<option value="">Pilih Layanan</option>`;
    layananSnap.forEach(doc => {
      const d = doc.data();
      htmlLayanan += `<option value="${doc.id}">${d.name} - Rp ${d.price.toLocaleString('id-ID')}</option>`;
    });
    document.getElementById('pilihLayanan').innerHTML = htmlLayanan;

    // Tampilkan di halaman
    let tampilLayanan = "";
    layananSnap.forEach(doc => {
      const d = doc.data();
      tampilLayanan += `
      <div class="bg-gelap p-6 rounded-xl border border-gray-800 hover:border-emas transition-all">
        <h3 class="text-xl font-bold text-emas mb-2">${d.name}</h3>
        <p class="text-gray-400 mb-3">Layanan berkualitas terbaik</p>
        <strong class="text-lg">Rp ${d.price.toLocaleString('id-ID')}</strong>
      </div>
      `;
    });
    document.getElementById('daftarLayanan').innerHTML = tampilLayanan;

    // Muat Barber
    const barberSnap = await getDocs(query(collection(db,"barbers"), where("shopId","==",ID_TOKO)));
    let htmlBarber = `<option value="">Pilih Pemangkas</option>`;
    barberSnap.forEach(doc => {
      const d = doc.data();
      htmlBarber += `<option value="${doc.id}">${d.name} - ${d.specialty}</option>`;
    });
    document.getElementById('pilihBarber').innerHTML = htmlBarber;

    // Tampilkan di halaman
    let tampilBarber = "";
    barberSnap.forEach(doc => {
      const d = doc.data();
      tampilBarber += `
      <div class="bg-gelap2 p-6 rounded-xl text-center border border-gray-800 hover:border-emas transition-all">
        <div class="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"><i class="fa fa-user"></i></div>
        <h3 class="text-xl font-bold">${d.name}</h3>
        <p class="text-emas text-sm">${d.specialty}</p>
      </div>
      `;
    });
    document.getElementById('daftarBarber').innerHTML = tampilBarber;

  } catch (e) {
    alert("❌ Masalah koneksi: " + e.message + "\nCek aturan Rules Firebase!");
    console.error(e);
  }
}

// Cek Jam
document.getElementById('tgl').addEventListener('change', async () => {
  const tgl = document.getElementById('tgl').value;
  const idBarber = document.getElementById('pilihBarber').value;
  const semuaJam = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

  if(!tgl || !idBarber) return;

  const q = query(
    collection(db,"bookings"),
    where("shopId","==",ID_TOKO),
    where("barberId","==",idBarber),
    where("bookingDate","==",tgl),
    where("status","in",["pending","confirmed"])
  );

  const hasil = await getDocs(q);
  const terpakai = [];
  hasil.forEach(d => terpakai.push(d.data().bookingTime));

  let opsi = `<option value="">Pilih Jam</option>`;
  semuaJam.forEach(j => {
    if(!terpakai.includes(j)) opsi += `<option value="${j}">${j}</option>`;
  });
  document.getElementById('jam').innerHTML = opsi;
});

// Simpan Booking
document.getElementById('formBooking').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  await addDoc(collection(db,"bookings"),{
    shopId: ID_TOKO,
    customerName: data.nama,
    customerWa: data.wa,
    serviceId: data.layanan,
    barberId: data.barber,
    bookingDate: data.tgl,
    bookingTime: data.jam,
    status: "pending",
    createdAt: Timestamp.now()
  });

  alert("✅ Reservasi Berhasil! Terima Kasih!");
  e.target.reset();
});
