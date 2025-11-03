import { useBooks } from '@/context/BookContext';
import { useBookStats } from '@/hooks/useBookStats';
import { StatCard } from '@/components/StatCard';
import { Card } from '@/components/ui/card';
import { Library, BookMarked, BookOpen, ShoppingCart } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  if (books.length === 0) {
    return (
      <EmptyState
        title="Belum ada statistik"
        description="Tambahkan buku ke koleksi Anda untuk melihat statistik"
      />
    );
  }

  const percentage = (value: number) =>
    stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-bold mb-2">Statistik Koleksi</h2>
        <p className="text-muted-foreground">
          Ringkasan dan analisis koleksi buku Anda
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Buku"
          value={stats.total}
          icon={Library}
          colorClass="text-primary"
        />
        <StatCard
          title="Dimiliki"
          value={stats.owned}
          icon={BookMarked}
          colorClass="text-primary"
        />
        <StatCard
          title="Sedang Dibaca"
          value={stats.reading}
          icon={BookOpen}
          colorClass="text-secondary"
        />
        <StatCard
          title="Wishlist"
          value={stats.wishlist}
          icon={ShoppingCart}
          colorClass="text-muted-foreground"
        />
      </div>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-xl mb-6">
          Distribusi Status Buku
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Dimiliki</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {stats.owned} ({percentage(stats.owned)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${percentage(stats.owned)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Sedang Dibaca</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {stats.reading} ({percentage(stats.reading)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-secondary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${percentage(stats.reading)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Ingin Dibeli</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {stats.wishlist} ({percentage(stats.wishlist)}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-muted-foreground h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${percentage(stats.wishlist)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-xl mb-4">Insight</h3>
        <div className="space-y-3 text-sm">
          {stats.reading > 0 && (
            <p className="text-muted-foreground">
              📖 Anda sedang membaca <span className="font-semibold text-foreground">{stats.reading}</span> buku
            </p>
          )}
          {stats.wishlist > 0 && (
            <p className="text-muted-foreground">
              🎯 Ada <span className="font-semibold text-foreground">{stats.wishlist}</span> buku dalam wishlist Anda
            </p>
          )}
          {stats.owned >= 10 && (
            <p className="text-muted-foreground">
              🌟 Koleksi Anda sudah mencapai <span className="font-semibold text-foreground">{stats.owned}</span> buku!
            </p>
          )}
          {stats.total === 0 && (
            <p className="text-muted-foreground">
              Mulai tambahkan buku ke koleksi Anda untuk melihat statistik yang lebih detail
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
