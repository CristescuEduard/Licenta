const express = require("express");
const router = express.Router();
const ingredientsController = require("../controllers").ingredients;
router.post("/addIngredient", ingredientsController.addIngredient);
router.get("/getIngredients", ingredientsController.getIngredients);
router.put(
    "/modifyIngredient/:idIngredient",
    ingredientsController.modifyIngredient
);
module.exports = router;
