<?php
// Versi "ketat": mengunci berkas SEPANJANG proses baca-ubah-tulis, 
// dipakai khusus untuk operasi yang benar-benar tidak boleh tertimpa 
// proses lain (mis. checkout yang mengurangi stok -- lihat Modul 5F).
// json_store.php: fungsi terpusat untuk membaca dan menulis berkas JSON. 
// Dipakai oleh SELURUH endpoint di Bagian B2 -- satu tempat, satu kebenaran. 
 
/* function bacaJson(string $path): array { 
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
    // dua proses menulis ke berkas yang sama secara bersamaan. \
    
    return file_put_contents($path, $teks, LOCK_EX) !== false; 
} */
 
function bukaJsonTerkunci(string $path, &$handle): array { 
    $handle = fopen($path, "c+");   // "c+": buat jika belum ada, boleh baca & tulis 
    flock($handle, LOCK_EX);        // kunci DULU, SEBELUM membaca apa pun 
    $ukuran = filesize($path) ?: 0;
    $teks = $ukuran > 0 ? fread($handle, $ukuran) : ""; 
    $data = $teks !== "" ? json_decode($teks, true) : []; 
    return $data ?? []; 
} 
 
function tutupJsonTerkunci($handle, array $data): void { 
    $teks = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES); 
    rewind($handle); 
    ftruncate($handle, 0);          // kosongkan isi lama sebelum menulis yang baru 
    fwrite($handle, $teks); 
    fflush($handle); 
    flock($handle, LOCK_UN);        // lepas kunci SETELAH selesai menulis 
    fclose($handle); 
} 
