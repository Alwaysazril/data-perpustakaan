<?php
// Memulai session
session_start();

// Menghapus semua data session yang ada
session_unset();

// Menghancurkan session
session_destroy();

// Mengarahkan kembali ke halaman login (index.php)
header("Location: index.php");
exit();
?>
