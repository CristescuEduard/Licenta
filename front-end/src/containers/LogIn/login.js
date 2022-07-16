import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, useToast } from "@chakra-ui/react";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const history = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValues = {
            email,
            parola,
        };
        console.log(formValues);
        try {
            if (email === "") {
                toast({
                    title: `Email missing`,
                    position: "top-right",
                    duration: 3000,
                    status: "error",
                    isClosable: true,
                });
                return;
            }

            if (
                !/([a-zA-Z0-9]+)([_.-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/g.test(
                    email
                )
            ) {
                toast({
                    title: `Email in wrong format`,
                    position: "top-right",
                    duration: 3000,
                    status: "error",
                    isClosable: true,
                });
                return;
            }

            if (parola === "") {
                toast({
                    title: `Missing Password`,
                    position: "top-right",
                    duration: 3000,
                    status: "error",
                    isClosable: true,
                });
                return;
            }

            try {
                const response = await axios.post(
                    "http://localhost:8080/login",
                    { email: formValues.email, password: formValues.parola }
                );
                if (response.data && response.data.login === true) {
                    if (email.match("bar")) {
                        history("/bar/orders");
                    } else if (email.match("kitchen")) {
                        history("/kitchen/orders");
                    } else history("/admin/tables");
                }
            } catch {
                toast({
                    title: `Wrong Email or Password`,
                    position: "top-right",
                    duration: 9000,
                    status: "error",
                    isClosable: true,
                });
            }
        } catch (err) {
            toast.error(err.response.data.message);
            console.warn(err);
        }
    };

    return (
        <div className="login">
            <div className="login-right">
                <form className="container">
                    <h1 className="title">Welcome!</h1>
                    <div className="inputContainer">
                        <Input
                            placeholder="Email"
                            onChange={(valueString) => {
                                setEmail(valueString.currentTarget.value);
                            }}
                        />
                    </div>
                    <div className="inputContainer">
                        <Input
                            placeholder="Password"
                            type="password"
                            onChange={(valueString) => {
                                setParola(valueString.currentTarget.value);
                            }}
                        />
                    </div>
                    <div className="loginBtns">
                        <Button colorScheme="facebook" onClick={handleSubmit}>
                            Login
                        </Button>
                    </div>
                    <div className="loginBtns"></div>
                </form>
            </div>
        </div>
    );
};

export default Login;
