import { Booking } from "./booking";

export interface Book{
    id: number,
    name: string,
    bookingsList: Booking[]
}