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

    deleteBill: async (req, res) => {
        try {
            let bill = await BillsDB.findOne({
                where: {
                    ProductIdProduct: req.params.idProduct,
                    OrderIdOrder: req.params.idOrder,
                },
            });
            console.log(bill);
            if (bill) {
                BillsDB.destroy({
                    where: {
                        ProductIdProduct: bill.ProductIdProduct,
                        OrderIdOrder: bill.OrderIdOrder,
                    },
                });
                res.status(201).send({ message: "User deleted" });
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    deleteBillsForOrder: async (req, res) => {
        try {
            let bills = await BillsDB.findAll({
                where: {
                    OrderIdOrder: req.params.idOrder,
                },
            });
            console.log(bills);
            bills.forEach((bill) => {
                BillsDB.destroy({
                    where: {
                        OrderIdOrder: bill.OrderIdOrder,
                    },
                });
            });
            res.status(201).send({ message: "Bills Deleted" });
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },
};

module.exports = controller;
