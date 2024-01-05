document.addEventListener('DOMContentLoaded', function() {
    var h1Element = document.getElementById('myHeading');
    var hatiku = document.getElementById('loveIcon');
    var myhati = document.getElementById('loveCount');
    var words = ["Hai, Guswan Tiara", "How Are You?", "كيف حالك؟", "Kumaha damang?", "Apa kabarmu?",""]; // Daftar kata yang ingin ditampilkan
    var index = 0;

    var intervalId = setInterval(function() {
        h1Element.textContent = words[index];
        index = (index + 1) % words.length;

        if (index === 0) {
            hatiku.style.display = 'block';
            myhati.style.display = 'block';
        }
        // Hentikan interval jika semua kata telah ditampilkan
        if (index === 0) {
            clearInterval(intervalId);    
            h1Element.style.display = 'none'; // Sembunyikan teks setelah ditekan  
        }
    }, 3000); // Berganti kata setiap 2 detik (2000 milidetik)
});

// // Scroll
// var prevScrollpos = window.pageYOffset;
// var navbar = document.getElementById("navbar");

// window.onscroll = function() {
//     var currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//         navbar.style.top = "0";
//     } else {
//         navbar.style.top = "-60px"; // Sesuaikan dengan tinggi navbar Anda
//     }
//     prevScrollpos = currentScrollPos;
// }

// MyHeart
var loveCount = 0;

function increaseLove() {
    loveCount++;
    updateLoveCount();
}

function updateLoveCount() {
    var loveIconElement = document.getElementById('loveIcon');
    var loveCountElement = document.getElementById('loveCount');
    
    loveCountElement.textContent = loveCount;

    // Perbarui ukuran teks berdasarkan jumlah "love"
    var newSize = 30 + loveCount * 10; // Misalnya, ukuran tambahan 5px untuk setiap "love"
    loveIconElement.style.fontSize = newSize + 'px';

    if (loveCount === 10) {
        loveIconElement.style.display = 'none';
        loveCountElement.innerHTML = "<h1>Aku sayang kamu</h1>";
    }
}