const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="">🖤</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

let thinkingLi; // Declare the variable outside the functions to make it accessible globally

const generateResponse = (chatElement, responseText) => {
    // Buat elemen baru untuk respons aktual
    const responseLi = createChatLi(responseText, "incoming");

    if (chatElement) {
        const parent = chatElement.parentElement; // Dapatkan elemen parent (responseLi)
        parent.replaceChild(responseLi, chatElement);

        setTimeout(() => {
            parent.removeChild(responseLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }, 1000); // Sesuaikan durasi yang diinginkan
    } else {
        // Jika chatElement tidak ada, tambahkan respons langsung
        chatbox.appendChild(thinkingLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Kirim pesan ke Telegram setelah pengguna mengirim pesan
    const pesan = `[Pesan Terkirim] ${nama} : ${userMessage}`;
    kirimPesanTelegram(pesan);

    if (userMessage.toLowerCase() === "hai" || userMessage.toLowerCase() === "halo" ) {
        const bot = createChatLi(`${userMessage} Juga`, "incoming");
        chatbox.appendChild(bot);
        chatbox.scrollTo(0, chatbox.scrollHeight);

    } else if(userMessage.toLowerCase() === "/gambar"){
        const imageUrls = [
            "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",

        ];

        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        
        const imageLi = document.createElement("li");
        imageLi.classList.add("chat", "incoming");
        imageLi.innerHTML = `<img src="${randomImageUrl}" alt="Image"/>`;
        chatbox.appendChild(imageLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

    }else if(userMessage.toLowerCase() === "/musik"){
    
    const audioUrls = [
        {
            "title": "Death Bed",
            "artist": "Powfu",
            "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
            "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
            "id": "1"
        },
        {
            "title": "Bad Liar",
            "artist": "Imagine Dragons",
            "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
            "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
            "id": "2"
        },
        {
            "title": "Faded",
            "artist": "Alan Walker",
            "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
            "url": "https://samplesongs.netlify.app/Faded.mp3",
            "id": "3"
        },
        {
            "title": "Hate Me",
            "artist": "Ellie Goulding",
            "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
            "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
            "id": "4"
        },
        {
            "title": "Solo",
            "artist": "Clean Bandit",
            "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
            "url": "https://samplesongs.netlify.app/Solo.mp3",
            "id": "5"
        },
        {
            "title": "Without Me",
            "artist": "Halsey",
            "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
            "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
            "id": "6"
        }

    ];

    const randomAudio = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    const title = randomAudio.title;
    const artist = randomAudio.artist;
    const artwork = randomAudio.artwork;
    const audioUrl = randomAudio.url;
    const id = randomAudio.id;
    
    console.log("Title:", title);
    console.log("Artist:", artist);
    console.log("Artwork:", artwork);
    console.log("Audio URL:", audioUrl);
    console.log("ID:", id);
    
    const audioLi = document.createElement("li");
    const imageLi = document.createElement("li");
    audioLi.classList.add("chat", "incoming");
    imageLi.classList.add("chat", "incoming");
    imageLi.innerHTML = `<img class="img-audio" src="${artwork}" alt="Image"/>`;
    audioLi.innerHTML = `<audio controls><source src="${audioUrl}" type="audio/mp3"></audio>`;
    chatbox.appendChild(imageLi);
    chatbox.appendChild(audioLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    }else {
        const bot = createChatLi(
`List Perintah Bot
/gambar [Random]
/musik [Random]
Chat Bot Ini Dalam Pengembangan`, "incoming");
        chatbox.appendChild(bot);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
    
}

const hapusChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    var pesan = `[Pesan Dihapus] ${nama} : ${userMessage}`;
    kirimPesanTelegram(pesan);
}

let backspacePressed = false;
let backspaceHoldTimer;

chatInput.addEventListener('keydown', function(event) {
    if (event.key === "Backspace" && !backspacePressed) {
        backspacePressed = true;

        // Set a timer to execute the function after a certain duration (e.g., 1000 milliseconds or 1 second)
        backspaceHoldTimer = setTimeout(() => {
            hapusChat();
        }, 400);
    }
});

chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Backspace") {
        backspacePressed = false;
        // Clear the timer when the key is released before the timeout duration
        clearTimeout(backspaceHoldTimer);
    }
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

const listenToTelegramMessages = async () => {
    let lastReceivedMessageId = 0;

    const telegramAPI = `https://api.telegram.org/bot6940826614:AAF-aZ-87ar55WzKoJtDb5hP27Dt60mQr5w/getUpdates`;

    while (true) {
        try {
            const response = await axios.get(`${telegramAPI}?offset=${lastReceivedMessageId + 1}`);
            const messages = response.data.result;

            for (const message of messages) {
                const chatId = message.message.chat.id;
                const incomingMessage = message.message.text;

                lastReceivedMessageId = message.update_id;

                const incomingChatLi = createChatLi(incomingMessage, "incoming");
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);

            }

            // Tunggu sebelum mengirim permintaan lagi
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(error);
        }
    }
};

listenToTelegramMessages();
