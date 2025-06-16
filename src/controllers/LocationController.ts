import Location from "../models/Location";

export class LocationController {
  static async getAllLocationNames(req, res, next) {
    try {
      const locations = await Location.find({}, "location");
      const names = locations.map((loc) => loc.location);
      res.json(names);
    } catch (err) {
      next(err);
    }
  }
}
