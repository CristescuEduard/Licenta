import React, { useState } from "react";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import { Button, Input, useToast } from "@chakra-ui/react";
import "./register.css";
import axios from "axios";
import { RiWindowsFill } from "react-icons/ri";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");

    function register() {
        if (
            username !== "" &&
            password !== "" &&
            repassword !== "" &&
            email !== "" &&
            email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                ) &&
            password === repassword
        ) {
            axios
                .post("http://localhost:8080/addUser", {
                    username: username,
                    email: email,
                    password: password,
                })
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: "Email already exists!",
                        status: "error",
                        isClosable: true,
                        position: "top-right",
                        duration: 3000,
                    });
                });
            window.location.reload(false);
        } else {
            toast({
                title: "Error",
                description: "Something went wrong!",
                status: "error",
                isClosable: true,
                position: "top-right",
                duration: 3000,
            });
        }
    }

    const toast = useToast();

    return (
        <div className="login">
            <NavBarMain />
            <div className="login-right">
                <form className="container">
                    <h1 className="title">Add new Users!</h1>
                    <div className="inputContainer">
                        <Input
                            placeholder="Username"
                            onChange={(valueString) => {
                                setUsername(valueString.currentTarget.value);
                            }}
                        />
                    </div>
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
                                setPassword(valueString.currentTarget.value);
                            }}
                        />
                    </div>
                    <div className="inputContainer">
                        <Input
                            placeholder="Repeat-Password"
                            type="password"
                            onChange={(valueString) => {
                                setRePassword(valueString.currentTarget.value);
                            }}
                        />
                    </div>

                    <div className="loginBtns">
                        <Button colorScheme="facebook" onClick={register}>
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
