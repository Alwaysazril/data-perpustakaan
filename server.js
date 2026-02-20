const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const dataFile = path.resolve(__dirname, 'data_peminjaman.txt');

// Fungsi utama agar kolom lurus sempurna (Monospace Alignment)
const formatKolom = (teks, lebar) => {
    return (teks || "").toString().toUpperCase().substring(0, lebar).padEnd(lebar);
};

const inisialisasiData = () => {
    if (!fs.existsSync(dataFile) || fs.readFileSync(dataFile, 'utf8').trim() === "") {
        const header = formatKolom("PEMINJAM", 15) + " | " +
                       formatKolom("JUDUL BUKU", 20) + " | " +
                       formatKolom("NO. BUKU", 10) + " | " +
                       formatKolom("ID BUKU", 8) + " | " +
                       formatKolom("PENERBIT", 12) + " | " +
                       formatKolom("THN", 5) + " | " +
                       "KURIKULUM\n" +
                       "-".repeat(95) + "\n";
        fs.writeFileSync(dataFile, header, 'utf8');
    }
};

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/halaman-cari', (req, res) => res.sendFile(path.join(__dirname, 'cari.html')));

app.get('/data', (req, res) => {
    inisialisasiData();
    res.send(fs.readFileSync(dataFile, 'utf8'));
});

app.post('/pinjam', (req, res) => {
    inisialisasiData();
    const d = req.body;
    const baris = formatKolom(d.nama, 15) + " | " +
                  formatKolom(d.buku, 20) + " | " +
                  formatKolom(d.no_buku, 10) + " | " +
                  formatKolom(d.id_buku, 8) + " | " +
                  formatKolom(d.penerbit, 12) + " | " +
                  formatKolom(d.tahun, 5) + " | " +
                  (d.kurikulum || "").toUpperCase() + "\n";
    fs.appendFileSync(dataFile, baris);
    res.redirect('/');
});

app.get('/cari', (req, res) => {
    const query = (req.query.q || '').toUpperCase();
    inisialisasiData();
    const content = fs.readFileSync(dataFile, 'utf8');
    const lines = content.split('\n');
    const header = lines.slice(0, 2).join('\n');
    
    // Cari data hanya pada baris yang memiliki pemisah '|'
    const results = lines.filter(l => l.includes('|') && l.toUpperCase().includes(query) && !l.includes('PEMINJAM'));
    const hasilFinal = results.length > 0 ? header + "\n" + results.join('\n') : "Data tidak ditemukan.";

    res.send(`
        <body style="background:#1a1a2f; color:white; font-family:sans-serif; padding:20px; display:flex; justify-content:center;">
            <div style="width:100%; max-width:850px; text-align:center;">
                <h2 style="color:#00d4ff;">🔍 HASIL PENCARIAN</h2>
                <div style="background:#000; padding:15px; border-radius:10px; text-align:left; overflow-x:auto; border:1px solid #333;">
                    <pre style="color:#00ff00; font-family:'Courier New', monospace; font-size:12px; white-space:pre; margin:0;">${hasilFinal}</pre>
                </div>
                <br><a href="/" style="color:#00d4ff; text-decoration:none; font-weight:bold; font-size:14px;">[ KEMBALI KE BERANDA ]</a>
            </div>
        </body>
    `);
});

app.listen(port, "0.0.0.0", () => console.log("Server Aktif di Port " + port));
