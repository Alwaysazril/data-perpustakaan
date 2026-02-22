<?php
// Username dan Password yang ditentukan
$user_benar = "azril";
$pass_benar = "123";

// Mengambil data dari form
$username = $_POST['username'];
$password = $_POST['password'];

if ($username == $user_benar && $password == $pass_benar) {
    // Jika benar, masuk ke dashboard
    header("Location: dashboard.php");
} else {
    // Jika salah, balik ke login dan beri pesan
    echo "<script>alert('Akses Ditolak! Username atau Password Salah'); window.location='index.php';</script>";
}
?>
