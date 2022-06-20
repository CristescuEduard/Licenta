const express = require("express");
const router = express.Router();
const usersController = require("../controllers").users;
router.get("/getUsers", usersController.getUsers);
router.get("/getUserById/:userId", usersController.getUserById);
router.delete("/deleteUser/:userId", usersController.delete);
router.post("/addUser", usersController.addUser);
router.put("/changePassword/:userId", usersController.changePassword);
router.post("/login", usersController.login);

module.exports = router;
