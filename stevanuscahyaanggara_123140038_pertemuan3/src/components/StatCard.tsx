import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  colorClass: string;
}

export function StatCard({ title, value, icon: Icon, colorClass }: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-heading font-bold">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full ${colorClass} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
    </Card>
  );
}
