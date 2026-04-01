import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  // Reservation Type and Compare Module
  type Reservation = {
    id : Nat;
    customerName : Text;
    email : Text;
    phoneNumber : Text;
    numberOfGuests : Nat;
    date : Text;
    time : Text;
    specialRequests : Text;
    timestamp : Int;
  };

  module Reservation {
    public func compare(a : Reservation, b : Reservation) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // Persistent Reservation Storage
  let reservations = Map.empty<Nat, Reservation>();
  var nextReservationId = 1;

  // Create New Reservation
  public shared ({ caller }) func createReservation(reservation : Reservation) : async Nat {
    let id = nextReservationId;
    nextReservationId += 1;

    let newReservation : Reservation = {
      reservation with
      id;
      timestamp = Time.now();
    };

    reservations.add(id, newReservation);
    id;
  };

  // Get All Reservations
  public query ({ caller }) func getAllReservations() : async [Reservation] {
    reservations.values().toArray().sort();
  };

  // Get Reservation by ID
  public query ({ caller }) func getReservationById(id : Nat) : async Reservation {
    switch (reservations.get(id)) {
      case (null) { Runtime.trap("Reservation not found") };
      case (?reservation) { reservation };
    };
  };
};
