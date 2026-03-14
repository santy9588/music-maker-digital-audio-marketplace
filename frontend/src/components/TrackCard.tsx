import { Track } from '../backend';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, DollarSign } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
  const navigate = useNavigate();
  const priceInDollars = Number(track.price) / 100;

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
      onClick={() => navigate({ to: '/track/$trackId', params: { trackId: track.id } })}
    >
      <div className="aspect-square bg-gradient-music flex items-center justify-center relative overflow-hidden">
        <img
          src="/assets/generated/default-album-cover.dim_300x300.jpg"
          alt={track.title}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <Music className="absolute h-16 w-16 text-white/80" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {track.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{track.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">
          {track.genre}
        </Badge>
        <div className="flex items-center gap-1 font-semibold text-primary">
          <DollarSign className="h-4 w-4" />
          {priceInDollars.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}
