# 📚 Aplikasi Manajemen Tugas Mahasiswa

Aplikasi **Manajemen Tugas Mahasiswa** merupakan aplikasi berbasis web yang digunakan untuk membantu mahasiswa dalam mengelola aktivitas akademik seperti mencatat, mengedit, menandai selesai, dan menghapus tugas.  
Seluruh data disimpan secara **lokal di browser** menggunakan `localStorage`, sehingga tetap tersimpan meskipun halaman ditutup atau direfresh.  

---

## 🧩 Fitur Aplikasi

- ✍️ Menambahkan tugas baru (nama tugas, mata kuliah, deadline)  
- ✏️ Mengedit tugas yang sudah ada  
- ✅ Menandai tugas sebagai selesai atau belum selesai  
- ❌ Menghapus tugas yang tidak diperlukan  
- 🔍 Filter tugas berdasarkan status atau mata kuliah  
- 📅 Pencarian tugas berdasarkan nama atau mata kuliah  
- 🧮 Menampilkan jumlah tugas yang belum selesai  
- 💾 Penyimpanan data secara lokal (localStorage)  
- 🛡️ Validasi form input (tidak boleh kosong dan deadline valid)

---

## 🖼️ Screenshot Aplikasi

| Tampilan | Deskripsi |
|-----------|------------|
| ![Screenshot 1](https://github.com/user-attachments/assets/1996bacf-0bfc-4db0-a50a-899ecd1e641d) | Form tambah tugas dengan validasi input |
| ![Screenshot 2](https://github.com/user-attachments/assets/44732057-3deb-4a2b-a391-311f042ee8e3) | Daftar tugas dengan status dan filter |
| ![Screenshot 3](https://github.com/user-attachments/assets/c5bc550f-57ab-43f2-9186-e6d49d976a69) | Form edit tugas dan ubah status selesai/belum |

---

## 🚀 Cara Menjalankan Aplikasi

1. Unduh semua file berikut dan simpan dalam satu folder:  
   - `index.html`  
   - `styles.css`  
   - `app.js`  
2. Buka file `index.html` menggunakan browser (Chrome, Edge, Firefox, dll).  
3. Aplikasi akan langsung berjalan tanpa instalasi tambahan.  
4. Semua data tugas akan otomatis tersimpan di **localStorage** browser.

---

## ⚙️ Daftar Fitur yang Telah Diimplementasikan

| No | Fitur | Status |
|----|--------|--------|
| 1 | Tambah tugas baru | ✅ |
| 2 | Edit tugas | ✅ |
| 3 | Hapus tugas | ✅ |
| 4 | Tandai selesai/belum selesai | ✅ |
| 5 | Filter dan pencarian tugas | ✅ |
| 6 | Hitung jumlah tugas belum selesai | ✅ |
| 7 | Validasi form input | ✅ |
| 8 | Penyimpanan data di localStorage | ✅ |

---

## 🧠 Penjelasan Teknis

### 🗃️ Penggunaan `localStorage`
Aplikasi ini menyimpan data tugas menggunakan `localStorage`, yang merupakan fitur bawaan browser untuk penyimpanan lokal tanpa server.

- **Menyimpan data:**
    ```javascript
    localStorage.setItem('tasks', JSON.stringify(arrayTasks));
- **Mengambil Data:**
    ```javacript
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
- **Validasi Form:**
    ```javascript
    if(!name){ errName.textContent = 'Nama tugas tidak boleh kosong.'; ok = false; }
    if(!course){ errCourse.textContent = 'Mata kuliah tidak boleh kosong.'; ok = false; }
    const d = new Date(deadline + 'T00:00:00');
    if(!deadline || Number.isNaN(d.getTime())){
    errDeadline.textContent = 'Deadline harus tanggal yang valid.'; ok = false;
    }
