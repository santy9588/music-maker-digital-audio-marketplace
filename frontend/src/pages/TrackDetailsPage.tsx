import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetTrackMetadata, useGetAudioFile, useCreateCheckoutSession } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Music, Lock } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingItem } from '../backend';

export default function TrackDetailsPage() {
  const { trackId } = useParams({ from: '/track/$trackId' });
  const navigate = useNavigate();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: track, isLoading: trackLoading } = useGetTrackMetadata(trackId);
  const { data: audioBlob, isLoading: audioLoading } = useGetAudioFile(trackId);
  const createCheckout = useCreateCheckoutSession();

  const isAuthenticated = !!identity;
  const priceInDollars = track ? Number(track.price) / 100 : 0;

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase tracks');
      await login();
      return;
    }

    if (!track) return;

    try {
      const item: ShoppingItem = {
        productName: track.title,
        productDescription: track.description,
        priceInCents: track.price,
        currency: 'usd',
        quantity: BigInt(1),
      };

      const session = await createCheckout.mutateAsync([item]);
      const sessionData = JSON.parse(session);
      window.location.href = sessionData.url;
    } catch (error: any) {
      if (error.message?.includes('Unauthorized')) {
        toast.error('Please login to purchase tracks');
        await login();
      } else {
        toast.error('Failed to create checkout session');
      }
      console.error(error);
    }
  };

  const handleLoginForPreview = async () => {
    await login();
  };

  if (trackLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="container py-16 text-center">
        <Music className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Track not found</h2>
        <Button onClick={() => navigate({ to: '/' })} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Button>
      </div>
    );
  }

  const audioUrl = audioBlob?.getDirectURL();

  return (
    <div className="container py-8">
      <Button onClick={() => navigate({ to: '/' })} variant="ghost" className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Album Art */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-music">
          <img
            src="/assets/generated/default-album-cover.dim_300x300.jpg"
            alt={track.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/20" />
          <Music className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 text-white/80" />
        </div>

        {/* Track Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-4xl font-bold">{track.title}</h1>
              <Badge variant="secondary" className="text-sm">
                {track.genre}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-4">{track.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                ${priceInDollars.toFixed(2)} <span className="text-base font-normal text-muted-foreground">USD</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handlePurchase}
                disabled={createCheckout.isPending || isLoggingIn}
                className="w-full gradient-music"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {createCheckout.isPending ? 'Processing...' : isLoggingIn ? 'Logging in...' : 'Purchase Track'}
              </Button>
            </CardContent>
          </Card>

          {/* Audio Player */}
          {isAuthenticated ? (
            audioLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : audioUrl ? (
              <div className="space-y-2">
                <h3 className="font-semibold">Preview</h3>
                <AudioPlayer audioUrl={audioUrl} title={track.title} />
              </div>
            ) : null
          ) : (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Please{' '}
                <button onClick={handleLoginForPreview} disabled={isLoggingIn} className="font-medium underline hover:text-primary">
                  {isLoggingIn ? 'logging in...' : 'login'}
                </button>{' '}
                to preview this track
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
