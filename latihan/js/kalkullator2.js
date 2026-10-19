//praktik 2: kalkulator belanja

//1. input
const hargaPerBungkus = Number(prompt("harga per bungkus (Rp): "));
const jumlah = Number(prompt("Jumlah bungkus"));

if (isNaN(hargaPerBungkus) || isNaN(jumlah) || hargaPerBungkus <= 0 || jumlah <= 0) { 
alert("Harga dan jumlah harus berupa angka lebih dari 0."); 
} else {
    //2. proses
const total = hargaPerBungkus * jumlah;
let diskon = 0;

if (total>= 200000) {
    diskon = total * 0.1;
}   else if (total>=100000) {
    diskon = total * 0.05;
}

const totalBayar = total - diskon;

// 3. output
console.log(`Total        : Rp ${total.toLocaleString("id-ID")}`);
console.log(`Diskon       : Rp ${diskon.toLocaleString("id-ID")}`);
console.log(`Total Bayar  : Rp ${totalBayar.toLocaleString("id-ID")}`);
alert(`Total Bayar         : Rp ${totalBayar.toLocaleString("id-ID")}`);
    
}


