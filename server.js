const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const dataFile = path.resolve(__dirname, 'data_peminjaman.txt');

const inisialisasiData = () => {
    if (!fs.existsSync(dataFile)) {
        const header = "PEMINJAM       | JUDUL BUKU           | NO. BUKU   | ID BUKU | PENERBIT   | TAHUN     | KURIKULUM\n" +
                       "----------------------------------------------------------------------------------------------------\n";
        fs.writeFileSync(dataFile, header, 'utf8');
    }
};

// --- HALAMAN UTAMA ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- FITUR: DATA UNTUK DISPLAY (Dibutuhkan index.html) ---
app.get('/data', (req, res) => {
    inisialisasiData();
    const content = fs.readFileSync(dataFile, 'utf8');
    res.send(content);
});

// --- FITUR LAMA: CARI DATA ---
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
            <a href="/" style="display:block; text-align:center; margin-top:20px; color:#aaa;">🔙 KEMBALI</a>
        </div>
    </body>`);
});

// --- FITUR LAMA: CEK DATA (Versi Full Screen) ---
app.get('/cek-data', (req, res) => {
    inisialisasiData();
    const log = fs.readFileSync(dataFile, 'utf8');
    res.send(`<body style="background:#1a1a2f; color:#00ff00; padding:15px; font-family:monospace;"><pre style="font-size:9px;">${log}</pre><hr><a href="/" style="color:white; text-decoration:none; background:#444; padding:10px; border-radius:5px;">🔙 KEMBALI</a></body>`);
});

// --- FITUR: SIMPAN DATA (DISINKRONKAN) ---
app.post('/pinjam', (req, res) => {
    inisialisasiData();
    const d = req.body;

    // Nama variabel (d.nama, d.buku, dll) disesuaikan agar cocok dengan index.html
    const nama      = (d.nama || '').toUpperCase().substring(0, 14).padEnd(14);
    const judul     = (d.buku || '').toUpperCase().substring(0, 20).padEnd(20);
    const noBuku    = (d.no_buku || '').substring(0, 10).padEnd(10);
    const idBuku    = (d.id_buku || '').substring(0, 7).padEnd(7);
    const penerbit  = (d.penerbit || '').toUpperCase().substring(0, 10).padEnd(10);
    const tahun     = (d.tahun || '').substring(0, 9).padEnd(9);
    const kurikulum = (d.kurikulum || '').toUpperCase();

    const baris = `${nama} | ${judul} | ${noBuku} | ${idBuku} | ${penerbit} | ${tahun} | ${kurikulum}\n`;

    fs.appendFileSync(dataFile, baris);
    res.redirect('/');
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server Perpus Aktif di Port " + port);
});
