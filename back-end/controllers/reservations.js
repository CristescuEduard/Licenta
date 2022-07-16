const ReservationsDB = require("../models").Reservations;
const { Op } = require("sequelize");

const controller = {
    addReservation: async (req, res) => {
        try {
            let reqBody = req.body;
            if (
                reqBody.idTable &&
                reqBody.time &&
                reqBody.reservationStartTime
            ) {
                req.body.reservationStartTime = new Date(
                    req.body.reservationStartTime
                );
                let reservation = await ReservationsDB.create(req.body);
                res.status(201).send({
                    message: "Created reservation successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getReservations: async (req, res) => {
        try {
            {
                let reservation = await ReservationsDB.findAll({
                    where: {
                        idTable: req.params.idTable,
                    },
                });
                res.status(200).send(reservation);
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getAllReservations: async (req, res) => {
        try {
            {
                let reservation = await ReservationsDB.findAll();
                res.status(200).send(reservation);
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    deleteReservations: async (req, res) => {
        try {
            if (req.params.reservationId > 0) {
                let reservation = await ReservationsDB.findOne({
                    where: { idReservation: req.params.reservationId },
                });
                if (reservation == null) {
                    res.status(404).send({ message: "reservation not found" });
                } else {
                    ReservationsDB.destroy({
                        where: { idReservation: req.params.reservationId },
                    });
                    res.status(201).send({ message: "reservation deleted" });
                }
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },
};

module.exports = controller;
