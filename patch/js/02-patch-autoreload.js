// patch-autoreload.js

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
    }
    
    const statusCheckout = document.getElementById("status-checkout");
    if (statusCheckout) {
        statusCheckout.textContent = ""; // Menghapus pesan error/loading sebelumnya
    }
};