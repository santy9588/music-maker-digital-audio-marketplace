import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useIsCallerAdmin, useIsStripeConfigured, useSetStripeConfiguration } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function StripeSetupModal() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: isConfigured, isLoading: configLoading } = useIsStripeConfigured();
  const setConfig = useSetStripeConfiguration();

  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('US, CA, GB, AU, DE, FR');

  const showSetup = isAdmin && !adminLoading && !configLoading && isConfigured === false;

  const handleSave = async () => {
    if (!secretKey.trim()) {
      toast.error('Please enter your Stripe secret key');
      return;
    }

    const countryList = countries
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length === 2);

    if (countryList.length === 0) {
      toast.error('Please enter at least one valid country code');
      return;
    }

    try {
      await setConfig.mutateAsync({
        secretKey: secretKey.trim(),
        allowedCountries: countryList,
      });
      toast.success('Stripe configured successfully!');
    } catch (error) {
      toast.error('Failed to configure Stripe');
      console.error(error);
    }
  };

  if (!showSetup) return null;

  return (
    <Dialog open={showSetup}>
      <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Configure Stripe Payment</DialogTitle>
          <DialogDescription>Set up Stripe to enable payments on your marketplace.</DialogDescription>
        </DialogHeader>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You need a Stripe account to accept payments. Get your secret key from the{' '}
            <a
              href="https://dashboard.stripe.com/apikeys"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Stripe Dashboard
            </a>
            .
          </AlertDescription>
        </Alert>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="secretKey">Stripe Secret Key</Label>
            <Input
              id="secretKey"
              type="password"
              placeholder="sk_test_..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="countries">Allowed Countries (comma-separated)</Label>
            <Textarea
              id="countries"
              placeholder="US, CA, GB, AU"
              value={countries}
              onChange={(e) => setCountries(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Enter 2-letter country codes separated by commas</p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={handleSave} disabled={setConfig.isPending} className="gradient-music">
            {setConfig.isPending ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
