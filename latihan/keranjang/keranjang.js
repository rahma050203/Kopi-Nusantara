// Program keranjang belanja: memakai array objek, perulangan, dan fungsi 
 
const keranjang = [ 
  { nama: "Kopi Toraja", harga: 85000, jumlah: 2 }, 
  { nama: "Kopi Gayo", harga: 80000, jumlah: 1 }, 
  { nama: "Robusta Lampung", harga: 60000, jumlah: 3 }, 
]; 
 
function hitungSubtotal(item) { 
  return item.harga * item.jumlah; 
} 
 
function hitungTotal(daftar) { 
  let total = 0; 
  for (const item of daftar) { 
    total = total + hitungSubtotal(item); 
  } 
  return total; 
} 
 
function formatRupiah(angka) { 
  return "Rp " + angka.toLocaleString("id-ID"); 
} 
 
// Tampilkan rincian 
keranjang.forEach(function (item) { 
  console.log(item.nama + ": " + formatRupiah(hitungSubtotal(item))); 
}); 
console.log("Total: " + formatRupiah(hitungTotal(keranjang))); 