import { body, query } from "express-validator";

export class ReservationValidator {
  static createReservation() {
    return [
      body("username", "Username is required").isString(),
      body("check_in", "Check-in date is required").isDate(),
      body("check_out", "Check-out date is required").isDate(),
      body("user_id", "User ID is required").isString(),
      body("host_id", "Host ID is required").isString(),
      body("listing_id", "Listing ID is required").isString(),
      body("total", "Total price is required").isNumeric(),
    ];
  }
}
