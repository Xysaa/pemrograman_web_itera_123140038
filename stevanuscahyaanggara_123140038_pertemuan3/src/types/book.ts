export type BookStatus = 'owned' | 'reading' | 'wishlist';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookFormData {
  title: string;
  author: string;
  status: BookStatus;
}
