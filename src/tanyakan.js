// sessionStorage.removeItem('pertanyaanDitanyakan');
var pertanyaanDitanyakan = sessionStorage.getItem('pertanyaanDitanyakan');

// Jika belum ditanyakan, tanyakan pertanyaan
if (!pertanyaanDitanyakan) {
    var nama, usia;
    var inputBenar = false;

    do {
        nama = prompt("Masukkan Nama Anda:");
        while (!nama) {
            alert("Nama wajib diisi!");
            nama = prompt("Masukkan Nama Anda:");
        }

        usia = prompt("Masukkan Usia Anda:");
        while (!usia || isNaN(usia)) {
            alert("Usia wajib diisi dengan angka!");
            usia = prompt("Masukkan Usia Anda:");
        }

        // Berhenti dari loop jika semua input sesuai
        inputBenar = true;

    } while (!inputBenar);

    // Simpan nama dan usia di sessionStorage
    sessionStorage.setItem('nama', nama);
    sessionStorage.setItem('usia', usia);

    // Set flag bahwa pertanyaan sudah ditanyakan
    sessionStorage.setItem('pertanyaanDitanyakan', 'true');

    // Membuat pesan yang akan dikirim ke bot Telegram
    var pesan = `Someone👁‍🗨\nNama: ${nama}\nUsia: ${usia}`;

    // Mengirim pesan ke bot Telegram
    kirimPesanTelegram(pesan);
}
