// keranjang.js: mengelola keranjang belanja di localStorage. 
// CATATAN: harga di sini hanya untuk tampilan. Server (checkout) yang 
// menentukan harga sesungguhnya -- localStorage tidak dipercaya. 
 
const KUNCI_KERANJANG = "kopi-nusantara-keranjang"; 
 
function ambilKeranjang() { 
  const data = localStorage.getItem(KUNCI_KERANJANG); 
  return data ? JSON.parse(data) : []; 
} 
 
function simpanKeranjang(keranjang) { 
  localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang)); 
} 
 
function tambahKeKeranjang(produk) { 
  const keranjang = ambilKeranjang(); 
  const ada = keranjang.find(function (item) { 
    return item.produk_id === produk.produk_id; 
  }); 
 
  if (ada) { 
    ada.jumlah += 1; 
  } else { 
    keranjang.push({ 
      produk_id: produk.produk_id, 
      slug: produk.slug, 
      nama: produk.nama, 
      harga: produk.harga, 
      jumlah: 1, 
    }); 
  } 
 
  simpanKeranjang(keranjang); 
  perbaruiBadgeKeranjang(); 
} 
 
function ubahJumlah(produkId, delta) { 
  const keranjang = ambilKeranjang(); 
  const item = keranjang.find(function (i) { 
    return i.produk_id === produkId; 
  }); 
  if (!item) return; 
 
  item.jumlah += delta; 
 
  const keranjangBaru = item.jumlah <= 0 
    ? keranjang.filter(function (i) { return i.produk_id !== produkId; }) 
    : keranjang; 
 
  simpanKeranjang(keranjangBaru); 
  renderKeranjang(); 
  perbaruiBadgeKeranjang(); 
} 
 
function hapusDariKeranjang(produkId) { 
  const keranjang = ambilKeranjang().filter(function (i) { 
    return i.produk_id !== produkId; 
  }); 
  simpanKeranjang(keranjang); 
  renderKeranjang(); 
  perbaruiBadgeKeranjang(); 
} 
 
function hitungTotalKeranjang() { 
  return ambilKeranjang().reduce(function (total, item) { 
    return total + item.harga * item.jumlah; 
  }, 0); 
} 
 
function perbaruiBadgeKeranjang() { 
  const badge = document.getElementById("badge-keranjang"); 
  if (!badge) return; 
 
  const jumlahItem = ambilKeranjang().reduce(function (t, i) { 
    return t + i.jumlah; 
  }, 0); 
 
  badge.textContent = jumlahItem; 
  badge.hidden = jumlahItem === 0; 
}

function renderKeranjang() { 
  const isiEl = document.getElementById("isi-keranjang"); 
  const totalEl = document.getElementById("total-keranjang"); 
  const keranjang = ambilKeranjang(); 
 
  if (keranjang.length === 0) { 
    isiEl.innerHTML = "<p>Keranjang masih kosong.</p>"; 
    totalEl.textContent = rupiah(0); 
    return; 
  } 
 
  isiEl.innerHTML = keranjang.map(function (item) { 
    return ` 
      <div class="baris-keranjang"> 
        <span>${esc(item.nama)}</span> 
        <button data-aksi="kurang" data-id="${item.produk_id}">-</button> 
        <span>${item.jumlah}</span> 
        <button data-aksi="tambah" data-id="${item.produk_id}">+</button> 
        <span>${rupiah(item.harga * item.jumlah)}</span> 
        <button data-aksi="hapus" data-id="${item.produk_id}">Hapus</button> 
      </div> 
    `; 
  }).join(""); 
 
  totalEl.textContent = rupiah(hitungTotalKeranjang()); 
} 
 
function pasangAksiKeranjang() { 
  document.getElementById("isi-keranjang").addEventListener("click", function (e) { 
    const tombol = e.target.closest("[data-aksi]"); 
    if (!tombol) return; 
 
    const id = Number(tombol.dataset.id); 
    const aksi = tombol.dataset.aksi; 
 
    if (aksi === "tambah") ubahJumlah(id, 1); 
    if (aksi === "kurang") ubahJumlah(id, -1); 
    if (aksi === "hapus") hapusDariKeranjang(id); 
  }); 
} 