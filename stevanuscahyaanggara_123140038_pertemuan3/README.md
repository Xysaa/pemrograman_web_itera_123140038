# 📚 Perpustakaan Pribadi - Aplikasi Manajemen Buku

Aplikasi web modern untuk mengelola koleksi buku pribadi dengan fitur lengkap untuk mencatat, mengatur, dan melacak buku-buku yang dimiliki, sedang dibaca, atau ingin dibeli.


## ✨ Fitur Utama

### Fitur Dasar
- ✅ **Tambah Buku**: Formulir lengkap untuk menambah buku baru (judul, penulis, status, tahun terbit, genre)
- ✏️ **Edit Buku**: Mengubah informasi buku yang sudah ada
- 🗑️ **Hapus Buku**: Menghapus buku dengan konfirmasi alert dialog
- 🔍 **Pencarian**: Cari buku berdasarkan judul atau penulis secara real-time
- 🏷️ **Filter Status**: Filter buku berdasarkan status (Dimiliki, Sedang Dibaca, Wishlist)
- 📊 **Statistik**: Dashboard statistik koleksi buku dengan visualisasi

### Fitur Tambahan
- 🌙 **Dark Mode**: Desain modern dengan tema gelap
- 💾 **Auto-save**: Data otomatis tersimpan di localStorage
- 📱 **Responsive**: Tampilan optimal di semua ukuran layar
- 🎨 **UI Modern**: Desain dengan color palette kustom (#08cb00, #253900, #000000, #eeeeee)
- ⚡ **Real-time Update**: Perubahan langsung terlihat tanpa refresh
- 🔔 **Toast Notifications**: Notifikasi untuk setiap aksi (tambah, edit, hapus)

## 🛠️ Teknologi yang Digunakan

- **React 18.3.1** - Library UI
- **Vite** - Build tool dan dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router DOM** - Navigasi multi-halaman
- **React Hook Form** - Form management
- **Zod** - Validasi schema
- **Shadcn/ui** - Component library
- **Lucide React** - Icon library

## 🚀 Instalasi dan Menjalankan

### Prasyarat
- Node.js (versi 18 atau lebih baru)
- npm atau yarn atau pnpm atau bun

### Langkah Instalasi

1. **Clone repository**
```bash
git clone https://github.com/Xysaa/pemrograman_web_itera_123140038.git
cd pemrograman_web_itera_123140038
cd stevanuscahyaanggara_123140038_pertemuan3
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
pnpm install
# atau
bun install
```

3. **Jalankan development server**
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

4. **Buka browser**
```
http://localhost:5173
```


## 🎨 Screenshot Antarmuka
### Halaman Koleksi Buku
![Halaman Home](https://github.com/user-attachments/assets/21aaf557-28ec-488c-b7ee-1c571cc18bd3)

Halaman utama menampilkan daftar buku dengan fitur:
- Filter berdasarkan status (Semua, Dimiliki, Dibaca, Wishlist)
- Pencarian berdasarkan judul atau penulis
- Kartu buku dengan informasi lengkap
- Tombol aksi untuk edit dan hapus

### Halaman Statistik
![Halaman Stats](https://github.com/user-attachments/assets/cbbdecb5-1a64-4ec4-8077-9dedcdbef3a5)

Halaman statistik menampilkan:
- Total buku dalam koleksi
- Jumlah buku berdasarkan status
- Distribusi status dalam bentuk progress bar
- Insight dan analisis koleksi
## 🎯 Fitur React yang Diimplementasikan

### 1. React Hooks
#### useState
#### useMemo
#### useCallback
### 2. Custom Hooks
#### useLocalStorage
#### useBookStats
#### useBooks
### 3. Context API
### 4. React Router
### 5. Komponen Reusable
#### BookCard
#### BookForm
#### BookFilter
#### SearchBar
#### StatCard
#### EmptyState
#### Layout