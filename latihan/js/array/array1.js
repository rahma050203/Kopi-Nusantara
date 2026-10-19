const kopi = ["Toraja", "Gayo", "Kintamani"]; 
 
console.log(kopi[1]);       // Toraja (indeks pertama = 0) 
console.log(kopi.length);   // 3 (jumlah elemen) 
kopi.push("Bajawa");        // menambah di akhir 
console.log(kopi.includes("Gayo")); // true

for (const jenis of kopi) { 
  console.log(jenis); 
} 
 
kopi.forEach(function (jenis, indeks) { 
  console.log((indeks + 1) + ". " + jenis); 
});

//array dua dimensi
const stok = [ 
  ["Toraja", 20], 
  ["Gayo", 15], 
]; 
console.log(stok[1][0]);   // Gayo (baris ke-1, kolom ke-0) 
console.log(stok[0][1]);   // 20

//pengurutan
const harga = [85000, 60000, 90000, 80000]; 
harga.sort(function (a, b) { 
  return a - b;              // naik (kecil ke besar) 
}); 
console.log(harga);          // [60000, 80000, 85000, 90000]