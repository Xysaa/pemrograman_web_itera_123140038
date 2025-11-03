import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, Trash2, BookOpen, ShoppingCart, BookMarked } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  owned: {
    label: 'Dimiliki',
    icon: BookMarked,
    color: 'text-primary',
  },
  reading: {
    label: 'Sedang Dibaca',
    icon: BookOpen,
    color: 'text-secondary',
  },
  wishlist: {
    label: 'Ingin Dibeli',
    icon: ShoppingCart,
    color: 'text-muted-foreground',
  },
};

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const config = statusConfig[book.status];
  const StatusIcon = config.icon;

  return (
    <Card className="p-4 hover:shadow-card-hover transition-all duration-300 bg-card border border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-lg text-foreground truncate mb-1">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
          <div className={`flex items-center gap-2 ${config.color}`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{config.label}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(book)}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(book.id)}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
