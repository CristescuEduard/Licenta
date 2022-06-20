const ProductDB = require("../models").Products;
const controller = {
    addProduct: async (req, res) => {
        try {
            let reqBody = req.body;
            if (
                reqBody.productName &&
                reqBody.category &&
                reqBody.price &&
                reqBody.subCategory &&
                reqBody.productDescription &&
                reqBody.totalQuantity
            ) {
                let product = await ProductDB.create(req.body);
                res.status(201).send({
                    message: "Created product successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getProducts: async (req, res) => {
        try {
            const products = await ProductDB.findAll();
            if (products) {
                return res.status(200).send(products);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getProductsBySubCategory: async (req, res) => {
        try {
            const products = await ProductDB.findAll({
                where: { subCategory: req.params.subCategory },
            });
            if (products) {
                return res.status(200).send(products);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getPrice: async (req, res) => {
        try {
            const product = await ProductDB.findOne({
                where: { idProduct: req.params.productId },
            });
            if (product) {
                return res.status(200).send(product.dataValues.price);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    modifyProduct: async (req, res) => {
        try {
            if (
                (req.body.idProduct && req.body.productName,
                req.body.category &&
                    req.body.subCategory &&
                    req.body.totalQuantity &&
                    req.body.price &&
                    req.body.productDescription)
            ) {
                const product = await ProductDB.findOne({
                    where: { idProduct: req.body.idProduct },
                });
                if (product) {
                    product.update({
                        productName: req.body.productName,
                        category: req.body.category,
                        subCategory: req.body.subCategory,
                        totalQuantity: req.body.totalQuantity,
                        price: req.body.price,
                        productDescription: req.body.productDescription,
                    });
                    return res.status(200).send("A mers");
                } else {
                    return res.status(404).send({ message: "Not found" });
                }
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
};

module.exports = controller;
