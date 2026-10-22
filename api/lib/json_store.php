<?php
// json_store.php: fungsi terpusat untuk membaca dan menulis berkas JSON. 
// Dipakai oleh SELURUH endpoint di Bagian B2 -- satu tempat, satu kebenaran. 
 
function bacaJson(string $path): array { 
    if (!file_exists($path)) { 
        return [];   // berkas belum ada dianggap "data kosong", bukan galat 
    } 
    $teks = file_get_contents($path); 
    $data = json_decode($teks, true); 
    return $data ?? [];   // jika isi berkas rusak/bukan JSON valid, tetap kembalikan array kosong 
} 
 
function tulisJson(string $path, array $data): bool { 
    $teks = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES); 
    // LOCK_EX: kunci berkas selama proses penulisan berlangsung, mencegah 
    // dua proses menulis ke berkas yang sama secara bersamaan. 
    return file_put_contents($path, $teks, LOCK_EX) !== false; 
} 