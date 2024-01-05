<script>
   function isMobileOrWebview() {
    // Deteksi webview pada Android
    var isWebviewAndroid = navigator.userAgent.indexOf('wv') !== -1;
    return isWebviewAndroid;
}

if(isMobileOrWebview()){
    window.location.href = "mobile/";
}

</script>
<nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">TIRRKUYY❤</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            Menu
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
                <a class="nav-item nav-link" href="index.php">My🖤</a>
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Game🎮
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="obrolan-kita.php">Obrolan Kita📢</a>
                        <a class="dropdown-item" href="💥.php">Tic-Tac-Toe💥</a>
                        <a class="dropdown-item" href="🎲.php">Spinner🎲</a>
                        <a class="dropdown-item" href="🧿.php">Flip-A-Coin🧿</a>
                    </div>
                </div>
                <a class="nav-item nav-link" href="shop.php">Shop🛒</a>
                <a class="nav-item nav-link" href="someone.php">Someone👁‍🗨</a>
                <a class="nav-item nav-link" href="🤖.php">Asisten🤖</a>
                <a class="nav-item nav-link" href="info.php">Info🚨</a>
                <a class="nav-item nav-link" href="about.php">About📜</a>
                <a class="nav-item nav-link" href="Tirrkuyy.apk">APK📱</a>
            </div>
        </div>
    </nav>