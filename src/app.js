document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        item : [
            { id: 1, nama: 'Desain T-SHIRT', img: 'baju.jpg', harga: 30000 },
            { id: 2, nama: 'Desain Profil', img: 'profil.jpg', harga: 25000 },
           
        ],
    }));

    Alpine.store('cart', {
        item : [],
        total: 0,
        quantity: 0,
        add(newItem){
            // Cek Barang
            const cartitem = this.item.find((item) => item.id === newItem.id);
            if(!cartitem){
                this.item.push({...newItem, quantity: 1, total: newItem.harga});
                this.quantity++;
                this.total += newItem.harga;    
            }else{
                this.items = this.item.map((items) => {
                    if(items.id !== newItem.id){
                        return items;
                    }else{
                        items.quantity++;
                        items.total = items.harga * items.quantity;
                        this.quantity++;
                        this.total += newItem.harga;   
                        return items; 
                    }
                });
                    
            }
        },
        remove(id){
            const cartItem = this.item.find((items) => items.id === id);
            if(cartItem.quantity > 1){
                this.item = this.items.map((item) => {

                    if(item.id !== id){
                        return item;
                    }else{
                        item.quantity--;
                        item.total = item.harga * item.quantity;
                        this.quantity--;
                        this.total -= item.harga;
                        return item;
                    }
                })
            }else if(cartItem.quantity === 1){
                this.item = this.item.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.harga;
            }
        },
    });
});

// Validasi
const checkoutbutton = document.querySelector('#checkout-button');
checkoutbutton.disabled = true;

const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++){
        if(form.elements[i].value.length !== 0){
            checkoutbutton.classList.remove('disabled');
            checkoutbutton.classList.add('disabled');
        }else{
            return false;
        }
    }
    checkoutbutton.disabled = false;
    checkoutbutton.classList.remove('disabled');
});

// data pesan
checkoutbutton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objdata = Object.fromEntries(data);
    const message = formatMsg(objdata);
    kirimPesanTelegram(message);
});

// formant pesan 
const formatMsg = (obj) => {
    return `✨Pesanan Masuk✨ 
===============================
📝Data Customer        
===============================
    Nama : ${obj.nama}
    Email : ${obj.email}
    WhatsApp : ${obj.phone}
===============================
🛒Data Pesanan         
===============================
${JSON.parse(obj.item).map((items) => `${items.nama} (${items.quantity} x ${rupiah(items.total)})\n`)}
===============================
💰TOTAL : ${rupiah(obj.total)}`;
};


// Konvers Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits:0,
    }).format(number);
};

function toggleCart() {
    var cart = document.getElementById("shopping-cart");
    cart.style.display = (cart.style.display === "none" || cart.style.display === "") ? "block" : "none";
  }
  
  function kirimPesanTelegram(pesan) {
    const tokenBot = '6940826614:AAF-aZ-87ar55WzKoJtDb5hP27Dt60mQr5w';
    const chatId = '804116558';

    const url = `https://api.telegram.org/bot${tokenBot}/sendMessage`;

    const data = {
        chat_id: chatId,
        text: pesan,
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.ok) {
            // Display alert on success
            alert('Pesanan Telah Dikirim Tunggu Balasan Dari Kami :)');
            location.reload();
        } else {
            // Handle error if needed
            console.error('Error:', data);
        }
    })
    .catch(error => console.error('Error:', error));
}