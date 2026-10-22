/*  --- LOGIKA FORMULIR KONTAK --- */
/*
* buat dalam file tersendiri, "kirim_pesan.js" letakkan di dalam
* folder "js"
*/
/* FUNGSI Kirim Pesan | Bagian -- Kontak Kami:
1. Simulasi Kirim Pesan via Email ke MailPit (dengan metode Fetch API) di Laragon.
*/

async function kirimPesanEmail(mailpit) {
    if (mailpit) mailpit.preventDefault();

    const nama = formKontak.nama.value.trim();
    const pesan = formKontak.pesan.value.trim();

    if (nama === "" || pesan === "") {
        statusEl.textContent = "Nama dan pesan wajib diisi.";
        return;
    }

    statusEl.textContent = "Mengirim pesan ke Mailpit...";

    const payload = {
        From: { Email: "pengirim@kopi-nusantara.test", Name: nama },
        To: [{ Email: "halo@kopi-nusantara.test", Name: "Kopi Nusantara" }],
        Subject: "Pesan Kontak dari " + nama,
        Text: pesan
    };

    try {
        // await fetch("http://127.0.0.1/api/v1/send", 
        await fetch("/mailpit-api/api/v1/send",
         {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(payload)
        });

        statusEl.textContent = "Mantap! Pesan dari " + nama + " udah masuk ke Mailpit.";
        formKontak.reset();
    } catch (err) {
        statusEl.textContent = "Gagal kirim email: " + err.message + ". Pastiin Mailpit Laragon aktif (port 8025).";
        console.error(err);
    }
}

/* FUNGSI Kirim Pesan | Bagian -- Kontak Kami:
2. Simulasi Kirim Pesan (mode send text) ke nomor WhatsApp wa.me dari id `formKontak`
*/
function kirimPesanWA(wa) {
    if (wa) wa.preventDefault();

    const namaPengirim = formKontak.nama.value.trim();
    const pesanPengirim = formKontak.pesan.value.trim();

    if (namaPengirim === "" || pesanPengirim === "") {
        statusEl.textContent = "Nama dan pesan wajib diisi.";
        return;
    }

    const nomor = "6281285353231";
    const urlWhatsApp = "https://wa.me/" + nomor + "?text=" + encodeURIComponent("Pesan dari " + namaPengirim + "\n\n" + "Isi Pesan: " + pesanPengirim);
    window.open(urlWhatsApp, "_blank");
}
function pasangEventFormulir() {
    formKontak.addEventListener("submit", kirimPesanWA);
}
