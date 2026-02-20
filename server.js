const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const dataFile = path.resolve(__dirname, 'data_peminjaman.txt');

// --- FUNGSI PENDUKUNG ---

// Penyelaras kolom agar lurus (Monospace Alignment)
const pad = (str, len) => {
    let s = (str || "").toString().toUpperCase();
    if (s.length > len) return s.substring(0, len);
    return s + " ".repeat(len - s.length);
};

const inisialisasiData = () => {
    if (!fs.existsSync(dataFile) || fs.readFileSync(dataFile, 'utf8').trim() === "") {
        const h = pad("PEMINJAM", 15) + " | " + pad("JUDUL BUKU", 20) + " | " + pad("NO. BUKU", 12) + " | " + pad("ID BUKU", 8) + " | " + pad("PENERBIT", 12) + " | " + pad("TAHUN", 10) + " | " + "KURIKULUM\n";
        const l = "-".repeat(105) + "\n";
        fs.writeFileSync(dataFile, h + l, 'utf8');
    }
};

// TEMPLATE UI UNTUK CEK DATA & CARI DATA (Agar Identik)
const templateHasil = (judul, data) => `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { 
                background: #1a1a2f; 
                color: white; 
                font-family: sans-serif; 
                display: flex; 
                justify-content: center; 
                padding: 20px; 
                margin: 0; 
            }
            .wrapper { 
                width: 100%; 
                max-width: 950px; 
                text-align: center; 
            }
            h2 { 
                color: #00d4ff; 
                text-transform: uppercase; 
                font-size: 18px; 
                margin-bottom: 20px;
                letter-spacing: 1px;
            }
            .nav-container {
                text-align: left;
                margin-bottom: 15px;
            }
            .btn-back { 
                display: inline-block; 
                background: #3d3d5c; 
                color: white; 
                padding: 10px 20px; 
                text-decoration: none; 
                border-radius: 8px; 
                font-size: 12px; 
                font-weight: bold; 
                border: 1px solid #444;
                transition: 0.3s;
            }
            .btn-back:hover { background: #4e4e7a; }
            .db-box { 
                background: #000; 
                padding: 15px; 
                border-radius: 12px; 
                border: 1px solid #333; 
                overflow-x: auto; 
                text-align: left; 
                box-shadow: 0 5px 15px rgba(0,0,0,0.5);
            }
            pre { 
                color: #00ff00; 
                font-family: 'Courier New', monospace; 
                font-size: 11px; 
                margin: 0; 
                white-space: pre; 
                line-height: 1.6;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <h2>${judul}</h2>
            <div class="nav-container">
                <a href="/" class="btn-back">← KEMBALI KE BERANDA</a>
            </div>
            <div class="db-box">
                <pre>${data}</pre>
            </div>
        </div>
    </body>
    </html>
`;

// --- ROUTES ---

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/halaman-cari', (req, res) => res.sendFile(path.join(__dirname, 'cari.html')));

// Route Lihat Data (Menggunakan Template)
app.get('/cek-data', (req, res) => {
    inisialisasiData();
    const content = fs.readFileSync(dataFile, 'utf8');
    res.send(templateHasil("📋 DATABASE PEMINJAMAN BUKU", content));
});

// Route Preview untuk index.html (Data mentah)
app.get('/data-raw', (req, res) => {
    inisialisasiData();
    res.setHeader('Content-Type', 'text/plain');
    res.send(fs.readFileSync(dataFile, 'utf8'));
});

app.post('/pinjam', (req, res) => {
    inisialisasiData();
    const d = req.body;
    const baris = pad(d.nama, 15) + " | " + pad(d.buku, 20) + " | " + pad(d.no_buku, 12) + " | " + pad(d.id_buku, 8) + " | " + pad(d.penerbit, 12) + " | " + pad(d.tahun, 10) + " | " + (d.kurikulum || "").toUpperCase() + "\n";
    fs.appendFileSync(dataFile, baris);
    res.redirect('/');
});

// Route Hasil Cari (Menggunakan Template yang Sama)
app.get('/cari', (req, res) => {
    const q = (req.query.q || '').toUpperCase();
    inisialisasiData();
    const lines = fs.readFileSync(dataFile, 'utf8').split('\n');
    const header = lines.slice(0, 2).join('\n');
    const results = lines.filter(l => l.includes('|') && l.toUpperCase().includes(q) && !l.includes('PEMINJAM'));
    
    const hasilFinal = results.length > 0 ? header + "\n" + results.join('\n') : "DATA TIDAK DITEMUKAN.";
    res.send(templateHasil("🔍 HASIL PENCARIAN DATA", hasilFinal));
});

app.listen(port, "0.0.0.0", () => console.log(`Server aktif di port ${port}`));
