import { useState } from 'react';
import { useBooks } from '@/context/BookContext';
import { Book } from '@/types/book';
import { BookCard } from '@/components/BookCard';
import { BookForm } from '@/components/BookForm';
import { BookFilter } from '@/components/BookFilter';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus } from 'lucide-react';

export default function Home() {
  const {
    books,
    addBook,
    updateBook,
    deleteBook,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredBooks,
  } = useBooks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingBookId(id);
  };

  const confirmDelete = () => {
    if (deletingBookId) {
      deleteBook(deletingBookId);
      setDeletingBookId(null);
    }
  };

  const handleSubmit = (data: any) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
    } else {
      addBook(data);
    }
    setIsFormOpen(false);
    setEditingBook(undefined);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingBook(undefined);
  };

  const filterCounts = {
    all: books.length,
    owned: books.filter((b) => b.status === 'owned').length,
    reading: books.filter((b) => b.status === 'reading').length,
    wishlist: books.filter((b) => b.status === 'wishlist').length,
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Koleksi Buku</h2>
            <p className="text-muted-foreground">
              Kelola dan atur buku-buku Anda dengan mudah
            </p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Buku
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Cari berdasarkan judul atau penulis..."
            />
          </div>
        </div>

        <BookFilter
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
          counts={filterCounts}
        />

        {filteredBooks.length === 0 ? (
          <EmptyState
            title={
              searchTerm || statusFilter !== 'all'
                ? 'Tidak ada buku ditemukan'
                : 'Belum ada buku'
            }
            description={
              searchTerm || statusFilter !== 'all'
                ? 'Coba ubah pencarian atau filter Anda'
                : 'Mulai tambahkan buku pertama Anda ke koleksi'
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingBook
                ? 'Perbarui informasi buku Anda'
                : 'Tambahkan buku baru ke koleksi Anda'}
            </DialogDescription>
          </DialogHeader>
          <BookForm
            book={editingBook}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingBookId} onOpenChange={() => setDeletingBookId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Buku</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus buku ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
