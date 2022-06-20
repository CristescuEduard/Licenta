const BillsDB = require("../models").Bills;
const controller = {
    addBill: async (req, res) => {
        try {
            let reqBody = req.body;
            if (
                reqBody.ProductIdProduct &&
                reqBody.OrderIdOrder &&
                reqBody.productQuantity
            ) {
                let bill = await BillsDB.create(req.body);
                res.status(201).send({
                    message: "Created bill successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    modifyBill: async (req, res) => {
        try {
            let bill = await BillsDB.findOne({
                where: {
                    ProductIdProduct: req.body.idProduct,
                    OrderIdOrder: req.body.idOrder,
                },
            });
            if (bill)
                bill.update({ productQuantity: req.body.productQuantity });
            return res.status(200).send("A mers");
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },
};

module.exports = controller;
