import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Payment was cancelled or failed.');
  }, []);

  return (
    <div className="container py-16">
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-3xl">Payment Failed</CardTitle>
          <CardDescription className="text-base">
            Your payment was cancelled or could not be processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Don't worry, you haven't been charged. You can try again or browse more tracks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={() => navigate({ to: '/' })} className="gradient-music">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
