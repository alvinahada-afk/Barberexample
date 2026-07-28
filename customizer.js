function simpanSetting(){

let data = {
    namaToko: document.getElementById("namaToko").value,
    whatsapp: document.getElementById("whatsapp").value,
    deskripsi: document.getElementById("deskripsi").value,
    jamBuka: document.getElementById("jamBuka").value
};

// simpan ke browser
localStorage.setItem("settingWebsite", JSON.stringify(data));

alert("Website berhasil diperbarui!");

}
