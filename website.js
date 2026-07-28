window.onload = function(){

let data = JSON.parse(localStorage.getItem("settingWebsite"));

if(data){

document.getElementById("namaUsaha").innerHTML = data.namaToko;

document.getElementById("deskripsiUsaha").innerHTML = data.deskripsi;

document.getElementById("jamUsaha").innerHTML = data.jamBuka;

}

}
