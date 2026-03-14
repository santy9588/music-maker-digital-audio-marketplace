import Nat "mo:core/Nat";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Stripe "stripe/stripe";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

module {
  public type OldActor = {
    var nextTrackId : Nat;
    var stripeConfig : ?Stripe.StripeConfiguration;
    tracks : Map.Map<Text, OldTrack>;
    purchases : Map.Map<Principal, List.List<Text>>;
    accessControlState : AccessControl.AccessControlState;
  };

  public type OldTrack = {
    id : Text;
    creator : Principal;
    title : Text;
    description : Text;
    price : Nat;
    genre : Text;
    audioFile : Storage.ExternalBlob;
  };

  public type NewActor = {
    var nextTrackId : Nat;
    var stripeConfig : ?Stripe.StripeConfiguration;
    tracks : Map.Map<Text, OldTrack>;
    purchases : Map.Map<Principal, List.List<Text>>;
    accessControlState : AccessControl.AccessControlState;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
