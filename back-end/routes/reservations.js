const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers").reserations;
router.post("/addReservation", reservationsController.addReservation);
router.get("/getReservations/:idTable", reservationsController.getReservations);
router.get("/getAllReservations/", reservationsController.getAllReservations);
router.delete(
    "/deleteReservation/:reservationId",
    reservationsController.deleteReservations
);

module.exports = router;
