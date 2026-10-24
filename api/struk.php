<?php 
require __DIR__ . "/../vendor/autoload.php"; 
require __DIR__ . "/lib/json_store.php"; 
 
$kode = $_GET["kode"] ?? ""; 
 
$dataTransaksi = bacaJson(__DIR__ . "/../data/transaksi.json"); 
 
// Cari transaksi yang kode_transaksi-nya cocok -- pengganti "WHERE kode_transaksi = ..." 
$transaksi = null; 
foreach ($dataTransaksi as $t) { 
    if ($t["kode_transaksi"] === $kode) { 
        $transaksi = $t; 
        break; 
    } 
} 
 
if (!$transaksi) { 
    http_response_code(404); 
    die("Transaksi tidak ditemukan."); 
} 
 
$dataProduk = bacaJson(__DIR__ . "/../data/produk.json"); 
 
// Mencari nama produk berdasarkan id -- pengganti "JOIN produk" 
function cariNamaProduk(array $dataProduk, int $produkId): string { 
    foreach ($dataProduk["produk"] as $p) { 
        if ($p["id"] === $produkId) { 
            return $p["nama"]; 
        } 
    } 
    return "(produk tidak ditemukan)"; 
} 
 
// FPDF memakai Latin-1, bukan UTF-8 -- setiap teks dinamis dibungkus fungsi ini. 
function teks(string $s): string { 
    return iconv("UTF-8", "ISO-8859-1//TRANSLIT", $s); 
} 
 
function rupiahPdf(int $angka): string { 
    return "Rp " . number_format($angka, 0, ",", "."); 
} 
 
$pdf = new FPDF(); 
$pdf->AddPage(); 
 
$pdf->SetFont("Arial", "B", 16); 
$pdf->Cell(0, 10, teks("Struk Kopi Nusantara"), 0, 1, "C"); 
$pdf->Ln(4); 
 
$pdf->SetFont("Arial", "", 11); 
$pdf->Cell(0, 7, teks("Kode Transaksi : " . $transaksi["kode_transaksi"]), 0, 1); 
$pdf->Cell(0, 7, teks("Nama Pemesan   : " . $transaksi["nama_pemesan"]), 0, 1); 
$pdf->Cell(0, 7, teks("Kontak         : " . $transaksi["kontak"]), 0, 1); 
$pdf->Cell(0, 7, teks("Tanggal        : " . $transaksi["dibuat_pada"]), 0, 1); 
$pdf->Ln(6); 
 
$pdf->SetFont("Arial", "B", 11); 
$pdf->Cell(90, 8, teks("Produk"), 1); 
$pdf->Cell(25, 8, teks("Jumlah"), 1, 0, "C"); 
$pdf->Cell(35, 8, teks("Harga"), 1, 0, "R"); 
$pdf->Cell(35, 8, teks("Subtotal"), 1, 1, "R"); 
 
$pdf->SetFont("Arial", "", 11); 
foreach ($transaksi["items"] as $d) { 
    $nama     = cariNamaProduk($dataProduk, $d["produk_id"]); 
    $subtotal = $d["harga_saat_beli"] * $d["jumlah"]; 
 
    $pdf->Cell(90, 8, teks($nama), 1); 
    $pdf->Cell(25, 8, (string) $d["jumlah"], 1, 0, "C"); 
    $pdf->Cell(35, 8, teks(rupiahPdf($d["harga_saat_beli"])), 1, 0, "R"); 
    $pdf->Cell(35, 8, teks(rupiahPdf($subtotal)), 1, 1, "R"); 
} 
 
$pdf->SetFont("Arial", "B", 11); 
$pdf->Cell(150, 8, teks("Total"), 1, 0, "R"); 
$pdf->Cell(35, 8, teks(rupiahPdf((int) $transaksi["total"])), 1, 1, "R"); 
 
$namaBerkas = "struk-" . $transaksi["kode_transaksi"] . ".pdf"; 
$dest = isset($_GET["unduh"]) ? "D" : "I"; 
$pdf->Output($dest, $namaBerkas);