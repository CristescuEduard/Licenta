const express = require("express");
const router = express.Router();
const recipesController = require("../controllers").recipes;
router.post("/addRecipe", recipesController.addRecipe);
router.put("/modifyRecipe", recipesController.modifyRecipe);
router.get("/getRecipesForProduct", recipesController.getRecipesForProduct);

module.exports = router;
