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

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/halaman-cari', (req, res) => res.sendFile(path.join(__dirname, 'cari.html')));

app.get('/data', (req, res) => {
    inisialisasiData();
    res.send(fs.readFileSync(dataFile, 'utf8'));
});

app.post('/pinjam', (req, res) => {
    inisialisasiData();
    const d = req.body;
    const fmt = (val, len) => (val || '').toUpperCase().substring(0, len).padEnd(len);
    const baris = `${fmt(d.nama, 14)} | ${fmt(d.buku, 20)} | ${fmt(d.no_buku, 10)} | ${fmt(d.id_buku, 7)} | ${fmt(d.penerbit, 10)} | ${fmt(d.tahun, 9)} | ${fmt(d.kurikulum, 10)}\n`;
    fs.appendFileSync(dataFile, baris);
    res.redirect('/');
});

app.get('/cari', (req, res) => {
    const query = (req.query.q || '').toUpperCase();
    inisialisasiData();
    const content = fs.readFileSync(dataFile, 'utf8');
    const lines = content.split('\n');
    const header = "PEMINJAM       | JUDUL BUKU           | NO. BUKU   | ID BUKU | PENERBIT   | TAHUN     | KURIKULUM\n----------------------------------------------------------------------------------------------------\n";
    
    // Mencari data di baris yang memiliki karakter pemisah '|'
    const results = lines.filter(l => l.includes('|') && l.toUpperCase().includes(query));
    const hasilFinal = results.length > 0 ? header + results.join('\n') : "Data tidak ditemukan.";

    res.send(`
        <body style="background:#1a1a2f; color:white; font-family:sans-serif; padding:20px; display:flex; justify-content:center;">
            <div style="width:100%; max-width:500px; text-align:center;">
                <h2 style="color:#00d4ff;">🔍 HASIL PENCARIAN</h2>
                <div style="background:#000; padding:15px; border-radius:10px; text-align:left; overflow-x:auto; border:1px solid #333;">
                    <pre style="color:#00ff00; font-family:monospace; font-size:11px; margin:0;">${hasilFinal}</pre>
                </div>
                <br>
                <a href="/" style="color:#00d4ff; text-decoration:none; font-weight:bold;">[ KEMBALI KE INPUT ]</a>
            </div>
        </body>
    `);
});

app.listen(port, "0.0.0.0", () => console.log("Server Berjalan!"));
