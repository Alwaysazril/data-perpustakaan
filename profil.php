<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Azril - Roadmap Pemrograman</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="style_dashboard.css">
    <style>
        .roadmap-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;
        }
        .step-card {
            background: rgba(0, 255, 255, 0.03);
            border: 1px solid rgba(0, 255, 255, 0.2);
            border-radius: 12px;
            padding: 20px;
            position: relative;
            transition: 0.3s;
        }
        .step-card:hover {
            border-color: #00ffff;
            background: rgba(0, 255, 255, 0.08);
        }
        .step-number {
            background: #00ffff;
            color: #000;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-family: 'Orbitron';
            margin-bottom: 15px;
        }
        .step-card h3 { color: #00ffff; font-family: 'Orbitron'; margin-bottom: 10px; }
        .step-card p { font-size: 14px; line-height: 1.6; color: #ccc; }
        
        .quote-box {
            margin-top: 40px;
            padding: 30px;
            text-align: center;
            background: linear-gradient(45deg, rgba(0,255,255,0.1), transparent);
            border-radius: 15px;
            border: 1px solid #00ffff;
        }
        .quote-box i { font-size: 40px; color: #00ffff; margin-bottom: 15px; }
        .quote-text { font-style: italic; font-size: 18px; color: #fff; }
        .quote-author { margin-top: 10px; color: #00ffff; font-weight: bold; }
    </style>
</head>
<body>
    <div class="app-container">
        <nav class="sidebar">
            <div class="logo-section"><i class='bx bxl-visual-studio'></i> <span>AZRIL IN WEBSITE</span></div>
            <ul class="nav-menu">
                <li><a href="dashboard.php"><i class='bx bxs-dashboard'></i> <span>Dashboard</span></a></li>
                <li><a href="profil.php" class="active"><i class='bx bxs-terminal'></i> <span>Profil</span></a></li>
                <li><a href="projects.php"><i class='bx bxs-layer'></i> <span>Projects</span></a></li>
                <li><a href="settings.php"><i class='bx bxs-layer'></i> <span>settings</span></a></li>
                <li><a href="logout.php"><i class='bx bx-log-out'></i> <span>Logout</span></a></li>
            </ul>
        </nav>

        <main class="content-area">
            <header class="main-header">
                <h1>AZRIL <span class="highlight">ROADMAP</span></h1>
                <p>Panduan Step-by-Step Menjadi Developer Mahir</p>
            </header>

            <div class="roadmap-container">
                <div class="step-card">
                    <div class="step-number">01</div>
                    <h3>Pahami Logika Dasar</h3>
                    <p>Sebelum mengetik kode, pahami bagaimana komputer berpikir. Pelajari tentang <b>Algoritma</b> dan <b>Flowchart</b>. Ini adalah fondasi untuk memecahkan masalah dengan coding.</p>
                </div>

                <div class="step-card">
                    <div class="step-number">02</div>
                    <h3>Pilih Satu Bahasa Utama</h3>
                    <p>Fokuslah pada satu bahasa terlebih dahulu. Azril menyarankan <b>HTML/CSS</b> untuk web, atau <b>Python</b> untuk logika umum. Jangan berpindah-pindah bahasa sebelum kamu paham konsep dasarnya.</p>
                </div>

                <div class="step-card">
                    <div class="step-number">03</div>
                    <h3>Pelajari Struktur Data & Variabel</h3>
                    <p>Belajar cara menyimpan informasi menggunakan <b>Variabel</b>, <b>Array</b>, dan <b>Object</b>. Pahami juga fungsi <b>Looping</b> (pengulangan) dan <b>Conditional</b> (if/else).</p>
                </div>

                <div class="step-card">
                    <div class="step-number">04</div>
                    <h3>Bangun Project Kecil</h3>
                    <p>Praktek adalah kunci. Buatlah project sederhana seperti Kalkulator, Daftar Tugas (To-Do List), atau Website Profil pribadi. Project nyata akan mengasah insting coding-mu.</p>
                </div>

                <div class="step-card">
                    <div class="step-number">05</div>
                    <h3>Konsistensi & Komunitas</h3>
                    <p>Dunia IT terus berubah. Bergabunglah dengan komunitas, baca dokumentasi, dan jangan pernah berhenti belajar. Coding adalah maraton, bukan sprint.</p>
                </div>
            </div>

            <div class="quote-box">
                <i class='bx bxs-quote-alt-left'></i>
                <div class="quote-text">
                    "Setiap programmer ahli awalnya adalah seorang pemula yang tidak menyerah saat kodenya error. Error bukan tanda kamu gagal, tapi tanda kamu sedang belajar hal baru."
                </div>
                <div class="quote-author">- Azril CORE OS</div>
            </div>
        </main>
    </div>
</body>
</html>
