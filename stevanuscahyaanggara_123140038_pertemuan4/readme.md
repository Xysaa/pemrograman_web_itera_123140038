# 📚 Program Pengelolaan Data Nilai Mahasiswa (Python)

Program ini dibuat untuk mengelola data nilai mahasiswa menggunakan bahasa Python dengan memanfaatkan **struktur data list dan dictionary**, serta dilengkapi berbagai fitur perhitungan dan tampilan data.

---

## ✅ Fitur Utama Program
### 📌 Data Mahasiswa
- Menyimpan data minimal 5 mahasiswa
- Setiap data mencakup:
  - Nama
  - NIM
  - Nilai UTS
  - Nilai UAS
  - Nilai Tugas

### 🧮 Perhitungan Nilai & Grade
- Nilai Akhir dihitung dengan rumus:
30% UTS + 40% UAS + 30% Tugas
- Penentuan Grade:
| Nilai | Grade |
|--------|--------|
| ≥ 80   | A |
| ≥ 70   | B |
| ≥ 60   | C |
| ≥ 50   | D |
| < 50   | E |

### 📊 Fungsionalitas Program
- Menampilkan data dalam format tabel
- Mencari mahasiswa dengan nilai **tertinggi** dan **terendah**
- Menambahkan data mahasiswa baru melalui input
- Filter mahasiswa berdasarkan grade
- Menghitung rata-rata nilai kelas
- Rekap jumlah mahasiswa setiap grade
- Mengurutkan data berdasarkan nilai akhir

---

## 🖥️ Cara Menjalankan Program
1. Pastikan Python sudah terinstall
2. Simpan file program sebagai: main.py

---

## 📁 Struktur Kode Utama
Program menggunakan fungsi-fungsi berikut:

| Fungsi | Keterangan |
|--------|-------------|
| `hitung_nilai_akhir()` | Menghitung nilai akhir mahasiswa |
| `tentukan_grade()` | Menentukan grade berdasarkan nilai akhir |
| `tampilkan_tabel()` | Menampilkan data dalam bentuk tabel |
| `cari_nilai_ekstrem()` | Mencari nilai tertinggi / terendah |
| `tambah_mahasiswa()` | Input mahasiswa baru |
| `filter_berdasarkan_grade()` | Menyaring berdasarkan grade |
| `hitung_rata_rata_kelas()` | Menghitung rata-rata nilai akhir |
| `rekap_grade()` | Menghitung jumlah grade |
| `urutkan_berdasarkan_nilai()` | Mengurutkan data berdasarkan nilai akhir |

---

## 🎯 Tujuan Pembelajaran
Program ini dirancang untuk melatih:
✅ penggunaan list & dictionary  
✅ pembuatan fungsi modular  
✅ logika perhitungan dan kondisi  
✅ input & output interaktif  
✅ formatting tampilan tabel  

---

## 📝 Lisensi
Bebas digunakan untuk pembelajaran dan pengembangan tugas.


