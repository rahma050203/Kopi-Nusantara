// Fungsi dengan parameter dan nilai kembalian 
function hitungTotal(harga, jumlah) { 
  return harga * jumlah; 
}

// Prosedur: fungsi yang hanya melakukan sesuatu, tanpa return 
function tampilkanSapaan(nama) { 
  console.log("Halo, " + nama + "!"); 
} 
 
const total = hitungTotal(85000, 2);   // total bernilai 170000 
tampilkanSapaan("Rahma");              // mencetak: Halo, Rahma! 