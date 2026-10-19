// tampil di console  developer tools
console.log(("halo kopi Nusantara"))

// tampil di halaman browser
document.write("halo  kopi nusantara")

//variabel, tipe data dan operator
const namaProduk = "kopi gayo";
let stokAwal = 20;

stokAkhir = stokAwal - 1;

//stok-=1

//gabungkan produk dengan sisa stok dan stok
/* ini adalah produk kopi gayo, stok awal adalah 20, dan stok terkini 19 */
console.log(`ini adalah ${namaProduk} , stok awal adalah ${stokAwal}, dan stok terkini ${stokAkhir}`)


console.log(namaProduk)
/* console.log(stok); */
//document.write(stok);

console.log(typeof namaProduk)


//materi 3 menggabungkan teks dengan tanda +
/* 1. dwengan tanda +
2. deng7an template literal (backtik  dan $(...))
 */
const nama = "kopi gayo";
const harga = 8000;

console.log("Produk: " + nama + ", harga: Rp" + harga);
console.log(`Produk: ${nama}, harga: Rp ${harga}`);

//materi 4 input dan output sedehrhana
//const jumlah = Number(prompt("Jumlah bungkus:"));
//console.log(jumlah.toLocaleString("id-ID"));
//alert(jumlah.toLocaleString("id-ID"))

//tugas
const jumlah = Number(prompt("Jumlah Rokok Djisamsoe:"));
alert(`jumlah rokok djisamsoe ${jumlah.toLocaleString("id-ID")} bungkus`)
console.log(`jumlah rokok djisamsoe ${jumlah.toLocaleString("id-ID")} bungkus`)
