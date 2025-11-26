"""
Sistem Manajemen Perpustakaan Sederhana
---------------------------------------
Konsep OOP yang digunakan:
- Abstract Class      : LibraryItem (sebagai dasar semua item)
- Inheritance         : Book dan Magazine mewarisi LibraryItem
- Encapsulation       : Atribut penting dibuat private/protected
- Property Decorator  : Untuk mengelola akses atribut dengan aman
- Polymorphism        : Method display_info() & calculate_late_fee() 
                        diimplementasikan berbeda oleh setiap subclass

Fitur Program:
- Menambahkan item (Book / Magazine) ke perpustakaan
- Menampilkan daftar item (semua / hanya yang tersedia)
- Mencari item berdasarkan ID atau judul
- Meminjam & mengembalikan item
- Menampilkan statistik (jumlah item, item tersedia, item dipinjam, dll.)
"""

from abc import ABC, abstractmethod


# =========================
# Abstract Class: LibraryItem
# =========================

class LibraryItem(ABC):
    """
    Kelas abstrak dasar untuk semua item perpustakaan.
    """

    def __init__(self, item_id: str, title: str, year: int):
        self.__id = item_id          # private: tidak boleh diubah langsung dari luar
        self._title = title          # protected: bisa diakses oleh subclass
        self._year = year            # protected
        self._available = True       # status ketersediaan

    # ----- Property untuk ID (read-only) -----
    @property
    def id(self) -> str:
        """ID item (read-only)."""
        return self.__id

    # ----- Property untuk title (dengan setter) -----
    @property
    def title(self) -> str:
        """Judul item."""
        return self._title

    @title.setter
    def title(self, new_title: str):
        """Setter judul dengan validasi sederhana."""
        if not new_title or new_title.strip() == "":
            print("Judul tidak boleh kosong! Perubahan judul dibatalkan.")
        else:
            self._title = new_title

    # ----- Property untuk status available (read-only) -----
    @property
    def available(self) -> bool:
        """Status apakah item tersedia untuk dipinjam."""
        return self._available

    def set_available(self, status: bool):
        """Mengubah status ketersediaan item."""
        self._available = status

    # ----- Method abstrak wajib di-override -----
    @abstractmethod
    def display_info(self) -> None:
        """Menampilkan informasi detail item."""
        pass

    @abstractmethod
    def calculate_late_fee(self, days_late: int) -> float:
        """
        Menghitung denda keterlambatan berdasarkan jenis item.
        Polymorphism: tiap subclass punya implementasi berbeda.
        """
        pass


# =========================
# Subclass: Book
# =========================

class Book(LibraryItem):
    def __init__(self, item_id: str, title: str, year: int, author: str, pages: int):
        super().__init__(item_id, title, year)
        self._author = author
        self._pages = pages

    def display_info(self) -> None:
        status = "Tersedia" if self.available else "Dipinjam"
        print(f"[BOOK] ID: {self.id} | Judul: {self.title} | Penulis: {self._author} | "
              f"Tahun: {self._year} | Halaman: {self._pages} | Status: {status}")

    def calculate_late_fee(self, days_late: int) -> float:
        """
        Misal: Denda buku = Rp1.000 per hari keterlambatan.
        """
        if days_late <= 0:
            return 0.0
        return 1000.0 * days_late


# =========================
# Subclass: Magazine
# =========================

class Magazine(LibraryItem):
    def __init__(self, item_id: str, title: str, year: int, issue: str, publisher: str):
        super().__init__(item_id, title, year)
        self._issue = issue
        self._publisher = publisher

    def display_info(self) -> None:
        status = "Tersedia" if self.available else "Dipinjam"
        print(f"[MAGAZINE] ID: {self.id} | Judul: {self.title} | Edisi: {self._issue} | "
              f"Penerbit: {self._publisher} | Tahun: {self._year} | Status: {status}")

    def calculate_late_fee(self, days_late: int) -> float:
        """
        Misal: Denda majalah = Rp500 per hari keterlambatan.
        """
        if days_late <= 0:
            return 0.0
        return 500.0 * days_late


# =========================
# Class: Library
# =========================

class Library:
    """
    Kelas untuk mengelola koleksi item perpustakaan.
    Menggunakan enkapsulasi dengan atribut __items (private).
    """

    def __init__(self, name: str):
        self.name = name
        self.__items: list[LibraryItem] = []  # list private untuk menyimpan item

    def add_item(self, item: LibraryItem) -> None:
        """Menambahkan item ke dalam perpustakaan."""
        self.__items.append(item)
        print(f"Item '{item.title}' berhasil ditambahkan ke perpustakaan.\n")

    def list_items(self, only_available: bool = False) -> None:
        """
        Menampilkan daftar item.
        Jika only_available=True, hanya menampilkan item yang tersedia.
        """
        if not self.__items:
            print("Belum ada item di perpustakaan.\n")
            return

        print(f"=== Daftar Item di Perpustakaan '{self.name}' ===")
        for item in self.__items:
            if only_available and not item.available:
                continue
            # Polymorphism: display_info() dipanggil tanpa peduli tipenya Book/Magazine
            item.display_info()
        print()

    def find_by_id(self, item_id: str) -> LibraryItem | None:
        """Mencari item berdasarkan ID."""
        for item in self.__items:
            if item.id == item_id:
                return item
        return None

    def search_by_title(self, keyword: str) -> list[LibraryItem]:
        """Mencari item berdasarkan judul (mengandung keyword, tidak case sensitive)."""
        keyword_lower = keyword.lower()
        hasil = [
            item for item in self.__items
            if keyword_lower in item.title.lower()
        ]
        return hasil

    def borrow_item(self, item_id: str) -> None:
        """Meminjam item jika tersedia."""
        item = self.find_by_id(item_id)
        if item is None:
            print(f"Item dengan ID {item_id} tidak ditemukan.\n")
            return

        if not item.available:
            print(f"Item '{item.title}' sedang dipinjam orang lain.\n")
            return

        item.set_available(False)
        print(f"Item '{item.title}' berhasil dipinjam.\n")

    def return_item(self, item_id: str, days_late: int = 0) -> None:
        """
        Mengembalikan item. Jika terlambat (days_late > 0), tampilkan denda.
        """
        item = self.find_by_id(item_id)
        if item is None:
            print(f"Item dengan ID {item_id} tidak ditemukan.\n")
            return

        if item.available:
            print(f"Item '{item.title}' tidak sedang dipinjam.\n")
            return

        item.set_available(True)
        fee = item.calculate_late_fee(days_late)
        print(f"Item '{item.title}' berhasil dikembalikan.")
        if fee > 0:
            print(f"Denda keterlambatan: Rp{fee:,.0f}")
        print()

    def show_statistics(self) -> None:
        """
        Menampilkan statistik sederhana perpustakaan:
        - Total item
        - Total buku & majalah
        - Jumlah item tersedia & sedang dipinjam
        """
        total = len(self.__items)
        if total == 0:
            print("Belum ada item di perpustakaan.\n")
            return

        total_books = sum(1 for i in self.__items if isinstance(i, Book))
        total_magazines = sum(1 for i in self.__items if isinstance(i, Magazine))
        available = sum(1 for i in self.__items if i.available)
        borrowed = total - available

        print("=== Statistik Perpustakaan ===")
        print(f"Nama perpustakaan   : {self.name}")
        print(f"Total item          : {total}")
        print(f" - Buku             : {total_books}")
        print(f" - Majalah          : {total_magazines}")
        print(f"Item tersedia       : {available}")
        print(f"Item dipinjam       : {borrowed}\n")


# =========================
# Fungsi Bantu untuk Input
# =========================

def input_int(prompt: str) -> int:
    """Input integer dengan penanganan error sederhana."""
    while True:
        try:
            value = int(input(prompt))
            return value
        except ValueError:
            print("Input harus berupa angka. Coba lagi.")


# =========================
# Menu Interaktif
# =========================

def tampilkan_menu():
    print("===== SISTEM MANAJEMEN PERPUSTAKAAN =====")
    print("1. Tambah buku")
    print("2. Tambah majalah")
    print("3. Tampilkan semua item")
    print("4. Tampilkan item yang tersedia saja")
    print("5. Cari item berdasarkan ID")
    print("6. Cari item berdasarkan judul")
    print("7. Pinjam item")
    print("8. Kembalikan item")
    print("9. Lihat statistik perpustakaan")
    print("0. Keluar")
    print("=========================================")


def main():
    # Membuat perpustakaan dengan beberapa data awal
    library = Library("Perpustakaan Prodi Informatika")

    # Data awal (bisa kamu ubah sesuai kebutuhan)
    library.add_item(Book("B001", "Pemrograman Python Dasar", 2022, "Andi Pratama", 300))
    library.add_item(Book("B002", "Struktur Data & Algoritma", 2021, "Budi Santoso", 450))
    library.add_item(Magazine("M001", "Info Teknologi", 2023, "Edisi Januari", "TechMedia"))
    library.add_item(Magazine("M002", "Sains Populer", 2022, "Edisi Khusus AI", "SciencePress"))

    while True:
        tampilkan_menu()
        pilihan = input("Pilih menu: ").strip()

        if pilihan == "1":
            print("\n=== Tambah Buku ===")
            item_id = input("ID Buku          : ").strip()
            title = input("Judul Buku       : ").strip()
            year = input_int("Tahun Terbit     : ")
            author = input("Penulis          : ").strip()
            pages = input_int("Jumlah Halaman   : ")
            book = Book(item_id, title, year, author, pages)
            library.add_item(book)

        elif pilihan == "2":
            print("\n=== Tambah Majalah ===")
            item_id = input("ID Majalah       : ").strip()
            title = input("Judul Majalah    : ").strip()
            year = input_int("Tahun Terbit     : ")
            issue = input("Edisi            : ").strip()
            publisher = input("Penerbit         : ").strip()
            mag = Magazine(item_id, title, year, issue, publisher)
            library.add_item(mag)

        elif pilihan == "3":
            print()
            library.list_items(only_available=False)

        elif pilihan == "4":
            print()
            library.list_items(only_available=True)

        elif pilihan == "5":
            print("\n=== Cari Item berdasarkan ID ===")
            item_id = input("Masukkan ID: ").strip()
            item = library.find_by_id(item_id)
            if item:
                item.display_info()
                print()
            else:
                print("Item tidak ditemukan.\n")

        elif pilihan == "6":
            print("\n=== Cari Item berdasarkan Judul ===")
            keyword = input("Masukkan kata kunci judul: ").strip()
            results = library.search_by_title(keyword)
            if results:
                print(f"Ditemukan {len(results)} item:")
                for item in results:
                    item.display_info()
                print()
            else:
                print("Tidak ada item yang cocok dengan kata kunci tersebut.\n")

        elif pilihan == "7":
            print("\n=== Pinjam Item ===")
            item_id = input("Masukkan ID item yang ingin dipinjam: ").strip()
            library.borrow_item(item_id)

        elif pilihan == "8":
            print("\n=== Kembalikan Item ===")
            item_id = input("Masukkan ID item yang ingin dikembalikan: ").strip()
            days_late = input_int("Berapa hari terlambat? (isi 0 jika tidak terlambat): ")
            library.return_item(item_id, days_late)

        elif pilihan == "9":
            print()
            library.show_statistics()

        elif pilihan == "0":
            print("Terima kasih telah menggunakan sistem perpustakaan.")
            break

        else:
            print("Pilihan tidak valid. Silakan coba lagi.\n")


if __name__ == "__main__":
    main()
