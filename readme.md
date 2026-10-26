# Kopi Nusantara
Halaman web statis toko biji kopi. Dibuat pada modul kerja1, pelatihan junior web developer, UPTD BLK Provinsi Gorontalo, Batch #5

## Struktur folder
- `index.html` : halaman utama
- `css/style.css` : gaya tampilan
- `img/` : gambar logo

## cara menjalankan
1. salin folder proyek ke dalam folder `www` laragon.
jalankan Laragon (start all)
buka `http://localhost/kopi-nusantara/` di browser

## penulis

echo "# Kopi-Nusantara" >> README.md
echo "# Kopi-Nusantara" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/rahma050203/Kopi-Nusantara.git
git push -u origin main

git remote add origin https://github.com/rahma050203/Kopi-Nusantara.git
git branch -M main
git push -u origin main

## commit pertama"# Kopi-Nusantara" 

## commit pertama
## Bug: H16-B01
1. icon keranjang di nav bar tidak berfungsi
2. pencarian dengan slug tidak ada icon cari sehingga hasilnya tidak bisa ditampilkan

## Bug: H17-B01
1. tidak terhubung server saat checkout
2. sudah ditambahkan key "stok" di produk.json (tetap sama)
3. ada komen diluar php di file checkout.php
4. JSON_Store salah sasaran
5. Tidak PERHATIAN di Modul H16 -- Kode Transaksi ERROR

### Pengamatan
1. link untuk lihat struk : http://kopi-nusantara.test/api/struk.php?kode=KN-9D456A60
2. link untuk unduh struk : http://kopi-nusantara.test/api/struk.php?kode=KN-9D456A60&unduh=1
3. hasil struk :
Kode Transaksi : KN-9D456A60
Struk Kopi Nusantara
Nama Pemesan   : rahma
Kontak         : 08128585935
Tanggal        : 2026-10-24 05:35:25 //? jam tidak sesusai
Produk
Kopi Toraja
Jumlah Harga
Subtotal
2
Kopi Kintamani
1
Rp 85.000
Rp 170.000
Rp 90.000
Rp 90.000
Kopi Bajawa
Mandheling
1
Rp 88.000
Rp 88.000
1
Rp 82.000
Rp 82.000
Total
Rp 430.000

4. subtotal tidak tampil di devtool tapi keluar di struk

## H17 - Kegiatan Belajar 5F.2: Endpoint Checkout dan Penguncian Berkas
**1. BUG-01**
FrontEnd: Tidak dapat terhubung ke server.
DevTools-Console Error: 
```
keranjang.js:147  POST http://kopi-nusantara.test/api/checkout.php 400 (Bad Request)
(anonymous) @ keranjang.js:147

keranjang.js:164 SyntaxError: Unexpected token '<', "<br />
<b>"... is not valid JSON (at VM339:1:1)
(anonymous) @ keranjang.js:164
```
**BUG-FIXED:**
Di produk.json -> cek apakah sudah diisi:
Array produk -> key & value "stok: 20"

**2. BUG-02**
Jam di `transaksi.json` -> item transaksi `dibuat_pada: tidak sesuai` 😇
_Otomatis akan berpengaruh (legacy-bug) pada H18 - Modul-5F.3: Struk PDF dengan FPDF_

**BUG-FIXED:**
1. Buka file `php.ini` di Laragon
2. Cari `date.timezone`
3. Hilangkan semicolon (komen `;` di depannya)
4. isi dengan `date.timezone = Asia/Makassar`

_Catatan: Sesuaikan Wilayah Waktu Anda_

**Pengembangan**
- `Isi KERANJANG`, tidak otomatis tampil / `no-autoreload` (kecuali F5).
- `Lihat Struk` dan `Unduh Struk`, belum berfungsi.

## H18 - Kegiatan Belajar Modul 5F.3: Composer dan FPDF — Struk PDF
**Fitur**
- Penerapan PATCH-01 `autoreload.js` | `patch/01-patch-autoreload.js`
- [Lihat Struk](http://kopi-nusantara.test/api/struk.php?kode=KN-ECEA926A) Sudah berfungsi
- [Unduh Struk](http://kopi-nusantara.test/api/struk.php?kode=KN-ECEA926A&unduh=1) Sudah berfungsi

**BUG**
- H18-001: Aktifitas `Tambah Keranjang` setelah `Checkout` menyembunyikan `Form Checkout` dari `Keranjang Belanja`.

**BUG-FIXED**
- H18-001: Next H19...

**Pengembangan**
- Ubah ukuran kertas Struk agar sesuai dengan POS-Printer (Pelajari Manual FPDF).