import Reservation from "../models/Reservation";
import { validationResult } from "express-validator";

export class ReservationController {
  static async createReservation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reservation = req.body;
    const checkIn = new Date(reservation.check_in);
    const checkOut = new Date(reservation.check_out);

    if (checkIn >= checkOut) {
      return res
        .status(400)
        .json({ message: "Check-in date must be before check-out date" });
    }
    if (checkIn <= new Date()) {
      return res.status(400).json({
        message: "Check-in date cannot be today or in the past",
      });
    }

    try {
      const otherReservations = await Reservation.find({
        listing_id: reservation.listing_id,
      });

      let isConflict = false;
      for (const res of otherReservations) {
        const existingCheckIn = res.check_in;
        const existingCheckOut = res.check_out;
        if (
          (checkIn >= existingCheckIn && checkIn < existingCheckOut) ||
          (checkOut > existingCheckIn && checkOut <= existingCheckOut) ||
          (checkIn <= existingCheckIn && checkOut >= existingCheckOut)
        ) {
          isConflict = true;
          break;
        }
      }

      if (isConflict) {
        return res.status(400).json({
          message: "This reservation conflicts with an existing reservation",
        });
      }

      const reservationData = {
        user_id: reservation.user_id,
        username: reservation.username,
        host_id: reservation.host_id,
        listing_id: reservation.listing_id,
        check_in: checkIn,
        total: reservation.total,
        check_out: checkOut,
      };
      const reservationDoc = await new Reservation(reservationData).save();
      res.send(reservationDoc);
    } catch (e) {
      next(e);
    }
  }

  static async getReservation(req, res, next) {
    try {
      const host_id = req.query.host_id;
      const user_id = req.query.user_id;

      if ((!host_id || host_id === "") && (!user_id || user_id === "")) {
        return res
          .status(400)
          .json({ message: "User not Found. Please login again" });
      }

      if (host_id !== "") {
        const reservations = await Reservation.find({
          host_id: host_id,
        })
          .populate("listing_id")
          .sort({ check_in: 1 });

        const reservationsWithListingName = reservations.map((r) => {
          const listing: any =
            r.listing_id && typeof r.listing_id === "object"
              ? r.listing_id
              : {};

          return {
            ...r.toObject(),
            listing_name: listing.listing_name || "",
          };
        });

        res.send(reservationsWithListingName);
      } else {
        const reservations = await Reservation.find({
          user_id: user_id,
        })
          .populate("listing_id")
          .sort({ check_in: 1 });

        const reservationsWithListingName = reservations.map((r) => {
          const listing: any =
            r.listing_id && typeof r.listing_id === "object"
              ? r.listing_id
              : {};

          return {
            ...r.toObject(),
            listing_name: listing.listing_name || "",
          };
        });

        if (reservationsWithListingName.length === 0) {
          return res.status(404).json({
            message: "No reservations have been made",
          });
        }

        res.send(reservationsWithListingName);
      }
    } catch (e) {
      next(e);
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      const reservation_id = req.query.reservation_id;

      if (!reservation_id) {
        return res.status(400).json({ message: "Reservation ID is required" });
      }

      await Reservation.findByIdAndDelete(reservation_id);

      res.send({ message: "Reservation deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}
