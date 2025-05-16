
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface EventTypeCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  colorClass: string;
}

const EventTypeCard = ({ title, count, icon, colorClass }: EventTypeCardProps) => {
  return (
    <Card>
      <CardHeader className={`${colorClass} rounded-t-lg text-white py-3`}>
        <CardTitle className="text-lg flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-3xl font-bold">{count}</div>
        <p className="text-sm text-muted-foreground">Total {title.toLowerCase()}</p>
      </CardContent>
    </Card>
  );
};

export default EventTypeCard;
