const produk = { 
  nama: "Kopi Toraja", 
  asal: "Sulawesi Selatan", 
  kategori: "arabika", 
  harga: 85000, 
}; 
 
console.log(produk.nama);    // Kopi Toraja 
produk.harga = 90000;        // mengubah nilai propertil vc,mn bvc.,mn 

const arabika = PRODUCTS.filter(function (p) { 
  return p.kategori === "arabika"; 
}); 
 
const gayo = PRODUCTS.find(function (p) { 
  return p.slug === "gayo"; 
}); 
 
const namaSaja = PRODUCTS.map(function (p) { 
  return p.nama; 
});