import { useMemo } from 'react';
import { Book, BookStatus } from '@/types/book';

export interface BookStats {
  total: number;
  owned: number;
  reading: number;
  wishlist: number;
  byStatus: Record<BookStatus, number>;
}

export function useBookStats(books: Book[]): BookStats {
  return useMemo(() => {
    const stats: BookStats = {
      total: books.length,
      owned: 0,
      reading: 0,
      wishlist: 0,
      byStatus: {
        owned: 0,
        reading: 0,
        wishlist: 0,
      },
    };

    books.forEach((book) => {
      stats.byStatus[book.status]++;
      stats[book.status]++;
    });

    return stats;
  }, [books]);
}
