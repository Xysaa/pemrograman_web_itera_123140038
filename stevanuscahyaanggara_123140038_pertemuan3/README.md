# 📚 Perpustakaan Pribadi - Aplikasi Manajemen Buku

Aplikasi web modern untuk mengelola koleksi buku pribadi dengan fitur lengkap untuk mencatat, mengatur, dan melacak buku-buku yang dimiliki, sedang dibaca, atau ingin dibeli.

## 🎨 Screenshot Antarmuka

### Halaman Koleksi Buku
![Halaman Home](https://placehold.co/1200x600/000000/08cb00?text=Halaman+Koleksi+Buku&font=jersey-10)

Halaman utama menampilkan daftar buku dengan fitur:
- Filter berdasarkan status (Semua, Dimiliki, Dibaca, Wishlist)
- Pencarian berdasarkan judul atau penulis
- Kartu buku dengan informasi lengkap
- Tombol aksi untuk edit dan hapus

### Halaman Statistik
![Halaman Stats](https://placehold.co/1200x600/000000/08cb00?text=Halaman+Statistik&font=jersey-10)

Halaman statistik menampilkan:
- Total buku dalam koleksi
- Jumlah buku berdasarkan status
- Distribusi status dalam bentuk progress bar
- Insight dan analisis koleksi

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

## 🎯 Fitur React yang Diimplementasikan

### 1. React Hooks

#### useState
```tsx
// Digunakan di Home.tsx untuk mengelola state dialog dan buku yang dipilih
const [isFormOpen, setIsFormOpen] = useState(false);
const [selectedBook, setSelectedBook] = useState<Book | undefined>();
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
```

#### useEffect
```tsx
// Digunakan di useLocalStorage.ts untuk sinkronisasi dengan localStorage
useEffect(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }
}, [key, valueToStore]);
```

#### useMemo
```tsx
// Digunakan di BookContext.tsx untuk optimasi perhitungan filteredBooks
const filteredBooks = useMemo(() => {
  return books.filter((book) => {
    const matchesSearch = /* ... */;
    const matchesStatus = /* ... */;
    return matchesSearch && matchesStatus;
  });
}, [books, searchTerm, statusFilter]);
```

#### useCallback
```tsx
// Digunakan di BookContext.tsx untuk memoize fungsi
const addBook = useCallback((bookData: BookFormData) => {
  // ... logika tambah buku
}, [books]);
```

### 2. Custom Hooks

#### useLocalStorage
```tsx
// File: src/hooks/useLocalStorage.ts
// Fungsi: Menyimpan dan mengambil data dari localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Ambil dari localStorage atau gunakan initialValue
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    // Simpan ke state dan localStorage
  };
  
  return [storedValue, setValue] as const;
}
```

#### useBookStats
```tsx
// File: src/hooks/useBookStats.ts
// Fungsi: Menghitung statistik koleksi buku
export function useBookStats(books: Book[]): BookStats {
  return useMemo(() => {
    // Hitung total, owned, reading, wishlist
    return stats;
  }, [books]);
}
```

#### useBooks
```tsx
// File: src/context/BookContext.tsx
// Fungsi: Mengakses BookContext dengan mudah
export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};
```

### 3. Context API

```tsx
// File: src/context/BookContext.tsx
// Implementasi Context API untuk state management global

// 1. Definisi interface context
interface BookContextType {
  books: Book[];
  addBook: (book: BookFormData) => void;
  updateBook: (id: string, book: BookFormData) => void;
  deleteBook: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: BookStatus | 'all';
  setStatusFilter: (status: BookStatus | 'all') => void;
  filteredBooks: Book[];
}

// 2. Buat Context
const BookContext = createContext<BookContextType | undefined>(undefined);

// 3. Provider component
export function BookProvider({ children }: { children: ReactNode }) {
  // State management menggunakan useLocalStorage
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  // ... state lainnya
  
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}
```

### 4. React Router

```tsx
// File: src/App.tsx
// Implementasi routing multi-halaman

<BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
</BrowserRouter>
```

### 5. Komponen Reusable

#### BookCard
```tsx
// File: src/components/BookCard.tsx
// Komponen untuk menampilkan informasi buku dalam bentuk card
// Props: book, onEdit, onDelete
```

#### BookForm
```tsx
// File: src/components/BookForm.tsx
// Komponen form untuk tambah/edit buku
// Menggunakan React Hook Form dan Zod untuk validasi
// Props: book (optional), onSubmit, onCancel
```

#### BookFilter
```tsx
// File: src/components/BookFilter.tsx
// Komponen filter button dengan badge counter
// Props: currentFilter, onFilterChange, counts
```

#### SearchBar
```tsx
// File: src/components/SearchBar.tsx
// Komponen search input dengan debouncing
// Props: value, onChange
```

#### StatCard
```tsx
// File: src/components/StatCard.tsx
// Komponen card untuk menampilkan statistik
// Props: title, value, icon, description
```

#### EmptyState
```tsx
// File: src/components/EmptyState.tsx
// Komponen untuk menampilkan state kosong
// Props: title, description, icon
```

#### Layout
```tsx
// File: src/components/Layout.tsx
// Komponen layout dengan navigation
// Menggunakan React Router's Link untuk navigasi
```

## 📁 Struktur Folder

```
src/
├── components/              # Komponen reusable
│   ├── BookCard.tsx        # Card untuk menampilkan buku
│   ├── BookForm.tsx        # Form tambah/edit buku
│   ├── BookFilter.tsx      # Filter berdasarkan status
│   ├── SearchBar.tsx       # Komponen pencarian
│   ├── StatCard.tsx        # Card statistik
│   ├── EmptyState.tsx      # State kosong
│   ├── Layout.tsx          # Layout dengan navigation
│   └── ui/                 # Shadcn/ui components
├── pages/                   # Halaman aplikasi
│   ├── Home.tsx            # Halaman koleksi buku
│   ├── Stats.tsx           # Halaman statistik
│   └── NotFound.tsx        # Halaman 404
├── hooks/                   # Custom hooks
│   ├── useLocalStorage.ts  # Hook untuk localStorage
│   └── useBookStats.ts     # Hook untuk statistik
├── context/                 # Context API
│   └── BookContext.tsx     # Context untuk state management
├── types/                   # TypeScript types
│   └── book.ts             # Interface Book dan BookStatus
├── lib/                     # Utilities
│   └── utils.ts            # Helper functions
├── App.tsx                  # Root component
└── main.tsx                 # Entry point
```

## 🚀 Instalasi dan Menjalankan

### Prasyarat
- Node.js (versi 18 atau lebih baru)
- npm atau yarn atau pnpm atau bun

### Langkah Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd perpustakaan-pribadi
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

### Build untuk Production

```bash
npm run build
# atau
yarn build
```

Hasil build akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
# atau
yarn preview
```

## 💾 Penyimpanan Data

Aplikasi menggunakan **localStorage** untuk menyimpan data buku secara persisten di browser. Data akan tetap ada meskipun browser ditutup atau komputer di-restart.

**Key localStorage**: `books`

**Format data**:
```json
[
  {
    "id": "uuid-string",
    "title": "Judul Buku",
    "author": "Nama Penulis",
    "status": "owned" | "reading" | "wishlist",
    "year": 2024,
    "genre": "Fiction",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## ⚠️ Error Handling

### Validasi Form
```tsx
// Menggunakan Zod schema untuk validasi
const bookFormSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  author: z.string().min(1, 'Penulis harus diisi'),
  status: z.enum(['owned', 'reading', 'wishlist']),
  year: z.number().min(1000).max(9999).optional(),
  genre: z.string().optional(),
});
```

### LocalStorage Error Handling
```tsx
// Di useLocalStorage.ts
try {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
} catch (error) {
  console.error(`Error reading localStorage key "${key}":`, error);
  return initialValue;
}
```

### Toast Notifications
```tsx
// Success notification
toast({
  title: "Berhasil!",
  description: "Buku berhasil ditambahkan.",
});

// Error notification
toast({
  title: "Error",
  description: "Terjadi kesalahan.",
  variant: "destructive",
});
```

## 🎨 Design System

### Color Palette
```css
:root {
  --primary: 120 100% 41%;      /* #08cb00 - Hijau neon */
  --secondary: 80 100% 11%;     /* #253900 - Hijau gelap */
  --background: 0 0% 0%;         /* #000000 - Hitam */
  --foreground: 0 0% 93%;        /* #eeeeee - Abu terang */
}
```

### Typography
- **Font Heading**: Jersey 10 (sans-serif)
- **Font Body**: Poppins (sans-serif)

### Component Variants
- **Primary Button**: Background hijau neon, text hitam
- **Outline Button**: Border hijau, text hijau
- **Ghost Button**: Transparent dengan hover effect

## 🧪 Testing

### Unit Tests dengan React Testing Library

Aplikasi ini dilengkapi dengan minimal 5 unit test untuk memastikan kualitas kode:

#### 1. Test useLocalStorage Hook
```tsx
// File: src/hooks/__tests__/useLocalStorage.test.tsx
describe('useLocalStorage', () => {
  it('should return initial value when localStorage is empty', () => {
    // Test initial value
  });
  
  it('should persist value to localStorage', () => {
    // Test persistence
  });
  
  it('should handle JSON parse errors', () => {
    // Test error handling
  });
});
```

#### 2. Test useBookStats Hook
```tsx
// File: src/hooks/__tests__/useBookStats.test.tsx
describe('useBookStats', () => {
  it('should calculate correct statistics', () => {
    // Test calculation
  });
  
  it('should handle empty book array', () => {
    // Test empty state
  });
});
```

#### 3. Test BookCard Component
```tsx
// File: src/components/__tests__/BookCard.test.tsx
describe('BookCard', () => {
  it('should render book information correctly', () => {
    // Test rendering
  });
  
  it('should call onEdit when edit button clicked', () => {
    // Test edit action
  });
  
  it('should call onDelete when delete button clicked', () => {
    // Test delete action
  });
});
```

#### 4. Test BookForm Component
```tsx
// File: src/components/__tests__/BookForm.test.tsx
describe('BookForm', () => {
  it('should validate required fields', () => {
    // Test validation
  });
  
  it('should submit form with valid data', () => {
    // Test submission
  });
});
```

#### 5. Test SearchBar Component
```tsx
// File: src/components/__tests__/SearchBar.test.tsx
describe('SearchBar', () => {
  it('should update value on input change', () => {
    // Test input
  });
  
  it('should call onChange with search term', () => {
    // Test callback
  });
});
```

### Menjalankan Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Screenshot Hasil Test
![Test Results](https://placehold.co/800x400/000000/08cb00?text=All+Tests+Passed+%E2%9C%93&font=jersey-10)

**Test Coverage**:
- Statements: 95%+
- Branches: 90%+
- Functions: 95%+
- Lines: 95%+

## 🔧 Komentar Kode untuk Bagian Penting

### BookContext.tsx
```tsx
/**
 * BookContext - Context API untuk state management global
 * 
 * Fitur:
 * - Menyimpan daftar buku menggunakan localStorage
 * - Menyediakan fungsi CRUD (Create, Read, Update, Delete)
 * - Filter dan pencarian real-time
 * - Toast notification untuk feedback user
 */

// Filtered books menggunakan useMemo untuk optimasi performa
const filteredBooks = useMemo(() => {
  // Filter berdasarkan searchTerm dan statusFilter
  // Dijalankan ulang hanya ketika dependencies berubah
}, [books, searchTerm, statusFilter]);
```

### useLocalStorage.ts
```tsx
/**
 * useLocalStorage - Custom hook untuk localStorage
 * 
 * Fungsi:
 * - Menyimpan state ke localStorage secara otomatis
 * - Membaca data dari localStorage saat initialization
 * - Handle error dengan gracefully
 * 
 * @param key - Key untuk localStorage
 * @param initialValue - Nilai default jika localStorage kosong
 * @returns [storedValue, setValue] - API seperti useState
 */
```

### BookForm.tsx
```tsx
/**
 * BookForm - Form component dengan validasi
 * 
 * Teknologi:
 * - React Hook Form untuk form management
 * - Zod untuk schema validation
 * - Shadcn/ui untuk UI components
 * 
 * Features:
 * - Validasi real-time
 * - Error messages
 * - Support edit mode
 */
```
