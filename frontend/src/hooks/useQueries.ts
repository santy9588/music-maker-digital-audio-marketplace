import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Track, ExternalBlob, ShoppingItem, StripeConfiguration } from '../backend';

// Track Queries
export function useGetAllTracks() {
  const { actor, isFetching } = useActor();

  return useQuery<Track[]>({
    queryKey: ['tracks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTracks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTrackMetadata(trackId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Track>({
    queryKey: ['track', trackId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTrackMetadata(trackId);
    },
    enabled: !!actor && !isFetching && !!trackId,
  });
}

export function useGetAudioFile(trackId: string) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<ExternalBlob>({
    queryKey: ['audioFile', trackId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAudioFile(trackId);
    },
    enabled: !!actor && !isFetching && !!trackId && !!identity,
    retry: false,
  });
}

export function useUploadTrack() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      price: bigint;
      genre: string;
      audioBlob: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadTrack(params.title, params.description, params.price, params.genre, params.audioBlob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
    },
  });
}

// Purchase Queries
export function useGetPurchasedTracks() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Track[]>({
    queryKey: ['purchasedTracks'],
    queryFn: async () => {
      if (!actor || !identity) return [];
      const principal = identity.getPrincipal();
      return actor.getPurchasedTracks(principal);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (items: ShoppingItem[]) => {
      if (!actor) throw new Error('Actor not available');
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

// Stripe Configuration
export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stripeConfigured'] });
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
