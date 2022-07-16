const UserDB = require("../models").Users;
const controller = {
    login: (req, res) => {
        UserDB.findOne({
            where: { email: req.body.email, password: req.body.password },
        })
            .then((user) => {
                if (user !== null) {
                    res.status(200).send({
                        message: "Successfully login",
                        login: true,
                        user,
                    });
                } else {
                    res.status(401).send({
                        message: "Wrong Credentials",
                    });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    message: "A crapat serveru!",
                });
            });
    },
    addUser: async (req, res) => {
        try {
            let reqBody = req.body;
            if (reqBody.username && reqBody.email && reqBody.password) {
                var user = await UserDB.findOne({
                    where: { email: req.body.email },
                });
                if (user !== null) {
                    res.status(409).send({ message: "Email already exists" });
                } else {
                    let user = await UserDB.create(req.body);
                    res.status(201).send({
                        message: "Created user successfully",
                    });
                }
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    changePassword: async (req, res) => {
        try {
            const user = await UserDB.findByPk(req.params.userId);
            if (user) {
                if (req.body.password != user.password)
                    user.update({
                        password: req.body.password,
                    })
                        .then(() =>
                            res.status(200).send({ message: "User updated" })
                        )
                        .catch(() =>
                            res
                                .status(500)
                                .send({ message: "Some server error occured" })
                        );
                else {
                    return res
                        .status(409)
                        .send({ message: "Passwords are the same" });
                }
            } else {
                return res
                    .status(400)
                    .send({ message: "There is not any user with this id." });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    delete: async (req, res) => {
        try {
            if (req.params.userId > 0) {
                let user = await UserDB.findOne({
                    where: { idUser: req.params.userId },
                });

                if (user == null) {
                    res.status(404).send({ message: "User not found" });
                } else {
                    UserDB.destroy({ where: { id: req.params.userId } });
                    res.status(201).send({ message: "User deleted" });
                }
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await UserDB.findOne({
                where: { idUser: req.params.userId },
            });
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getUsers: async (req, res) => {
        try {
            const user = await UserDB.findAll({ where: { idUser: 1 } });
            console.log(user);
            if (user) {
                return res.status(200).send(user);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
};

module.exports = controller;
