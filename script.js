import { db, auth } from './firebase.js';
import { getDocs, collection, query, where, addDoc, Timestamp, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const ID_TOKO = "toko001";

window.onload = async () => {
  const halaman = window.location.pathname.split("/").pop();

  if(halaman === "" || halaman === "index.html"){
    await muatLayananBarber();
    document.getElementById('tgl').addEventListener('change', cekJamTersedia);
    document.getElementById('formPesan').addEventListener('submit', simpanReservasi);
  }

  if(halaman === "admin.html"){
    onAuthStateChanged(auth, (user) => {
      if(!user) return window.location.href = "index.html";
      muatDataAdmin();
    });
    document.getElementById('btnKeluar').addEventListener('click', () => {
      signOut(auth).then(() => window.location.href = "index.html");
    });
  }
};

async function muatLayananBarber(){
  try{
    const snapLay = await getDocs(query(collection(db,"services"), where("shopId","==",ID_TOKO)));
    let htmlPilih = `<option value="">Pilih Layanan</option>`;
    let htmlTampil = "";
    snapLay.forEach(d => {
      const dt = d.data();
      htmlPilih += `<option value="${d.id}">${dt.name} - Rp${dt.price?.toLocaleString('id-ID')}</option>`;
      htmlTampil += `<div class="bg-gelap p-6 rounded-xl border border-gray-700 hover:border-emas">
        <h3 class="text-xl font-bold text-emas">${dt.name}</h3>
        <p class="text-gray-400 my-2">Pelayanan terbaik & teliti</p>
        <strong>Rp ${dt.price?.toLocaleString('id-ID')}</strong>
      </div>`;
    });
    document.getElementById('pilihLayanan').innerHTML = htmlPilih;
    document.getElementById('daftarLayanan').innerHTML = htmlTampil;

    const snapBar = await getDocs(query(collection(db,"barbers"), where("shopId","==",ID_TOKO)));
    let htmlPilihBar = `<option value="">Pilih Pemangkas</option>`;
    let htmlTampilBar = "";
    snapBar.forEach(d => {
      const dt = d.data();
      htmlPilihBar += `<option value="${d.id}">${dt.name} - ${dt.specialty}</option>`;
      htmlTampilBar += `<div class="bg-gelap2 p-6 rounded-xl text-center border border-gray-700 hover:border-emas">
        <div class="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"><i class="fa fa-user"></i></div>
        <h3 class="text-xl font-bold">${dt.name}</h3>
        <p class="text-emas">${dt.specialty}</p>
      </div>`;
    });
    document.getElementById('pilihBarber').innerHTML = htmlPilihBar;
    document.getElementById('daftarBarber').innerHTML = htmlTampilBar;
  }catch(e){
    alert("⚠️ Cek Rules Firebase: " + e.message);
  }
}

async function cekJamTersedia(){
  const tgl = document.getElementById('tgl').value;
  const idBarber = document.getElementById('pilihBarber').value;
  const semuaJam = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
  if(!tgl || !idBarber) return;

  const q = query(collection(db,"bookings"), where("shopId","==",ID_TOKO), where("barberId","==",idBarber), where("bookingDate","==",tgl), where("status","in",["pending","confirmed"]));
  const snap = await getDocs(q);
  const terpakai = [];
  snap.forEach(d => terpakai.push(d.data().bookingTime));

  let opsi = `<option value="">Pilih Jam</option>`;
  semuaJam.forEach(j => {
    if(!terpakai.includes(j)) opsi += `<option value="${j}">${j}</option>`;
  });
  document.getElementById('jam').innerHTML = opsi;
}

async function simpanReservasi(e){
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  await addDoc(collection(db,"bookings"),{
    shopId: ID_TOKO,
    customerName: d.nama,
    customerWa: d.wa,
    serviceId: d.layanan,
    barberId: d.barber,
    bookingDate: d.tgl,
    bookingTime: d.jam,
    status: "pending",
    createdAt: Timestamp.now()
  });
  alert("✅ Berhasil! Reservasi tercatat.");
  e.target.reset();
}

async function muatDataAdmin(){
  const snap = await getDocs(query(collection(db,"bookings"), where("shopId","==",ID_TOKO)));
  let html = "";
  let hariIni = new Date().toISOString().split('T')[0];
  let hitungHari=0, hitungTotal=0, hitungKonfirm=0, hitungBatal=0;

  snap.forEach(d => {
    const b = d.data();
    if(b.bookingDate === hariIni) hitungHari++;
    hitungTotal++;
    if(b.status === "confirmed") hitungKonfirm++;
    if(b.status === "cancelled") hitungBatal++;

    html += `<tr class="border-b border-gray-700">
      <td class="py-3 px-2">${b.customerName}</td>
      <td class="py-3 px-2">${b.customerWa}</td>
      <td class="py-3 px-2">${b.serviceId}</td>
      <td class="py-3 px-2">${b.barberId}</td>
      <td class="py-3 px-2">${b.bookingDate}</td>
      <td class="py-3 px-2">${b.bookingTime}</td>
      <td class="py-3 px-2 font-bold ${b.status==='pending'?'text-yellow-400':b.status==='confirmed'?'text-green-400':'text-red-400'}">${b.status}</td>
      <td class="py-3 px-2 space-x-1">
        <button class="text-green-400 text-xs hover:text-green-300" onclick="ubahStatus('${d.id}','confirmed')">✅</button>
        <button class="text-red-400 text-xs hover:text-red-300" onclick="ubahStatus('${d.id}','cancelled')">❌</button>
      </td>
    </tr>`;
  });

  document.getElementById('isiReservasi').innerHTML = html || `<tr><td colspan="8" class="py-6 text-center text-gray-400">Belum ada reservasi</td></tr>`;
  document.getElementById('jumlahHariIni').innerText = hitungHari;
  document.getElementById('jumlahTotal').innerText = hitungTotal;
  document.getElementById('jumlahKonfirm').innerText = hitungKonfirm;
  document.getElementById('jumlahBatal').innerText = hitungBatal;
}

window.ubahStatus = async function(id, status){
  await updateDoc(doc(db,"bookings",id), {status: status});
  muatDataAdmin();
}
