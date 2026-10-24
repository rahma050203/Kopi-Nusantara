# Penggunaan Fitur Mailpit di Laragon

`Mailpit` di `Laragon` adalah alat pengujian email (*`email testing tool`*) dengan `metode Fetch API` dan `server SMTP palsu` (*fake SMTP server*) yang berfungsi untuk menangkap semua email keluar dari aplikasi lokal (seperti Laravel, WordPress, atau PHP biasa) agar tidak benar-benar terkirim ke internet, sehingga kita bisa memastikan form atau elemen kita berfungsi dengan baik.  

Berikut adalah panduan penggunaan fitur `Mailpit` di `Laragon`:

> Untuk mode **Advanced**, kita menggunakan terminal.
> Sedangkan mode **Beginner**, kita menggunakan ekstensi **LiteClient** atau **PostMan** pada VSCode yaa Tim...

### A. Perintah ngecek `Mailpit` dah jalan belum?
```bash
curl -i http://localhost:8025/api/v1/info
```
Output-nya:
```bash
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self'; script-src 'nonce-Xs9GCTWKUozBG2WMGYxTc4'; style-src * 'unsafe-inline'; frame-src 'self'; img-src * data: blob:; font-src * data:; media-src 'self'; connect-src 'self' ws: wss:; object-src 'none'; base-uri 'self';
Content-Type: application/json
Referrer-Policy: no-referrer
Date: Wed, 14 Oct 2026 13:08:46 GMT
Content-Length: 335

{"Version":"v1.22.3","LatestVersion":"v1.31.5","Database":"C:\\Users\\Ompom\\AppData\\Local\\Temp/mailpit-1791982542630934900.db","DatabaseSize":94208,"Messages":2,"Unread":1,"Tags":{},"RuntimeStats":{"Uptime":783.1839838,"Memory":26275840,"MessagesDeleted":0,"SMTPAccepted":2,"SMTPAcceptedSize":585,"SMTPRejected":0,"SMTPIgnored":0}}
```
### B. Coba ngirim Pesan *Dummy*
Begini caranya Guys:  

**Cara Advanced**
```bash
curl -i -X POST http://localhost:8025/api/v1/send -H "Content-Type: text/plain" -d "{\"From\":{\"Email\":\"nama_peserta@email.com\",\"Name\":\"Nama Peserta\"},\"To\":[{\"Email\":\"halo@kopi-nusantara.test\"}],\"Subject\":\"Kirim Pesan ke Email Mode Advanced\",\"Text\":\"Halo Admin...\"}"
```
>😂 Sulit ya guys -- sebab banyak backslashnya (*JSON Escaping*), jadi mending pake cara Beginner saja.

**Cara Beginner**
Wajib instal ekstensi **LiteClient** (kita pake ini saja, gak ribet) atau **PostMan** yaa Tim...
1. **Buka LiteClient dan Atur Request Bar:** Method & URL.
Buka panel **LiteClient** di VSCode:

* Pilih method HTTP menjadi **POST** di *dropdown*.
* Masukkan URL berikut di kolom alamat:

`http://localhost:8025/api/v1/send`

*Verifikasi:* Method menampilkan warna POST dan URL tidak terpotong.


2. **Set Header Content-Type:** Tab Headers.
Klik tab **Headers**, lalu tambahkan baris key-value baru:

* **Key / Name:** `Content-Type`
* **Value:** `application/json`

*(Catatan: Endpoint `/api/v1/send` Mailpit menerima format payload JSON, gunakan `application/json` agar dibaca dengan benar).*

*Verifikasi:* Checklist di sebelah header `Content-Type` dalam keadaan aktif (tercentang).

3. **Masukkan Body JSON:** Tab Body.
Pindah ke tab **Body**:

* Pilih tipe body ke **JSON** (atau **raw** lalu set language ke JSON).
* Tempel teks payload tanpa escape backslash berikut:

```json
{
  "From": {
    "Email": "nama_peserta@email.com",
    "Name": "Nama Peserta"
  },
  "To": [
    {
      "Email": "halo@kopi-nusantara.test"
    }
  ],
  "Subject": "Tes Kirim Pesan",
  "Text": "Halo Admin Web..."
}
```
*Verifikasi:* Tidak ada garis bawah merah (syntax error) di editor JSON LiteClient.


4. **Kirim Request dan Cek Hasil:** Send & Mailpit Web UI.
Klik tombol **Send** di LiteClient:

* LiteClient akan mengembalikan status response `200 OK` dengan ID pesan.
* Buka browser dan akses Web UI Mailpit di `http://localhost:8025`.

*Verifikasi:* Email dengan subjek **Tes Kirim Pesan** dari **Nama Peserta** muncul di daftar inbox Mailpit.

### C. Cek Email yang Masuk (Advanced)
```bash
curl -i http://localhost:8025/api/v1/messages
```
> Bonus Lecture: Penggunaan Fitur Mailpit di Laragon.