// app.js: Logika tampilan. Data diambil dari data.js

/* Kegiatan Belajar 3.1: JSON dan fetch()
Hari 9, Pagi · 4 JP · UK 1.5 (utama), 1.2, 1.3, dan 1.4 */

// Sebelumnya: SITE, MENU, PRODUCTS berasal dari data.js (sudah tersedia sejak awal)
// Sekarang: diisi setelah fetch() berhasil
let SITE, MENU, PRODUCTS;

/* Langkah 4. Tambahkan fungsi pemuat data tepat di bawahnya: */
async function muatData() {
  const respons = await fetch("data/produk.json");

  if (!respons.ok) {
    throw new Error("Gagal memuat data (HTTP " + respons.status + ")");
  }

  return await respons.json();
}
//logika dan fungsi
async function mulai() {
  const app = document.querySelector(".site-content");
  const isiAsli = app.innerHTML;   // simpan kerangka asli sebelum diganti pesan loading

  app.innerHTML = '<p class="status" role="status">Memuat data...</p>';

  try {
    const data = await muatData();
    SITE = data.site;
    MENU = data.menu;
    PRODUCTS = data.produk;

    app.innerHTML = isiAsli;   // kembalikan kerangka asli (section beranda, produk, kontak)

    // Ambil ulang elemen setelah kerangka dikembalikan
    inisialisasiElemen();
    document.getElementById("tahun").textContent = new Date().getFullYear();
    renderMenu();
    renderFilter();
    renderProduk();
    pasangFilterProduk();
    //pasangEventFormulir();
  } catch (err) {
    app.innerHTML =
      '<div class="status error" role="alert"><strong>Data tidak dapat dimuat.</strong><p>' +
      esc(err.message) +
      '</p><p>Pastikan halaman dibuka lewat server lokal (http://), bukan langsung dari berkas.</p></div>';
    console.error(err);
  }
}

let menuEl, filterEl, jumlahEl, daftarEl, formKontak, statusEl;

function inisialisasiElemen() {
  menuEl = document.getElementById("menu");
  filterEl = document.getElementById("filter-produk");
  jumlahEl = document.getElementById("jumlah-produk");
  daftarEl = document.getElementById("daftar-produk");
  formKontak = document.getElementById("form-kontak");
  statusEl = document.getElementById("form-status");
  inputSlugEl = document.getElementById("inputSlug");
  hasilCariEl = document.getElementById("hasilCari");
}

// --- Fungsi bantu ---
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

/* Langkah B. Render menu. */
// --- MENU ---
function renderMenu() {
  menuEl.innerHTML = MENU.map(function (m) {
    return `<li><a href="#${m.id}">${esc(m.label)}</a></li>`;
  }).join("");
}

/* Langkah C. Render kartu produk */
// --- PRODUK ---
function kartuProduk(p) {
  return `<article class="card">
      <img src="${esc(p.foto)}" alt="${esc(p.alt)}" class="product-photo">
      <h3>${esc(p.nama)}</h3>
      <p class="meta">${esc(p.asal)} &middot; ${esc(p.kategori)}</p>
      <p>${esc(p.deskripsi)}</p>
      <p class="price">${rupiah(p.harga)}</p>
      </article>`;
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

// --- State ---
let filterKategori = "semua";

/* Langkah D. Tombol filter. Tombol dibuat ulang setiap kali state berubah, agar tombol yang aktif ditandai. */
function renderFilter() {
  const kategori = ["semua", "arabika", "robusta"];
  filterEl.innerHTML = kategori.map(function (k) {
    const aktif = k === filterKategori ? "active" : "";
    return `<button class="filter ${aktif}" data-kategori="${k}">${k}</button>`;
  }).join("");
}

// Event delegation: listener dipasang pada induk yang tidak berubah
function pasangFilterProduk() {
  filterEl.addEventListener("click", function (e) {
    const tombol = e.target.closest("[data-kategori]");
    if (!tombol) return;

    filterKategori = tombol.dataset.kategori;
    renderFilter();
    renderProduk();
  });
};


/* Langkah F. Inisialisasi. Letakkan di paling bawah berkas. */
// --- INISIALISASI ---
document.getElementById("tahun").textContent = new Date().getFullYear();

mulai();