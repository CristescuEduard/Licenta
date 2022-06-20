const TableDB = require("../models").Tables;
const controller = {
    addTable: async (req, res) => {
        try {
            let reqBody = req.body;
            if (
                reqBody.tableName &&
                reqBody.orientation &&
                reqBody.tableSize &&
                reqBody.idLayout
            ) {
                // req.body.reservationStartTime = new Date(
                //     req.body.reservationStartTime
                // );
                let table = await TableDB.create(req.body);
                res.status(201).send({
                    message: "Created table successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getTables: async (req, res) => {
        try {
            const tables = await TableDB.findAll();
            if (tables) {
                return res.status(200).send(tables);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getTablesForLayout: async (req, res) => {
        try {
            const tables = await TableDB.findAll({
                where: { idLayout: req.params.idLayout },
            });
            if (tables) {
                return res.status(200).send(tables);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    updateTableXY: async (req, res) => {
        try {
            const table = await TableDB.findOne({
                where: { idTable: req.body.idTable },
            });
            if (table) {
                table.update({
                    tableX: req.body.tableX,
                    tableY: req.body.tableY,
                });
                return res.status(200).send({ message: "O mers" });
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
};

module.exports = controller;
