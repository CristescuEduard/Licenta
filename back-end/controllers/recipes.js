const RecipesDB = require("../models").Recipes;
const controller = {
    addRecipe: async (req, res) => {
        try {
            let reqBody = req.body;
            if (
                reqBody.ingredientQuantity &&
                reqBody.IngredientIdIngredient &&
                reqBody.ProductIdProduct
            ) {
                let bill = await RecipesDB.create(req.body);
                res.status(201).send({
                    message: "Created recipe successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    modifyRecipe: async (req, res) => {
        try {
            let bill = await RecipesDB.findOne({
                where: {
                    IngredientIdIngredient: req.body.idIngredient,
                    ProductIdProduct: req.body.idProduct,
                },
            });
            if (bill)
                bill.update({
                    ingredientQuantity: req.body.ingredientQuantity,
                });
            return res.status(200).send("A mers");
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    deleteRecipe: async (req, res) => {
        try {
            let bill = await RecipesDB.findOne({
                where: {
                    IngredientIdIngredient: req.body.idIngredient,
                    ProductIdProduct: req.body.idProduct,
                },
            });
            if (bill) {
                RecipesDB.destroy({
                    where: {
                        IngredientIdIngredient: req.body.idIngredient,
                        ProductIdProduct: req.body.idProduct,
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

    getRecipesForProduct: async (req, res) => {
        try {
            let recipes = await RecipesDB.findAll({
                where: { ProductIdProduct: req.body.idProduct },
            });
            res.status(201).send(recipes);
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },
};

module.exports = controller;
