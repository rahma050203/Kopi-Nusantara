
/**
 * 🟢 CDN Style Mode
 * Fungsi utama untuk mencari produk berdasarkan slug yang diinputkan pengguna pada elemen HTML.
 * Menerapkan validasi ketat, sanitasi string (trim & lowercase), serta manajemen DOM interaktif.
 * Demonstrasi Pencarian slug yang ditulis dengan metode "kebab-case".
 */
function cariSlugCDN() {
    // 1. Mengambil referensi elemen DOM dari antarmuka HTML
    const elemenInputSlug = document.getElementById("inputSlugCDN");
    const divHasilCari = document.getElementById("hasilCariCDN");

    // Pengaman sistem jika elemen HTML tidak ditemukan di dokumen aktif
    if (!elemenInputSlug || !divHasilCari) {
        console.error("Elemen DOM target tidak ditemukan pada halaman ini.");
        return;
    }

    // 2. Sanitasi Input: Menghapus spasi ekstra di awal/akhir dan mengubah ke huruf kecil semua.
    const inputSlug = elemenInputSlug.value.trim().toLowerCase();

    // 3. Validasi Kondisional: Mencegah eksekusi jika kolom input kosong
    if (inputSlug === "") {
        divHasilCari.innerHTML = `<span class="error-msg">Silakan masukkan katakunci!</span>`;
        return;
    }

    // 4. Proses Pencarian Data menggunakan metode filter() agar dapat lebih dari satu hasil
    // MODE 1 LOGIKA PENCARIAN dengan FILTER menggunakan Regular Expression `RegExp`.
    /*   const hasilPencarianSlug = PRODUCTS.filter(function (kopi) {
        // Membuat pola untuk mencocokkan kata tunggal di dalam slug (dibatasi oleh tanda hubung atau ujung text)
        const regex = new RegExp(`(^|-)${inputSlug}(-|$)`, 'i');
    
        // Mengembalikan true jika slug sama persis ATAU mengandung kata tunggal tersebut
        return kopi.slug === inputSlug || regex.test(kopi.slug);
      }); */

    // MODE 2 (Simple) LOGIKA PENCARIAN dengan FILTER dan `includes` (telah kita pelajari di latihan/praktik sebelumnya)
    const hasilPencarianSlug = PRODUCTS.filter(function (kopi) {
        return kopi.slug.includes(inputSlug);
    });

    // 5. Render Output Dinamis ke antarmuka HTML berdasarkan ketersediaan data
    if (hasilPencarianSlug.length > 0) {
        let outputHTML = "";
        hasilPencarianSlug.forEach(function (kopi) { //ditampilkan sebagai list/daftar
            outputHTML += `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${kopi.foto}" class="img-fluid rounded-start" alt="${kopi.alt || 'foto produk'}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${kopi.nama}</h5>
                <p class="card-text"><small class="text-body-secondary">${kopi.asal}</small></p>		
                <p class="card-text">${rupiah(kopi.harga)}</p>
                <p class="card-text">${kopi.deskripsi}</p>
              </div>
            </div>
          </div>
        </div>`;
        });
        divHasilCari.innerHTML = outputHTML;
        console.info("Output HTML: ", hasilPencarianSlug.length, "produk ditemukan");
    } else {
        divHasilCari.innerHTML = `<br><span>Maaf, produk dengan kode slug <strong>` + inputSlug + `</strong> tidak ditemukan di dalam direktori penyimpanan.</span>`;
        console.warn("Output HTML: ", inputSlug, "tidak ditemukan");
    }
}
