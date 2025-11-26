"""
Program Pengelolaan Data Nilai Mahasiswa
----------------------------------------
Fitur:
- Menyimpan data nilai mahasiswa (UTS, UAS, Tugas)
- Menghitung nilai akhir (30% UTS, 40% UAS, 30% Tugas)
- Menentukan grade (A, B, C, D, E)
- Menampilkan data dalam bentuk tabel
- Mencari nilai tertinggi & terendah
- Menambah data mahasiswa baru
- Filter mahasiswa berdasarkan grade
- Menghitung rata-rata kelas
- Fitur tambahan: rekap jumlah mahasiswa per grade & urutkan berdasarkan nilai akhir
"""

# ===============================
# Data Awal Mahasiswa
# ===============================

mahasiswa_list = [
    {"nama": "Andi Pratama",     "nim": "123140001", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 78},
    {"nama": "Budi Santoso",     "nim": "123140002", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 60},
    {"nama": "Citra Dewi",       "nim": "123140003", "nilai_uts": 90, "nilai_uas": 92, "nilai_tugas": 88},
    {"nama": "Dewi Kusuma",      "nim": "123140004", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 58},
    {"nama": "Eko Prasetyo",     "nim": "123140005", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]

# ===============================
# Fungsi Perhitungan & Utilitas
# ===============================

def hitung_nilai_akhir(nilai_uts: float, nilai_uas: float, nilai_tugas: float) -> float:
    """
    Menghitung nilai akhir dengan rumus:
    30% UTS + 40% UAS + 30% Tugas
    """
    return 0.3 * nilai_uts + 0.4 * nilai_uas + 0.3 * nilai_tugas


def tentukan_grade(nilai_akhir: float) -> str:
    """
    Menentukan grade berdasarkan nilai akhir:
    A: >= 80
    B: >= 70
    C: >= 60
    D: >= 50
    E: < 50
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def update_nilai_akhir_dan_grade(mahasiswa: dict) -> None:
    """
    Menghitung dan menambahkan/ mengupdate nilai_akhir dan grade
    di dalam dictionary mahasiswa.
    """
    nilai_akhir = hitung_nilai_akhir(
        mahasiswa["nilai_uts"],
        mahasiswa["nilai_uas"],
        mahasiswa["nilai_tugas"],
    )
    mahasiswa["nilai_akhir"] = round(nilai_akhir, 2)
    mahasiswa["grade"] = tentukan_grade(nilai_akhir)


def update_semua_nilai(mahasiswa_list: list) -> None:
    """Mengupdate nilai_akhir dan grade untuk seluruh mahasiswa dalam list."""
    for mhs in mahasiswa_list:
        update_nilai_akhir_dan_grade(mhs)


def tampilkan_tabel(mahasiswa_list: list) -> None:
    """
    Menampilkan data mahasiswa dalam bentuk tabel rapi.
    """
    if not mahasiswa_list:
        print("Belum ada data mahasiswa.\n")
        return

    # Pastikan semua sudah punya nilai_akhir & grade
    update_semua_nilai(mahasiswa_list)

    # Tentukan lebar kolom
    headers = ["No", "NIM", "Nama", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"]
    col_widths = [4, 12, 20, 7, 7, 7, 13, 7]

    # Fungsi bantu cetak baris
    def print_row(data, widths):
        row_str = ""
        for i, item in enumerate(data):
            row_str += str(item).ljust(widths[i])
        print(row_str)

    # Cetak header
    print("=" * sum(col_widths))
    print_row(headers, col_widths)
    print("=" * sum(col_widths))

    # Cetak isi tabel
    for i, mhs in enumerate(mahasiswa_list, start=1):
        row = [
            i,
            mhs["nim"],
            mhs["nama"][:20],
            mhs["nilai_uts"],
            mhs["nilai_uas"],
            mhs["nilai_tugas"],
            mhs.get("nilai_akhir", ""),
            mhs.get("grade", ""),
        ]
        print_row(row, col_widths)

    print("=" * sum(col_widths))
    print()  # newline


def cari_nilai_ekstrem(mahasiswa_list: list, mode: str = "max") -> dict | None:
    """
    Mencari mahasiswa dengan nilai akhir tertinggi atau terendah.
    mode = "max" -> tertinggi
    mode = "min" -> terendah
    """
    if not mahasiswa_list:
        return None

    update_semua_nilai(mahasiswa_list)

    if mode == "max":
        return max(mahasiswa_list, key=lambda m: m["nilai_akhir"])
    elif mode == "min":
        return min(mahasiswa_list, key=lambda m: m["nilai_akhir"])
    else:
        return None


def input_float(prompt: str, min_value: float = 0, max_value: float = 100) -> float:
    """
    Fungsi bantu untuk input angka (float) dengan validasi rentang 0-100.
    """
    while True:
        try:
            nilai = float(input(prompt))
            if nilai < min_value or nilai > max_value:
                print(f"Nilai harus antara {min_value} dan {max_value}. Coba lagi.")
            else:
                return nilai
        except ValueError:
            print("Input harus berupa angka. Coba lagi.")


def tambah_mahasiswa(mahasiswa_list: list) -> None:
    """
    Input data mahasiswa baru dari user dan menambahkannya ke list.
    """
    print("=== Input Data Mahasiswa Baru ===")
    nama = input("Nama mahasiswa  : ").strip()
    nim = input("NIM             : ").strip()

    nilai_uts = input_float("Nilai UTS (0-100): ")
    nilai_uas = input_float("Nilai UAS (0-100): ")
    nilai_tugas = input_float("Nilai Tugas (0-100): ")

    mahasiswa_baru = {
        "nama": nama,
        "nim": nim,
        "nilai_uts": nilai_uts,
        "nilai_uas": nilai_uas,
        "nilai_tugas": nilai_tugas,
    }

    update_nilai_akhir_dan_grade(mahasiswa_baru)
    mahasiswa_list.append(mahasiswa_baru)

    print("\nData mahasiswa berhasil ditambahkan!\n")


def filter_berdasarkan_grade(mahasiswa_list: list, grade: str) -> list:
    """
    Mengembalikan list mahasiswa dengan grade tertentu.
    """
    update_semua_nilai(mahasiswa_list)
    grade = grade.upper()
    return [m for m in mahasiswa_list if m.get("grade") == grade]


def hitung_rata_rata_kelas(mahasiswa_list: list) -> float | None:
    """
    Menghitung rata-rata nilai akhir seluruh mahasiswa.
    Mengembalikan None jika tidak ada data.
    """
    if not mahasiswa_list:
        return None

    update_semua_nilai(mahasiswa_list)
    total = sum(m["nilai_akhir"] for m in mahasiswa_list)
    return total / len(mahasiswa_list)


def rekap_grade(mahasiswa_list: list) -> dict:
    """
    Fitur tambahan:
    Menghitung jumlah mahasiswa untuk setiap grade.
    Mengembalikan dictionary: { 'A': x, 'B': y, ... }
    """
    update_semua_nilai(mahasiswa_list)
    hasil = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0}
    for m in mahasiswa_list:
        g = m.get("grade", "E")
        if g in hasil:
            hasil[g] += 1
        else:
            hasil[g] = 1
    return hasil


def urutkan_berdasarkan_nilai(mahasiswa_list: list, descending: bool = True) -> list:
    """
    Fitur tambahan:
    Mengembalikan list baru mahasiswa yang diurutkan berdasarkan nilai akhir.
    descending=True -> dari terbesar ke terkecil
    """
    update_semua_nilai(mahasiswa_list)
    return sorted(mahasiswa_list, key=lambda m: m["nilai_akhir"], reverse=descending)


# ===============================
# Menu Utama (Input/Output)
# ===============================

def tampilkan_menu():
    print("===== PROGRAM PENGELOLAAN NILAI MAHASISWA =====")
    print("1. Tampilkan semua data mahasiswa")
    print("2. Tambah data mahasiswa baru")
    print("3. Cari mahasiswa dengan nilai tertinggi")
    print("4. Cari mahasiswa dengan nilai terendah")
    print("5. Filter mahasiswa berdasarkan grade")
    print("6. Lihat rata-rata nilai kelas & rekap grade")
    print("7. Tampilkan data urut berdasarkan nilai akhir (tertinggi -> terendah)")
    print("0. Keluar")
    print("===============================================")


def main():
    # Update nilai_akhir & grade untuk data awal
    update_semua_nilai(mahasiswa_list)

    while True:
        tampilkan_menu()
        pilihan = input("Pilih menu: ").strip()

        if pilihan == "1":
            print("\n=== DATA NILAI MAHASISWA ===")
            tampilkan_tabel(mahasiswa_list)

        elif pilihan == "2":
            tambah_mahasiswa(mahasiswa_list)

        elif pilihan == "3":
            print("\n=== MAHASISWA DENGAN NILAI TERTINGGI ===")
            mhs_max = cari_nilai_ekstrem(mahasiswa_list, mode="max")
            if mhs_max:
                tampilkan_tabel([mhs_max])
            else:
                print("Belum ada data.\n")

        elif pilihan == "4":
            print("\n=== MAHASISWA DENGAN NILAI TERENDAH ===")
            mhs_min = cari_nilai_ekstrem(mahasiswa_list, mode="min")
            if mhs_min:
                tampilkan_tabel([mhs_min])
            else:
                print("Belum ada data.\n")

        elif pilihan == "5":
            grade = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").strip().upper()
            if grade not in ["A", "B", "C", "D", "E"]:
                print("Grade tidak valid.\n")
            else:
                hasil = filter_berdasarkan_grade(mahasiswa_list, grade)
                print(f"\n=== MAHASISWA DENGAN GRADE {grade} ===")
                tampilkan_tabel(hasil)

        elif pilihan == "6":
            print("\n=== STATISTIK KELAS ===")
            rata_rata = hitung_rata_rata_kelas(mahasiswa_list)
            if rata_rata is None:
                print("Belum ada data mahasiswa.\n")
            else:
                print(f"Rata-rata nilai akhir kelas: {rata_rata:.2f}")

                rekap = rekap_grade(mahasiswa_list)
                print("\nRekap jumlah mahasiswa per grade:")
                for g, jml in rekap.items():
                    print(f"Grade {g}: {jml} mahasiswa")
                print()

        elif pilihan == "7":
            print("\n=== DATA DIURUTKAN BERDASARKAN NILAI AKHIR (TERTINGGI -> TERENDAH) ===")
            data_urut = urutkan_berdasarkan_nilai(mahasiswa_list, descending=True)
            tampilkan_tabel(data_urut)

        elif pilihan == "0":
            print("Terima kasih telah menggunakan program ini.")
            break

        else:
            print("Pilihan tidak valid. Silakan coba lagi.\n")


if __name__ == "__main__":
    main()
