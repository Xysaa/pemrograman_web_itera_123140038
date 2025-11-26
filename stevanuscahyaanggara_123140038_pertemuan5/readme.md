# 📚 Sistem Manajemen Perpustakaan Sederhana (Python OOP)

Program ini merupakan contoh implementasi **Object-Oriented Programming (OOP)** dalam Python untuk mengelola item perpustakaan seperti **buku** dan **majalah**. Sistem ini menekankan penggunaan konsep:

✅ **Abstract Class**  
✅ **Inheritance**  
✅ **Encapsulation (private & protected attributes)**  
✅ **Property Decorator**  
✅ **Polymorphism pada method turunan**  

---

## 🎯 Tujuan Program
Program ini dibuat untuk menunjukkan bagaimana OOP dapat digunakan untuk:
- Mengelola koleksi item perpustakaan
- Memberi batasan akses terhadap data melalui encapsulation
- Mewariskan perilaku antar class melalui inheritance
- Mengubah perilaku method melalui polymorphism

---

## ✅ Fitur Utama Sistem

### 📌 Manajemen Item Perpustakaan
- Menambahkan **Book** atau **Magazine**
- Setiap item memiliki:
  - ID
  - Judul
  - Tahun terbit
  - Atribut spesifik (penulis, halaman, edisi, penerbit)

### 🔍 Fitur Pencarian
- Cari item berdasarkan **ID**
- Cari item berdasarkan **judul (contains search)**

### 🧾 Fitur Operasional
- Menampilkan seluruh item
- Menampilkan hanya item yang tersedia
- Meminjam item (mengubah status)
- Mengembalikan item dengan perhitungan denda
- Statistik perpustakaan:
  - total item
  - jumlah buku & majalah
  - item tersedia & sedang dipinjam

---

## 🧠 Konsep OOP yang Digunakan

### 🏛 Abstract Class
`LibraryItem` berisi method abstract:
- `display_info()`
- `calculate_late_fee()`

### 🧬 Inheritance
Subclass yang mewarisi:
- `Book`
- `Magazine`

### 🔐 Encapsulation
- `__id` (private)
- `_title`, `_year`, `_available` (protected)

### 🏷 Property Decorator
Atribut `title` menggunakan getter/setter dengan validasi

### 🔁 Polymorphism
Method `display_info()` & `calculate_late_fee()` diimplementasikan berbeda di tiap subclass

---

## 🖥️ Cara Menjalankan Program

1. Simpan file sebagai: main.py

2. Jalankan melalui terminal:

3. Gunakan menu interaktif seperti pada contoh output

---

## 🖼 Screenshot Program

Berikut contoh tampilan hasil running:

![Screenshot Program](https://github.com/user-attachments/assets/cb858c29-77c9-4998-a9c5-f4524c1f28a9)


Bebas digunakan untuk kebutuhan pembelajaran dan tugas akademik.


