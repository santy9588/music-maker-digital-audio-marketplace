import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Music } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Payment successful! Thank you for your purchase.');
  }, []);

  return (
    <div className="container py-16">
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
          <CardDescription className="text-base">Your purchase has been completed successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You can now access your purchased track from your dashboard. Enjoy your music!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={() => navigate({ to: '/dashboard' })} className="gradient-music">
              <Music className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
            <Button onClick={() => navigate({ to: '/' })} variant="outline">
              Browse More Tracks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
