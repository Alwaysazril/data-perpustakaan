const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Path file yang pasti terbaca di Railway maupun Termux
const dataFile = path.resolve(__dirname, 'data_peminjaman.txt');

// Fungsi inisialisasi file agar tidak error saat pertama kali dijalankan
const inisialisasiData = () => {
    if (!fs.existsSync(dataFile)) {
        const header = "PEMINJAM       | JUDUL BUKU           | NO. BUKU   | ID BUKU | PENERBIT   | TAHUN     | KURIKULUM\n" +
                       "----------------------------------------------------------------------------------------------------\n";
        fs.writeFileSync(dataFile, header, 'utf8');
    }
};

// --- HALAMAN UTAMA ---
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Azril Perpus</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: sans-serif; background: #1a1a2f; color: white; padding: 20px; margin: 0; }
        .container { max-width: 400px; margin: auto; background: rgba(255,255,255,0.1); padding: 25px; border-radius: 20px; }
        h2 { text-align: center; color: #00c6ff; }
        input { width: 100%; padding: 12px; margin: 6px 0; border-radius: 8px; border: none; box-sizing: border-box; }
        button { width: 100%; padding: 15px; background: #2ecc71; color: white; border: none; border-radius: 10px; font-weight: bold; margin-top: 15px; cursor: pointer; }
        .menu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .btn-nav { text-align: center; color: #fff; text-decoration: none; font-size: 12px; background: #444; padding: 10px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>📚 INPUT DATA</h2>
        <form action="/tambah" method="POST">
            <input type="text" name="namaPeminjam" placeholder="Nama Peminjam" required>
            <input type="text" name="judulBuku" placeholder="Judul Buku" required>
            <input type="text" name="nomorBuku" placeholder="Nomor Buku">
            <input type="text" name="idBuku" placeholder="ID Buku">
            <input type="text" name="penerbit" placeholder="Penerbit">
            <input type="text" name="tahunTerbit" placeholder="Tahun Terbit">
            <input type="text" name="kurikulum" placeholder="Kurikulum">
            <button type="submit">SIMPAN DATA</button>
        </form>
        <div class="menu-grid">
            <a href="/cek-data" class="btn-nav">📋 LIHAT DATA</a>
            <a href="/cari" class="btn-nav">🔍 CARI DATA</a>
        </div>
    </div>
</body>
</html>`);
});

// --- FITUR CARI ---
app.get('/cari', (req, res) => {
    const query = (req.query.q || '').toUpperCase();
    inisialisasiData();
    const content = fs.readFileSync(dataFile, 'utf8');
    const lines = content.split('\n');
    const header = lines.slice(0, 2).join('\n');
    const filtered = lines.slice(2).filter(line => line.includes(query) && line.trim() !== "");
    
    let hasil = filtered.length > 0 ? header + "\n" + filtered.join('\n') : "Data tidak ditemukan.";
    
    res.send(`
    <body style="background:#1a1a2f; color:white; font-family:sans-serif; padding:20px;">
        <div style="max-width:400px; margin:auto;">
            <h2 style="color:#00c6ff;">🔍 HASIL CARI</h2>
            <form action="/cari" method="GET">
                <input type="text" name="q" placeholder="Cari..." style="width:100%; padding:10px; margin-bottom:10px;">
                <button style="width:100%; padding:10px; background:#00c6ff; border:none; color:white;">CARI</button>
            </form>
            <pre style="background:#000; color:#00ff00; padding:10px; font-size:9px; overflow:auto; margin-top:20px;">${hasil}</pre>
            <a href="/" style="display:block; text-align:center; margin-top:20px; color:#aaa;">⬅ KEMBALI</a>
        </div>
    </body>`);
});

// --- CEK DATA ---
app.get('/cek-data', (req, res) => {
    inisialisasiData();
    const log = fs.readFileSync(dataFile, 'utf8');
    res.send(`<body style="background:#1a1a2f; color:#00ff00; padding:15px; font-family:monospace;"><pre style="font-size:9px;">${log}</pre><hr><a href="/" style="color:white; text-decoration:none; background:#444; padding:10px; border-radius:5px;">⬅ KEMBALI</a></body>`);
});

// --- TAMBAH DATA ---
app.post('/tambah', (req, res) => {
    inisialisasiData();
    const d = req.body;
    const baris = (d.namaPeminjam || '').toUpperCase().padEnd(14) + " | " + 
                  (d.judulBuku || '').toUpperCase().padEnd(20) + " | " + 
                  (d.nomorBuku || '').padEnd(10) + " | " + 
                  (d.idBuku || '').padEnd(7) + " | " + 
                  (d.penerbit || '').toUpperCase().padEnd(10) + " | " + 
                  (d.tahunTerbit || '').padEnd(9) + " | " + 
                  (d.kurikulum || '').toUpperCase() + "\n";
    fs.appendFileSync(dataFile, baris);
    res.redirect('/cek-data');
});

// Jalankan Server
app.listen(port, "0.0.0.0", () => {
    console.log("================================");
    console.log("SERVER AZRIL PERPUS ACTIVE");
    console.log("PORT: " + port);
    console.log("================================");
});
