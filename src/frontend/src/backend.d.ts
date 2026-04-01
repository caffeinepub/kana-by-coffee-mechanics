import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    id: bigint;
    customerName: string;
    date: string;
    specialRequests: string;
    time: string;
    email: string;
    timestamp: bigint;
    phoneNumber: string;
    numberOfGuests: bigint;
}
export interface backendInterface {
    createReservation(reservation: Reservation): Promise<bigint>;
    getAllReservations(): Promise<Array<Reservation>>;
    getReservationById(id: bigint): Promise<Reservation>;
}
