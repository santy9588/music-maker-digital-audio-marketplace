import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import OutCall "http-outcalls/outcall";
import Stripe "stripe/stripe";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";



actor {
  // Include MixinAuthorization for access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Include MixinStorage for blob storage
  include MixinStorage();

  // Track Management
  public type Track = {
    id : Text;
    creator : Principal;
    title : Text;
    description : Text;
    price : Nat;
    genre : Text;
    audioFile : Storage.ExternalBlob;
  };

  module Track {
    public func compare(track1 : Track, track2 : Track) : { #less; #equal; #greater } {
      switch (Text.compare(track1.title, track2.title)) {
        case (#equal) { Text.compare(track1.genre, track2.genre) };
        case (order) { order };
      };
    };
  };

  // App State
  var nextTrackId = 0;
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  let tracks = Map.empty<Text, Track>();
  let purchases = Map.empty<Principal, List.List<Text>>(); // Map buyer to list of track IDs

  // Helper Functions
  func getNextTrackId() : Text {
    let id = nextTrackId;
    nextTrackId += 1;
    id.toText();
  };

  func getTrack(trackId : Text) : Track {
    switch (tracks.get(trackId)) {
      case (null) { Runtime.trap("Track not found") };
      case (?track) { track };
    };
  };

  func addPurchase(buyer : Principal, trackId : Text) {
    switch (purchases.get(buyer)) {
      case (null) {
        let newList = List.empty<Text>();
        newList.add(trackId);
        purchases.add(buyer, newList);
      };
      case (?purchaseList) {
        purchaseList.add(trackId);
      };
    };
  };

  // Public Functions

  // Track Management
  public shared ({ caller }) func uploadTrack(title : Text, description : Text, price : Nat, genre : Text, audioBlob : Storage.ExternalBlob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only creators can upload tracks");
    };

    let trackId = getNextTrackId();

    let track : Track = {
      id = trackId;
      creator = caller;
      title;
      description;
      price;
      genre;
      audioFile = audioBlob;
    };

    tracks.add(trackId, track);
    trackId;
  };

  // Allow unauthenticated users to browse tracks
  public query func getTrackMetadata(trackId : Text) : async Track {
    getTrack(trackId);
  };

  // Allow unauthenticated users to browse all tracks
  public query func getAllTracks() : async [Track] {
    tracks.values().toArray().sort();
  };

  // Allow unauthenticated users to browse tracks by genre
  public query func getTracksByGenre(genre : Text) : async [Track] {
    tracks.values().toArray().filter(
      func(track) {
        Text.equal(track.genre, genre);
      }
    );
  };

  // Stripe Integration
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Purchase Management - requires authentication
  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can purchase tracks");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can check payment status");
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func confirmPurchase(trackId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only buyers can purchase tracks");
    };

    // Verify purchase logic here if needed
    addPurchase(caller, trackId);
  };

  // Only allow users to view their own purchases or admins to view any
  public query ({ caller }) func getPurchasedTracks(buyer : Principal) : async [Track] {
    if (caller != buyer and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own purchases");
    };

    switch (purchases.get(buyer)) {
      case (null) { [] };
      case (?trackIds) {
        trackIds.toArray().map(func(trackId) { getTrack(trackId) });
      };
    };
  };

  // Access Control - requires authentication for streaming
  public shared ({ caller }) func getAudioFile(trackId : Text) : async Storage.ExternalBlob {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can stream audio");
    };

    let track = getTrack(trackId);
    if (caller == track.creator) { // Creator always has access
      return track.audioFile;
    };

    switch (purchases.get(caller)) {
      case (null) { Runtime.trap("Unauthorized: Track not purchased") };
      case (?trackList) {
        if (trackList.toArray().find(func(id) { id == trackId }) != null) {
          track.audioFile;
        } else {
          Runtime.trap("Unauthorized: Track not purchased");
        };
      };
    };
  };
};
