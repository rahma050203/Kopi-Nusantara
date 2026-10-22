<?php
// Latihan 2: no 4

require __DIR__ . "/lib/json_store.php";    // Sesuaikan path

header("Content-Type: application/json");   // Set header agar browser tahu ini JSON

$data = bacaJson(__DIR__ . "/../data/produk.json");     // Sesuaikan path

$produk = $data['produk'] ?? [];    // Ambil array produk, jika tidak ada, gunakan array kosong

if (isset($_GET['kategori']) && $_GET['kategori'] !== '') {
    $kategoriDicari = trim($_GET['kategori']);

    $produk = array_filter($produk, function ($item) use ($kategoriDicari) {
        return isset($item['kategori']) && strtolower($item['kategori']) === strtolower($kategoriDicari);
    });

    $produk = array_values($produk);
}

echo json_encode($data);  // Kembalikan data produk dalam format JSON
?>