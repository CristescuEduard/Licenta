const { Sequelize } = require("../models");

const OrderDB = require("../models").Orders;
const BillsDB = require("../models").Bills;
const ProductDB = require("../models").Products;
const controller = {
    addOrder: async (req, res) => {
        try {
            let reqBody = req.body;
            if (reqBody.idTable && reqBody.idUser) {
                let order = await OrderDB.create(req.body);
                res.status(201).send({
                    message: "Created order successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    filterOrders: async (req, res) => {
        try {
            let orders = await OrderDB.findAll({
                where: { isFinished: false, isPending: req.params.isPending },
                include: [
                    {
                        model: BillsDB,
                        include: [
                            {
                                model: ProductDB,
                                where: { category: "bucatarie" },
                                required: true,
                            },
                        ],
                        required: true,
                    },
                ],
            });
            if (orders) {
                return res.status(200).send(orders);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    setAccepted: async (req, res) => {
        try {
            const order = await OrderDB.findOne({
                where: { idOrder: req.params.orderId },
            });
            if (order) {
                order.update({ isPending: 0 });
            }
            return res.status(200).send();
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    setFinished: async (req, res) => {
        try {
            const order = await OrderDB.findOne({
                where: { idOrder: req.params.orderId },
            });
            if (order) {
                order.update({ isFinished: 1 });
            }
            return res.status(200).send();
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getProductsForOrderKitchen: async (req, res) => {
        try {
            const order = await OrderDB.findOne({
                where: { idOrder: req.params.orderId },
                include: [
                    {
                        model: BillsDB,
                        include: [
                            {
                                model: ProductDB,
                                where: { category: "bucatarie" },
                            },
                        ],
                    },
                ],
            });
            return res.status(200).send(order.dataValues.Bills);
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getProductsForOrder: async (req, res) => {
        try {
            const order = await OrderDB.findOne({
                where: { idOrder: req.params.orderId },
                include: [
                    {
                        model: BillsDB,
                        include: [
                            {
                                model: ProductDB,
                            },
                        ],
                    },
                ],
            });
            return res.status(200).send(order.dataValues.Bills);
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getOrdersForTable: async (req, res) => {
        try {
            const orders = await OrderDB.findOne({
                where: { idTable: req.params.idTable },
            });
            return res.status(200).send(orders);
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    setPrice: async (req, res) => {
        try {
            const order = await OrderDB.findOne({
                where: { idOrder: req.params.orderId },
            });
            sum = 0;
            nr = 0;
            const orders = await BillsDB.findAll({
                where: { OrderIdOrder: req.params.orderId },
            });
            if (orders) {
                list = Object.values(orders);
                list.forEach(async (element) => {
                    nr++;
                    try {
                        const product = await ProductDB.findOne({
                            where: {
                                idProduct: element.dataValues.ProductIdProduct,
                            },
                        });

                        if (product) {
                            sum += product.dataValues.price;
                        }
                        if (list[nr - 1].dataValues == element.dataValues)
                            order.update({ totalSum: sum });
                    } catch {
                        return res.status(500).send("eroare");
                    }
                });
            }
            return res.status(200).send();
        } catch (err) {
            return res.status(500).send(err);
        }
    },
};

module.exports = controller;
