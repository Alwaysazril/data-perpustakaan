<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Login - Dual Video Edition</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <video autoplay muted loop id="bgVideo">
        <source src="login2.mp4" type="video/mp4">
    </video>

    <div class="overlay"></div>

    <div class="login-container">
        <div class="video-character-box">
            <video autoplay muted loop class="inner-video">
                <source src="login1.mp4" type="video/mp4">
            </video>
        </div>

        <div class="login-header">
            <h2>LOGIN PREMIUM</h2>
            <p>LIMITED EDITION ACCESS</p>
        </div>

       <form action="proses.php" method="POST">
            <div class="input-group">
                <input type="text" name="username" placeholder="username" required>
            </div>
            
            <div class="input-group">
                <input type="password" name="password" placeholder="password" required>
            </div>

            <button type="submit" class="btn-login">Login</button>
        </form>

        <div class="footer-links">
            <a href="#">Lupa Password? <span class="cyan-text">Klik Disini</span></a>
        </div>
    </div>

</body>
</html>
