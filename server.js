const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Path file database
const dataFile = path.resolve(__dirname, 'data_peminjaman.txt');

// Inisialisasi file agar header rapi sejak awal
const inisialisasiData = () => {
    if (!fs.existsSync(dataFile)) {
        const header = "PEMINJAM       | JUDUL BUKU           | NO. BUKU   | ID BUKU | PENERBIT   | TAHUN     | KURIKULUM\n" +
                       "----------------------------------------------------------------------------------------------------\n";
        fs.writeFileSync(dataFile, header, 'utf8');
    }
};

// --- HALAMAN UTAMA (INPUT) ---
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Azril Perpus</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: sans-serif; background: #1a1a2f; color: white; padding: 20px; margin: 0; }
        .container { max-width: 400px; margin: auto; background: rgba(255,255,255,0.1); padding: 25px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        h2 { text-align: center; color: #00c6ff; }
        input { width: 100%; padding: 12px; margin: 6px 0; border-radius: 8px; border: none; box-sizing: border-box; background: #eee; }
        button { width: 100%; padding: 15px; background: #2ecc71; color: white; border: none; border-radius: 10px; font-weight: bold; margin-top: 15px; cursor: pointer; transition: 0.3s; }
        button:hover { background: #27ae60; }
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

// --- LIHAT DATA (TAMPILAN MONOSPACE) ---
app.get('/cek-data', (req, res) => {
    inisialisasiData();
    const log = fs.readFileSync(dataFile, 'utf8');
    res.send(`
    <body style="background:#1a1a2f; color:#00ff00; padding:15px; font-family:sans-serif;">
        <h2 style="color:white; text-align:center;">📋 DATA PEMINJAMAN</h2>
        <div style="background:black; padding:15px; border-radius:10px; overflow-x:auto; border: 1px solid #333;">
            <pre style="font-size:10px; font-family:'Courier New', monospace; white-space:pre; margin:0;">${log}</pre>
        </div>
        <hr style="border:0; border-top:1px solid #444; margin:20px 0;">
        <a href="/" style="color:white; text-decoration:none; background:#444; padding:12px 20px; border-radius:8px; display:inline-block;">⬅ KEMBALI</a>
    </body>`);
});

// --- TAMBAH DATA (LOGIKA PERAPI KOLOM) ---
app.post('/tambah', (req, res) => {
    inisialisasiData();
    const d = req.body;
    
    [span_1](start_span)// padEnd memastikan setiap kolom memiliki lebar karakter yang sama[span_1](end_span)
    const baris = (d.namaPeminjam || '').toUpperCase().substring(0, 14).padEnd(14) + " | " + 
                  (d.judulBuku || '').toUpperCase().substring(0, 20).padEnd(20) + " | " + 
                  (d.nomorBuku || '').substring(0, 10).padEnd(10) + " | " + 
                  (d.idBuku || '').substring(0, 7).padEnd(7) + " | " + 
                  (d.penerbit || '').toUpperCase().substring(0, 10).padEnd(10) + " | " + 
                  (d.tahunTerbit || '').substring(0, 9).padEnd(9) + " | " + 
                  (d.kurikulum || '').toUpperCase() + "\n";
                  
    fs.appendFileSync(dataFile, baris, 'utf8');
    res.redirect('/cek-data');
});

// --- CARI DATA ---
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
        <h2 style="color:#00c6ff;">🔍 HASIL PENCARIAN</h2>
        <div style="background:black; padding:15px; border-radius:10px; overflow-x:auto;">
            <pre style="color:#00ff00; font-size:10px; font-family:'Courier New', monospace; margin:0;">${hasil}</pre>
        </div>
        <br>
        <a href="/" style="color:#aaa; text-decoration:none;">⬅ KEMBALI</a>
    </body>`);
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server aktif di port: " + port);
});
