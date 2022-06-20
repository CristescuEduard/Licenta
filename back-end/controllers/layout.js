const LayoutDB = require("../models").Layouts;
const controller = {
    addLayout: async (req, res) => {
        try {
            let reqBody = req.body;
            if (reqBody.layoutName) {
                // req.body.reservationStartTime = new Date(
                //     req.body.reservationStartTime
                // );
                let layout = await LayoutDB.create(req.body);
                res.status(201).send({
                    message: "Created layout successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getLayouts: async (req, res) => {
        try {
            const layouts = await LayoutDB.findAll();
            if (layouts) {
                return res.status(200).send(layouts);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getLayout: async (req, res) => {
        try {
            const currentLayout = await LayoutDB.findOne({
                where: { isActive: true },
            });
            if (currentLayout) {
                return res.status(200).send(currentLayout);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    setActive: async (req, res) => {
        try {
            const layout = await LayoutDB.findOne({
                where: { idLayout: req.body.idLayout },
            });
            const currentLayout = await LayoutDB.findOne({
                where: { isActive: true },
            });
            if (layout) {
                layout.update({
                    isActive: true,
                });
                if (currentLayout) {
                    currentLayout.update({ isActive: false });
                }
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
