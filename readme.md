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