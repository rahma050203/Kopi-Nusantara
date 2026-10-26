/*
* File: patch-autoreload.js
* Autoreload Daftar Belanja | Kopi Nusantara v0.1.0
* Author: ompom
* 
* Deksripsi:
* Autoreload Daftar Belanja di dalam Keranjang Belanja pada Aplikasi Web Kopi Nusantara
* Reset form checkhout
* Validasi Hanya Angka di Info Kontak Nomor WhatsApp
* 
* Penggunaan:
* Biar rapi, letakkan di dalam folder "patch/js/patch-autoreload.js"
*  
*/

// 1. Kloning dan amankan fungsi asli dari keranjang.js
const fungsiAsliTambahKeKeranjang = tambahKeKeranjang;

// 2. Timpa fungsi global dengan versi yang sudah dimodifikasi
tambahKeKeranjang = function(produk) {
    // 3. Eksekusi fungsi asli agar localStorage dan badge tetap terbarui
    fungsiAsliTambahKeKeranjang(produk);
    
    // 4. Injeksi: Paksa render ulang elemen HTML keranjang secara instan
    if (typeof renderKeranjang === "function") {
        renderKeranjang();
    }
    
    // 5. Injeksi Tambahan: Pulihkan dan bersihkan form checkout serta statusnya
    const formCheckout = document.getElementById("form-checkout");
    if (formCheckout) {
        formCheckout.hidden = false; // Menampilkan kembali form
        formCheckout.reset();        // Membersihkan isian data lama (nama & kontak)
    }
    
    const statusCheckout = document.getElementById("status-checkout");
    if (statusCheckout) {
        statusCheckout.textContent = ""; // Menghapus pesan error/loading sebelumnya
    }
};

// 6. Injeksi Validasi Form Checkout (Event Delegation)
document.addEventListener("input", function(e) {
    // 7. Cek apakah elemen yang sedang diketik adalah input kontak checkout. Menempelkan pelacak langsung ke level dokumen utama (yang tidak pernah terhapus -- oleh fungsi "fungsi mulai()") dan menyaring elemen targetnya. 
    if (e.target && e.target.matches('#form-checkout input[name="kontak"]')) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
});