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
        // .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}