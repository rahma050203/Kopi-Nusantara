// app.js: logika tampilan. Data diambil dari data.js 
 
// ---------- Elemen yang dipakai ---------- 
const menuEl = document.getElementById("menu"); 
const filterEl = document.getElementById("filter-produk"); 
const jumlahEl = document.getElementById("jumlah-produk"); 
const daftarEl = document.getElementById("daftar-produk"); 
const formKontak = document.getElementById("form-kontak"); 
const statusEl = document.getElementById("form-status"); 
 
// ---------- State ---------- 
let filterKategori = "semua"; 
 
// ---------- Fungsi bantu ---------- 
function rupiah(angka) { 
  return "Rp " + angka.toLocaleString("id-ID");
  } 
 
// Mengubah karakter khusus menjadi aman (mencegah XSS) 
function esc(teks) { 
  return String(teks).replace(/[&<>"']/g, function (c) { 
    return { 
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", 
    }[c]; 
  }); 
}
// ---------- Menu ---------- 
function renderMenu() { 
  menuEl.innerHTML = MENU.map(function (m) { 
    return `<li><a href="#${m.id}">${esc(m.label)}</a></li>`; 
  }).join(""); 
}
// ---------- Produk ---------- 
function kartuProduk(p) { 
  return ` 
    <article class="card"> 
    <img src="${esc(p.gambar)}" alt="${esc(p.nama)}" />
      <h3>${esc(p.nama)}</h3> 
      <p class="meta">${esc(p.asal)} &middot; ${esc(p.kategori)}</p> 
      <p>${esc(p.deskripsi)}</p> 
      <p class="price">${rupiah(p.harga)}</p> 
    </article> 
  `; 
} 
 
function renderProduk() { 
  const daftar = filterKategori === "semua" 
    ? PRODUCTS 
    : PRODUCTS.filter(function (p) { 
        return p.kategori === filterKategori; 
      }); 
 
  jumlahEl.textContent = "Menampilkan " + daftar.length + " produk"; 
  daftarEl.innerHTML = daftar.map(kartuProduk).join(""); 
}

function renderFilter() { 
  const kategori = ["semua", "arabika", "robusta"]; 
  filterEl.innerHTML = kategori.map(function (k) { 
    const aktif = k === filterKategori ? "active" : ""; 
    return `<button class="filter ${aktif}" data-kategori="${k}">${k}</button>`; 
  }).join(""); 
} 
 
// Event delegation: listener dipasang pada induk yang tidak berubah 
filterEl.addEventListener("click", function (e) { 
  const tombol = e.target.closest("[data-kategori]"); 
  if (!tombol) return; 
 
  filterKategori = tombol.dataset.kategori; 
  renderFilter(); 
  renderProduk(); 
  renderMenu ();
});
// ---------- Formulir kontak ---------- 
formKontak.addEventListener("submit", function (e) { 
  e.preventDefault();   // cegah halaman dimuat ulang 
 
  const nama = formKontak.nama.value.trim(); 
  const pesan = formKontak.pesan.value.trim(); 
 
  if (nama === "" || pesan === "") { 
    statusEl.textContent = "Nama dan pesan wajib diisi."; 
    return; 
  } 
 
  statusEl.textContent = `Terima kasih, ${nama}! Pesan Anda sudah kami terima.`; 
  formKontak.reset(); 
}); 
// ---------- Inisialisasi ---------- 
document.getElementById("tahun").textContent = new Date().getFullYear(); 
renderMenu(); 
renderFilter(); 
renderProduk(); 