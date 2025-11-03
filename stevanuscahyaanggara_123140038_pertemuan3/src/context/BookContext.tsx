import React, { createContext, useContext, ReactNode } from 'react';
import { Book, BookFormData, BookStatus } from '@/types/book';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

interface BookContextType {
  books: Book[];
  addBook: (bookData: BookFormData) => void;
  updateBook: (id: string, bookData: BookFormData) => void;
  deleteBook: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: BookStatus | 'all';
  setStatusFilter: (status: BookStatus | 'all') => void;
  filteredBooks: Book[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<BookStatus | 'all'>('all');

  const addBook = (bookData: BookFormData) => {
    try {
      const newBook: Book = {
        id: crypto.randomUUID(),
        ...bookData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setBooks([...books, newBook]);
      toast.success('Buku berhasil ditambahkan!');
    } catch (error) {
      toast.error('Gagal menambahkan buku');
      console.error('Error adding book:', error);
    }
  };

  const updateBook = (id: string, bookData: BookFormData) => {
    try {
      setBooks(
        books.map((book) =>
          book.id === id
            ? { ...book, ...bookData, updatedAt: new Date() }
            : book
        )
      );
      toast.success('Buku berhasil diperbarui!');
    } catch (error) {
      toast.error('Gagal memperbarui buku');
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = (id: string) => {
    try {
      setBooks(books.filter((book) => book.id !== id));
      toast.success('Buku berhasil dihapus!');
    } catch (error) {
      toast.error('Gagal menghapus buku');
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = React.useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [books, searchTerm, statusFilter]);

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        filteredBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}
