# 📺 Watchlist Dashboard (Personal Dashboard - ES6+ LocalStorage)

Watchlist Dashboard adalah aplikasi personal berbasis web yang dibuat untuk mengelola daftar hiburan yang quis ditonton seperti **Anime, Film, Series, dan Manga/Manhwa**. Aplikasi ini mengutamakan tampilan profesional yang minimalis dengan nuansa warna bergaya anime modern-ish.

---

## 🎯 Fungsi Utama Aplikasi

Aplikasi ini bertunjuan untuk membantu pengguna mencatat, mengelompokkan, dan menandai status tontonan/bacaan secara terorganisir. Data akan di/sempan automaticamente menggunakan `localStorage`, sehingga tetap tersimpan meskipun halaman ditutup atau direfresh.

---

## ✅ Fitur-Fitur Aplikasi

| Fitur | Deskripsi |
|-------|-----------|
| ➕ Tambah item | Pengguna dapat menambahkan judul lengkap beserta kategori dan prioritas. |
| ✏️ Ubah status | Status item dapat diubah dari **Belum → Selesai** atau sebaliknya. |
| 🗂️ Otomatis prioritas | Daftar diurutkan automaticamente berdasarkan: (1) ✔ Status Belum dulu, lalu Selesai, (2) 🎯 Prioritas Tinggi → Rendah, (3) 🕒 Terbaru. |
| 🗑️ Hapus item | Pengguna dapat menghapus satu item atau secara massal menghapus semua item yang sudah selesai. |
| 🔍 Pencarian real-time | Input search memfilter daftar berdasarkan judul. |
| 💾 Penyimpanan lokal | Semua data disimpan ke `localStorage`. |
| 📱 Responsive | Tampilan responsif dan modern untuk layar desktop maupun mobile. |

---

## 🖼️ Screenshot Aplikasi

| Tampilan | Deskripsi |
|----------|-----------|
| ![Form Tambah](./screenshots/form.png) | Form untuk menambahkan judul dengan kategori dan prioritas |
| ![Daftar Watchlist](./screenshots/list.png) | Tampilan daftar dengan badge kategori & prioritas |
| ![Status Selesai](./screenshots/done.png) | Item selesai otomatis berada di bagian bawah |

---

## 💡 Implementasi ES6+ yang Digunakan

| Fitur ES6+ | Implementasi |
|-----------|--------------|
| `let` & `const` | Digunakan untuk mendeklarasikan variabel sesuai kebutuhan (mutable/immutable). |
| Arrow functions | Digunakan untuk helper seperti `$`, `$$`, `sleep`, event listeners, dan filter data. |
| Template literals | Contoh: integrasi tanggal dalam teks dan isi dinamis pada UI (`\`${fmtDate()}\``). |
| Async/Await | Digunakan dalam proses loading & penyimpanan data (simulasi I/O) di localStorage. |
| Classes | `WatchItem` dan `WatchlistStore` untuk representasi objek dan CRUD data. |
| Spread & Map | Spread operator digunakan untuk membuat array baru saat update item. |
| Optional chaining | Digunakan seperti `$("#btn-reset")?.focus()` untuk keamanan DOM. |

---