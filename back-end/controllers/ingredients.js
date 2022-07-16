const IngredientsDB = require("../models").Ingredients;
const controller = {
    addIngredient: async (req, res) => {
        try {
            let reqBody = req.body;
            if (
                reqBody.ingredientName &&
                reqBody.ingredientPrice &&
                reqBody.ingredientQuantity
            ) {
                let ingredient = await IngredientsDB.create(req.body);
                res.status(201).send({
                    message: "Created ingredient successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },
    modifyIngredient: async (req, res) => {
        try {
            if (req.body.ingredientQuantity) {
                const ingredient = await IngredientsDB.findOne({
                    where: { idIngredient: req.params.idIngredient },
                });
                if (ingredient) {
                    ingredient.update({
                        ingredientQuantity: req.body.ingredientQuantity,
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

    getIngredients: async (req, res) => {
        try {
            const products = await IngredientsDB.findAll();
            if (products) {
                return res.status(200).send(products);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
};
module.exports = controller;
