import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Library, BarChart3 } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Library className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-heading font-bold">
                Perpustakaan Pribadi
              </h1>
            </Link>
            <nav className="flex gap-2">
              <Button
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/" className="flex items-center gap-2">
                  <Library className="w-4 h-4" />
                  <span className="hidden sm:inline">Koleksi</span>
                </Link>
              </Button>
              <Button
                variant={location.pathname === '/stats' ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/stats" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Statistik</span>
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
