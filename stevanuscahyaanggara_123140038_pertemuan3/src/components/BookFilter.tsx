import { BookStatus } from '@/types/book';
import { Button } from '@/components/ui/button';
import { BookMarked, BookOpen, ShoppingCart, Library } from 'lucide-react';

interface BookFilterProps {
  currentFilter: BookStatus | 'all';
  onFilterChange: (status: BookStatus | 'all') => void;
  counts: {
    all: number;
    owned: number;
    reading: number;
    wishlist: number;
  };
}

const filters = [
  { value: 'all' as const, label: 'Semua', icon: Library },
  { value: 'owned' as const, label: 'Dimiliki', icon: BookMarked },
  { value: 'reading' as const, label: 'Dibaca', icon: BookOpen },
  { value: 'wishlist' as const, label: 'Wishlist', icon: ShoppingCart },
];

export function BookFilter({ currentFilter, onFilterChange, counts }: BookFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label, icon: Icon }) => {
        const isActive = currentFilter === value;
        return (
          <Button
            key={value}
            variant={isActive ? 'default' : 'outline'}
            onClick={() => onFilterChange(value)}
            className={`flex items-center gap-2 ${
              isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              isActive 
                ? 'bg-primary-foreground/20' 
                : 'bg-muted'
            }`}>
              {counts[value]}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
