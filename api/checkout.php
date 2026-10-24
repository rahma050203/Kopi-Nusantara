// JANGAN DITIRU — hanya ilustrasi risiko 
{ produk_id: 1, harga: 1, jumlah: 10 }   // harga diubah jadi Rp 1 lewat Console

<?php 
require __DIR__ . "/lib/json_store.php"; 
 
header("Content-Type: application/json"); 
 
$payload = json_decode(file_get_contents("php://input"), true); 
 
if (!$payload || empty($payload["items"])) { 
    http_response_code(400); 
    echo json_encode(["error" => "Data pesanan tidak lengkap."]); 
    exit; 
} 
 
$namaPemesan = trim($payload["nama_pemesan"] ?? ""); 
$kontak      = trim($payload["kontak"] ?? ""); 
$items       = $payload["items"]; 
 
if ($namaPemesan === "" || $kontak === "") { 
    http_response_code(400); 
    echo json_encode(["error" => "Nama dan kontak wajib diisi."]); 
    exit; 
} 
 
$pathProduk    = __DIR__ . "/../data/produk.json"; 
$pathTransaksi = __DIR__ . "/../data/transaksi.json"; 
 
// Kunci produk.json SEPANJANG proses checkout -- dibaca di sini, 
// baru ditulis ulang di akhir (atau tidak sama sekali jika validasi gagal). 
$dataProduk = bukaJsonTerkunci($pathProduk, $handleProduk); 
 
try { 
    $total   = 0; 
    $rincian = []; 
 
    foreach ($items as $item) { 
        $produkId = (int) $item["produk_id"]; 
        $jumlah   = (int) $item["jumlah"]; 
 
        // Cari produk yang cocok di dalam array -- pengganti "WHERE id = ..." 
        $indeks = null; 
        foreach ($dataProduk["produk"] as $i => $p) { 
            if ($p["id"] === $produkId) { $indeks = $i; break; } 
        } 
 
        if ($indeks === null) { 
            throw new Exception("Produk tidak ditemukan."); 
        } 
        if ($jumlah <= 0) { 
            throw new Exception("Jumlah pesanan untuk {$dataProduk['produk'][$indeks]['nama']} 
tidak valid."); 
        } 
        if ($dataProduk["produk"][$indeks]["stok"] < $jumlah) { 
            throw new Exception("Stok {$dataProduk['produk'][$indeks]['nama']} tidak mencukupi 
(tersisa {$dataProduk['produk'][$indeks]['stok']})."); 
        } 
 
        // Harga diambil dari BERKAS, bukan dari data yang dikirim klien. 
        $hargaAsli = (int) $dataProduk["produk"][$indeks]["harga"]; 
        $total += $hargaAsli * $jumlah; 
 
        $rincian[] = [ 
            "indeks"    => $indeks, 
            "produk_id" => $produkId, 
            "jumlah"    => $jumlah, 
            "harga"     => $hargaAsli, 
        ]; 
    } 
 
    // ===== Seluruh item lolos validasi -- BARU di sini mulai menulis ===== 
 
    foreach ($rincian as $r) { 
        $dataProduk["produk"][$r["indeks"]]["stok"] -= $r["jumlah"]; 
    } 
 
    $kodeTransaksi = buatKodeTransaksi(); 
    $dataTransaksi = bukaJsonTerkunci($pathTransaksi, $handleTransaksi); 
 
    $idBaru = 1; 
    foreach ($dataTransaksi as $t) { 
        if ($t["id"] >= $idBaru) $idBaru = $t["id"] + 1; 
    } 
 
    $dataTransaksi[] = [ 
        "id"             => $idBaru, 
        "kode_transaksi" => $kodeTransaksi, 
        "nama_pemesan"   => $namaPemesan, 
        "kontak"         => $kontak, 
        "total"          => $total, 
        "status"         => "baru", 
        "dibuat_pada"    => date("Y-m-d H:i:s"), 
        "items"          => array_map(function ($r) { 
            return [ 
                "produk_id"       => $r["produk_id"], 
                "jumlah"          => $r["jumlah"], 
                "harga_saat_beli" => $r["harga"], 
            ]; 
        }, $rincian), 
    ]; 
 
    tutupJsonTerkunci($handleTransaksi, $dataTransaksi); 
    tutupJsonTerkunci($handleProduk, $dataProduk);   // stok yang sudah berkurang ditulis di sini 
 
    echo json_encode([ 
        "kode_transaksi" => $kodeTransaksi, 
        "total"          => $total, 
    ]); 
} catch (Exception $e) { 
    // Validasi gagal SEBELUM tahap penulisan mana pun -- $dataProduk 
    // belum pernah diubah, jadi cukup lepas kunci tanpa menulis ulang. 
    tutupJsonTerkunci($handleProduk, $dataProduk); 
    http_response_code(400); 
    echo json_encode(["error" => $e->getMessage()]); 
}