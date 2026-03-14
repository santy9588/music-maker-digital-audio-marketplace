import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllTracks, useGetPurchasedTracks } from '../hooks/useQueries';
import { Music, ShoppingBag, Upload as UploadIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import UploadTrackDialog from '../components/UploadTrackDialog';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: allTracks, isLoading: tracksLoading } = useGetAllTracks();
  const { data: purchasedTracks, isLoading: purchasesLoading } = useGetPurchasedTracks();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container py-16 text-center">
        <Music className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Login Required</h2>
        <p className="text-muted-foreground mb-6">Please login to access your dashboard</p>
        <Button onClick={() => login()} disabled={isLoggingIn} className="gradient-music">
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    );
  }

  const myTracks = allTracks?.filter((track) => track.creator.toString() === identity.getPrincipal().toString()) || [];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your tracks and purchases</p>
      </div>

      <Tabs defaultValue="uploads" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="uploads">
            <UploadIcon className="mr-2 h-4 w-4" />
            My Uploads
          </TabsTrigger>
          <TabsTrigger value="purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            My Purchases
          </TabsTrigger>
        </TabsList>

        {/* My Uploads Tab */}
        <TabsContent value="uploads" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">My Tracks</h2>
              <p className="text-muted-foreground">
                {myTracks.length} {myTracks.length === 1 ? 'track' : 'tracks'} uploaded
              </p>
            </div>
            <UploadTrackDialog />
          </div>

          {tracksLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : myTracks.length > 0 ? (
            <div className="grid gap-4">
              {myTracks.map((track) => (
                <Card
                  key={track.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate({ to: '/track/$trackId', params: { trackId: track.id } })}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{track.title}</CardTitle>
                        <CardDescription className="mt-1">{track.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{track.genre}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-semibold text-primary">${(Number(track.price) / 100).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <Music className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tracks yet</h3>
                <p className="text-muted-foreground mb-6">Start sharing your music with the world</p>
                <UploadTrackDialog />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* My Purchases Tab */}
        <TabsContent value="purchases" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Purchased Tracks</h2>
            <p className="text-muted-foreground">
              {purchasedTracks?.length || 0} {purchasedTracks?.length === 1 ? 'track' : 'tracks'} purchased
            </p>
          </div>

          {purchasesLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : purchasedTracks && purchasedTracks.length > 0 ? (
            <div className="grid gap-4">
              {purchasedTracks.map((track) => (
                <Card
                  key={track.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate({ to: '/track/$trackId', params: { trackId: track.id } })}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{track.title}</CardTitle>
                        <CardDescription className="mt-1">{track.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{track.genre}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Purchased for</span>
                      <span className="font-semibold">${(Number(track.price) / 100).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
                <p className="text-muted-foreground mb-6">Browse tracks and find your next favorite song</p>
                <Button onClick={() => navigate({ to: '/' })} className="gradient-music">
                  Browse Tracks
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
