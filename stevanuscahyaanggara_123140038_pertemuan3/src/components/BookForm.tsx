import { useState, useEffect } from 'react';
import { Book, BookFormData, BookStatus } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
}

export function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    status: 'owned',
  });
  const [errors, setErrors] = useState<Partial<BookFormData>>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        status: book.status,
      });
    }
  }, [book]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Judul terlalu panjang (maksimal 200 karakter)';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi';
    } else if (formData.author.trim().length > 100) {
      newErrors.author = 'Nama penulis terlalu panjang (maksimal 100 karakter)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        author: formData.author.trim(),
        status: formData.status,
      });
      setFormData({ title: '', author: '', status: 'owned' });
      setErrors({});
    } else {
      toast.error('Mohon perbaiki kesalahan pada form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Buku *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Masukkan judul buku"
          className={errors.title ? 'border-destructive' : ''}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Penulis *</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Masukkan nama penulis"
          className={errors.author ? 'border-destructive' : ''}
        />
        {errors.author && (
          <p className="text-sm text-destructive">{errors.author}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select
          value={formData.status}
          onValueChange={(value: BookStatus) =>
            setFormData({ ...formData, status: value })
          }
        >
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owned">Dimiliki</SelectItem>
            <SelectItem value="reading">Sedang Dibaca</SelectItem>
            <SelectItem value="wishlist">Ingin Dibeli</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
          {book ? 'Perbarui' : 'Tambah'} Buku
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
      </div>
    </form>
  );
}
