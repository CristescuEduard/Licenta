import React, { Component } from "react";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import "./register.css";
function Register() {
    return (
        <div className="addProduct">
            <NavBarMain />
            <div className="main">
                <form className="container">
                    <h1 className="title">Register Here!</h1>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Username"
                            name="name"
                            className="register-input"
                        />
                    </div>

                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Email"
                            name="Email"
                            className="register-input"
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="password"
                            placeholder="Password"
                            name="Password"
                            className="register-input"
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            name="Repeat_Password"
                            className="register-input"
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Name and Surname"
                            name="Name_and_Surname"
                            className="register-input"
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Adress"
                            name="Adress"
                            className="register-input"
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="number"
                            placeholder="Age"
                            name="Age"
                            className="register-input"
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="number"
                            placeholder="Phone Number"
                            name="Phone_Number"
                            className="register-input"
                        />
                    </div>

                    <div className="loginBtns">
                        <input
                            type="submit"
                            value="Add Product     "
                            className="submit-btn-register"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
