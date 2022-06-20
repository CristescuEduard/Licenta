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
};

module.exports = controller;
